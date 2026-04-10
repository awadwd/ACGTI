<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import ResultSummary from '../components/ResultSummary.vue'
import SharePoster from '../components/SharePoster.vue'
import { useShare } from '../composables/useShare'
import { useQuiz } from '../composables/useQuiz'

const router = useRouter()
const quiz = useQuiz()
const result = computed(() => quiz.latestResult.value)
const posterRef = ref<{ rootEl: HTMLElement | null } | null>(null)
const share = useShare()

onMounted(() => {
  quiz.resumeLastResult()

  if (!quiz.latestResult.value) {
    void router.replace('/quiz')
  }
})

function retry() {
  quiz.resetQuiz()
  void router.push('/quiz')
}

function exportPoster() {
  if (!result.value) {
    return
  }

  void share.exportPoster(posterRef.value?.rootEl ?? null, result.value)
}

function copyText() {
  if (!result.value) {
    return
  }

  void share.copyShareText(result.value)
}
</script>

<template>
  <div class="page-stack compact" v-if="result">
    <ResultSummary :result="result" />

    <section class="panel">
      <div class="result-actions">
        <div>
          <p class="eyebrow">分享导出</p>
          <h2 class="section-title">截图态已经准备好了。</h2>
          <p class="lead">可以直接导出 PNG 海报，也可以复制一段适合发给朋友的结果文案。</p>
        </div>
        <div class="cta-row">
          <button class="button button-primary" type="button" :disabled="share.isExporting.value" @click="exportPoster">
            {{ share.isExporting.value ? '导出中…' : '导出海报' }}
          </button>
          <button class="button button-secondary" type="button" @click="copyText">复制文案</button>
        </div>
      </div>

      <p v-if="share.feedback.value" class="result-feedback">{{ share.feedback.value }}</p>

      <div class="poster-frame">
        <SharePoster ref="posterRef" :result="result" />
      </div>
    </section>

    <section class="panel center">
      <p class="lead">最近一次测试结果已经保存在本地浏览器中，你可以直接重测，也可以稍后回来继续查看。</p>
      <div class="cta-row" style="justify-content: center; margin-top: 18px;">
        <button class="button button-primary" type="button" @click="retry">再测一次</button>
        <RouterLink class="button button-secondary" to="/about">查看项目说明</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.result-actions {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: end;
}

.poster-frame {
  margin-top: 18px;
  padding: 16px;
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.03);
}

.result-feedback {
  margin: 12px 0 0;
  color: var(--accent-3);
}

@media (max-width: 700px) {
  .result-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .result-actions .cta-row,
  .result-actions .button {
    width: 100%;
  }
}
</style>
