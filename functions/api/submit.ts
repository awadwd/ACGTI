// /api/submit — 记录一次问卷提交（单行落盘，题目答案打包为 JSON）
// 纯落盘接口，快速返回 204，不阻塞用户

import {
  str,
  num,
  isValidCode,
  isValidUuid,
  isValidMbti,
  checkRateLimit,
} from './_shared'

function formatError(err: unknown) {
  if (err instanceof Error) {
    return {
      name: err.name,
      message: err.message,
      stack: err.stack,
    }
  }

  return err
}

export async function onRequestPost(context: any) {
  const { DB } = context.env as { DB: any }

  // --- 限流 ---
  const ip = context.request.headers.get('CF-Connecting-IP') || 'unknown'
  const allowed = await checkRateLimit(DB, ip, 10)
  if (!allowed) return new Response(null, { status: 429 })

  // --- 解析 payload ---
  let raw: any
  try {
    raw = await context.request.json()
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  console.log('📊 Submit payload received:', JSON.stringify(raw, null, 2))

  // 白名单提取字段
  const submissionId = str(raw.submissionId, 64)
  const appVersion = str(raw.appVersion, 16)
  const archetypeCode = str(raw.archetypeCode, 32)
  const characterCode = str(raw.characterCode, 32)
  const predictedMbti = str(raw.predictedMbti, 4)
  const durationMs = num(raw.durationMs, 1000, 3600000) // 1s ~ 1h

  // 必填校验
  if (!submissionId || !appVersion || !archetypeCode || !characterCode) {
    console.error('❌ Missing required fields:', { submissionId, appVersion, archetypeCode, characterCode })
    return new Response('Missing required fields', { status: 400 })
  }
  if (!isValidUuid(submissionId)) {
    console.error('❌ Invalid submissionId format:', submissionId)
    return new Response('Invalid submissionId', { status: 400 })
  }
  if (!isValidCode(archetypeCode) || !isValidCode(characterCode)) {
    console.error('❌ Invalid code format:', { archetypeCode, characterCode })
    return new Response('Invalid code format', { status: 400 })
  }
  if (predictedMbti && !isValidMbti(predictedMbti)) {
    console.error('❌ Invalid predictedMbti format:', predictedMbti)
    return new Response('Invalid predictedMbti', { status: 400 })
  }
  // duration_ms < 3s 的请求几乎不可能是真人
  if (durationMs === null) {
    console.error('❌ Invalid durationMs:', raw.durationMs)
    return new Response('Invalid durationMs', { status: 400 })
  }

  console.log('📦 Submit payload summary:', {
    submissionId,
    appVersion,
    archetypeCode,
    characterCode,
    predictedMbti: predictedMbti || null,
    durationMs,
  })

  // 四维分数校验（0~100 范围）
  const ds = raw.dimensionScores
  const ei = num(ds?.ei, 0, 100)
  const sn = num(ds?.sn, 0, 100)
  const tf = num(ds?.tf, 0, 100)
  const jp = num(ds?.jp, 0, 100)
  if (ei === null || sn === null || tf === null || jp === null) {
    console.error('❌ Invalid dimensionScores:', { 
      ei: [raw.dimensionScores?.ei, 'validated to', ei],
      sn: [raw.dimensionScores?.sn, 'validated to', sn],
      tf: [raw.dimensionScores?.tf, 'validated to', tf],
      jp: [raw.dimensionScores?.jp, 'validated to', jp],
    })
    return new Response('Invalid dimensionScores', { status: 400 })
  }

  const now = new Date().toISOString()

  try {
    await DB.prepare(
      `INSERT OR IGNORE INTO submissions
        (id, created_at, app_version, archetype_code, character_code,
         ei_score, sn_score, tf_score, jp_score, duration_ms,
         predicted_mbti)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      submissionId,
      now,
      appVersion,
      archetypeCode,
      characterCode,
      ei,
      sn,
      tf,
      jp,
      durationMs,
      predictedMbti || null,
    ).run()

    console.log('✅ submission stored', {
      submissionId,
    })

    return new Response(null, { status: 204 })
  } catch (err) {
    console.error('Submit error:', formatError(err))
    // 依然返回 204，不暴露内部错误
    return new Response(null, { status: 204 })
  }
}
