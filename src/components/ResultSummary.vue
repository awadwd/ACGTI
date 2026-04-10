<script setup lang="ts">
import type { QuizResult } from '../types/quiz'

defineProps<{
  result: QuizResult
}>()

const axisLabels = {
  expression: '外放 / 收束',
  temperature: '热血 / 冷感',
  judgement: '理性 / 共感',
  order: '秩序 / 游离',
  agency: '主动 / 被动',
  aura: '危险 / 治愈',
}
</script>

<template>
  <div class="page-stack">
    <section class="hero-panel result-hero">
      <div class="hero-grid">
        <div class="page-stack">
          <div>
            <p class="eyebrow">结果揭示</p>
            <h1 class="display-title">{{ result.archetype.name }}</h1>
            <p class="lead">{{ result.archetype.subtitle }}</p>
          </div>

          <div class="pill-row">
            <span v-for="tag in result.tags.length ? result.tags : result.archetype.tags" :key="tag" class="pill">
              {{ tag }}
            </span>
          </div>

          <div class="accent-frame">
            <p class="body-copy">{{ result.archetype.description }}</p>
          </div>
        </div>

        <div class="panel result-score">
          <span class="label">原型匹配度</span>
          <p class="result-match">{{ result.matchScore }}%</p>
          <p class="body-copy">
            这不是现实人格定论，而是你在二次元叙事里更容易落到的角色气质与剧情位置。
          </p>
        </div>
      </div>
    </section>

    <section class="split-grid">
      <article class="panel">
        <h2 class="section-title">角色卡摘要</h2>
        <div class="meta-list">
          <div class="meta-item">
            <span class="label">剧情位置</span>
            <p class="value">{{ result.archetype.narrativeRole }}</p>
          </div>
          <div class="meta-item">
            <span class="label">高光时刻</span>
            <p class="value">{{ result.archetype.spotlight }}</p>
          </div>
          <div class="meta-item">
            <span class="label">脆弱点</span>
            <p class="value">{{ result.archetype.weakness }}</p>
          </div>
        </div>
      </article>

      <article class="panel">
        <h2 class="section-title">角色雷达</h2>
        <div class="stat-list">
          <div v-for="(score, key) in result.scores" :key="key" class="stat-item">
            <div class="stat-head">
              <span>{{ axisLabels[key as keyof typeof axisLabels] }}</span>
              <strong>{{ score > 0 ? `+${score}` : score }}</strong>
            </div>
            <div class="mini-track" aria-hidden="true">
              <div class="mini-fill" :style="{ width: `${Math.min(100, Math.abs(score) * 20)}%` }"></div>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section class="panel">
      <div v-if="result.characterMatches[0]" class="featured-match">
        <div>
          <p class="eyebrow">首位匹配</p>
          <h2 class="section-title">{{ result.characterMatches[0].name }}</h2>
          <p class="lead">{{ result.characterMatches[0].series }}</p>
        </div>
        <div class="pill-row">
          <span v-for="tag in result.characterMatches[0].tags" :key="tag" class="pill">{{ tag }}</span>
        </div>
        <p class="body-copy">{{ result.characterMatches[0].note }}</p>
      </div>

      <h2 class="section-title">你最像的角色</h2>
      <div class="timeline-list">
        <article
          v-for="(character, index) in result.characterMatches"
          :key="character.id"
          class="timeline-item"
          :class="{ 'timeline-item-featured': index === 0 }"
        >
          <div class="character-topline">
            <div>
              <h3>{{ character.name }}</h3>
              <p class="muted">{{ character.series }}</p>
            </div>
            <div class="pill-row">
              <span v-for="tag in character.tags" :key="tag" class="pill">{{ tag }}</span>
            </div>
          </div>
          <p class="body-copy">{{ character.note }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.result-hero {
  overflow: visible;
}

.result-score {
  align-self: stretch;
  display: grid;
  align-content: start;
  gap: 12px;
  background: rgba(8, 8, 14, 0.34);
}

.result-match {
  margin: 0;
  font-family: var(--display-font);
  font-size: clamp(3.4rem, 9vw, 5.2rem);
  line-height: 1;
}

.stat-list,
.timeline-list {
  gap: 12px;
}

.featured-match {
  margin-bottom: 18px;
  padding: 20px;
  border-radius: 24px;
  background:
    linear-gradient(140deg, rgba(255, 111, 145, 0.12), rgba(110, 197, 255, 0.08) 72%),
    rgba(255, 255, 255, 0.04);
}

.stat-head,
.character-topline {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.character-topline {
  align-items: start;
  margin-bottom: 10px;
}

.timeline-item-featured {
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.character-topline h3,
.character-topline p {
  margin: 0;
}

.mini-track {
  margin-top: 10px;
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
}

.mini-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--accent-2), var(--accent));
}

@media (max-width: 700px) {
  .stat-head,
  .character-topline {
    flex-direction: column;
  }
}
</style>
