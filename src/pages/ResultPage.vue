<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

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

function hideBrokenImage(event: Event) {
  const img = event.currentTarget as HTMLImageElement | null
  if (!img) return
  img.style.display = 'none'
}
</script>

<template>
  <div class="min-h-screen bg-[#F5F5F5] font-sans pt-12" v-if="result">
    <div class="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <!-- 顶部信息区 -->
      <div class="bg-white rounded-[20px] shadow-sm overflow-hidden mb-8">
        <div class="flex flex-col md:flex-row">
          
          <!-- 左侧 -->
          <div class="md:w-[45%] p-10 flex flex-col items-center justify-center text-center text-white relative overflow-hidden" :style="{ backgroundColor: result.archetype.accent || '#8ca260' }">
            <h2 class="text-sm font-bold tracking-[0.2em] mb-2 uppercase opacity-90">{{ result.code }}-T</h2>
            <h1 class="text-4xl md:text-5xl font-black mb-6">{{ result.archetype.name }}</h1>
            
            <div class="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center group">
              <div class="absolute inset-0 border-2 border-white/20 rounded-full animate-[spin_10s_linear_infinite]" style="border-style: dashed;"></div>
              <div class="absolute inset-4 border-2 border-white/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              
              <img v-if="result.characterMatches[0]?.id" :src="`/images/characters/${result.characterMatches[0].id}.png`" alt="Character" class="w-full h-full object-contain relative z-10 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" @error="hideBrokenImage" />
              <i v-else class="fa-solid fa-user-astronaut text-8xl opacity-80 z-10 transition-transform duration-500 group-hover:scale-110"></i>
            </div>
          </div>

          <!-- 右侧：雷达百分比 -->
          <div class="md:w-[55%] p-8 lg:p-12">
            
            <div class="space-y-8">
              <!-- E/I -->
              <div class="trait-row">
                <div class="flex justify-between text-sm font-bold text-gray-500 mb-2">
                  <span :class="{'text-[#4298B4]': result.scores['E_I'].dominant === 'E'}">外向 (E)</span>
                  <span :class="{'text-[#4298B4]': result.scores['E_I'].dominant === 'I'}">内向 (I)</span>
                </div>
                <div class="h-3 w-full bg-gray-200 rounded-full flex overflow-hidden">
                  <div class="h-full transition-all duration-1000" :style="{ width: result.scores['E_I'].percentage + '%', backgroundColor: result.scores['E_I'].dominant === 'E' ? '#4298B4' : '#e5e7eb'}"></div>
                  <div class="h-full transition-all duration-1000" :style="{ width: (100 - result.scores['E_I'].percentage) + '%', backgroundColor: result.scores['E_I'].dominant === 'I' ? '#4298B4' : '#e5e7eb' }"></div>
                </div>
                <div class="mt-1 text-center text-xs font-bold text-[#4298B4]" v-if="result.scores['E_I'].dominant">{{ result.scores['E_I'].percentage }}% {{ result.scores['E_I'].dominant === 'E' ? '外向' : '内向' }}</div>
              </div>

               <!-- S/N -->
               <div class="trait-row">
                <div class="flex justify-between text-sm font-bold text-gray-500 mb-2">
                  <span :class="{'text-[#E4AE3A]': result.scores['S_N'].dominant === 'S'}">实感 (S)</span>
                  <span :class="{'text-[#E4AE3A]': result.scores['S_N'].dominant === 'N'}">直觉 (N)</span>
                </div>
                <div class="h-3 w-full bg-gray-200 rounded-full flex overflow-hidden">
                  <div class="h-full transition-all duration-1000" :style="{ width: result.scores['S_N'].percentage + '%', backgroundColor: result.scores['S_N'].dominant === 'S' ? '#E4AE3A' : '#e5e7eb'}"></div>
                  <div class="h-full transition-all duration-1000" :style="{ width: (100 - result.scores['S_N'].percentage) + '%', backgroundColor: result.scores['S_N'].dominant === 'N' ? '#E4AE3A' : '#e5e7eb'}"></div>
                </div>
                <div class="mt-1 text-center text-xs font-bold text-[#E4AE3A]">{{ result.scores['S_N'].percentage }}% {{ result.scores['S_N'].dominant === 'S' ? '实感' : '直觉' }}</div>
              </div>

              <!-- T/F -->
              <div class="trait-row">
                <div class="flex justify-between text-sm font-bold text-gray-500 mb-2">
                  <span :class="{'text-[#33A474]': result.scores['T_F'].dominant === 'T'}">理智 (T)</span>
                  <span :class="{'text-[#33A474]': result.scores['T_F'].dominant === 'F'}">情感 (F)</span>
                </div>
                <div class="h-3 w-full bg-gray-200 rounded-full flex overflow-hidden">
                  <div class="h-full transition-all duration-1000" :style="{ width: result.scores['T_F'].percentage + '%', backgroundColor: result.scores['T_F'].dominant === 'T' ? '#33A474' : '#e5e7eb'}"></div>
                  <div class="h-full transition-all duration-1000" :style="{ width: (100 - result.scores['T_F'].percentage) + '%', backgroundColor: result.scores['T_F'].dominant === 'F' ? '#33A474' : '#e5e7eb'}"></div>
                </div>
                <div class="mt-1 text-center text-xs font-bold text-[#33A474]">{{ result.scores['T_F'].percentage }}% {{ result.scores['T_F'].dominant === 'T' ? '理智' : '情感' }}</div>
              </div>

              <!-- J/P -->
              <div class="trait-row">
                <div class="flex justify-between text-sm font-bold text-gray-500 mb-2">
                  <span :class="{'text-[#88619A]': result.scores['J_P'].dominant === 'J'}">判断 (J)</span>
                  <span :class="{'text-[#88619A]': result.scores['J_P'].dominant === 'P'}">感知 (P)</span>
                </div>
                <div class="h-3 w-full bg-gray-200 rounded-full flex overflow-hidden">
                  <div class="h-full transition-all duration-1000" :style="{ width: result.scores['J_P'].percentage + '%', backgroundColor: result.scores['J_P'].dominant === 'J' ? '#88619A' : '#e5e7eb'}"></div>
                  <div class="h-full transition-all duration-1000" :style="{ width: (100 - result.scores['J_P'].percentage) + '%', backgroundColor: result.scores['J_P'].dominant === 'P' ? '#88619A' : '#e5e7eb'}"></div>
                </div>
                <div class="mt-1 text-center text-xs font-bold text-[#88619A]">{{ result.scores['J_P'].percentage }}% {{ result.scores['J_P'].dominant === 'J' ? '判断' : '感知' }}</div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- 文字总结区 -->
      <div class="bg-white rounded-[20px] shadow-sm p-8 md:p-12 mb-8">
        <h3 class="text-2xl font-black text-gray-800 mb-6 border-b-2 border-gray-100 pb-4">
          <i class="fa-solid fa-book-open mr-2 text-gray-400"></i>你的二次元角色描述
        </h3>
        <p class="text-gray-600 text-lg leading-relaxed font-medium mb-6">
          "{{ result.archetype.oneLiner }}"
        </p>
        <p class="text-gray-500 leading-relaxed mb-6">
          {{ result.archetype.description }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div class="bg-gray-50 rounded-xl p-6 border border-gray-100 relative overflow-hidden group hover:border-[#8ca260] transition-colors">
            <h4 class="font-bold text-gray-800 mb-2 relative z-10"><i class="fa-solid fa-star text-[#8ca260] mr-2"></i>亮点表现</h4>
            <p class="text-sm text-gray-600 relative z-10">{{ result.archetype.spotlight }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-6 border border-gray-100 relative overflow-hidden group hover:border-red-400 transition-colors">
            <h4 class="font-bold text-gray-800 mb-2 relative z-10"><i class="fa-solid fa-triangle-exclamation text-red-400 mr-2"></i>短板分析</h4>
            <p class="text-sm text-gray-600 relative z-10">{{ result.archetype.weakness }}</p>
          </div>
        </div>
      </div>

      <!-- 分享下载区 -->
      <div class="bg-white rounded-[20px] shadow-sm p-8 md:p-12 mb-8 text-center">
        <h3 class="text-2xl font-black text-gray-800 mb-4">保存与分享</h3>
        <p class="text-gray-500 mb-8">你可以导出生成的测试海报，或者将属于你的二次元人格文案分享给朋友。</p>
        
        <div class="hidden">
           <SharePoster ref="posterRef" :result="result" />
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          <button 
            @click="exportPoster"
            :disabled="share.isExporting.value"
            class="w-full sm:w-auto px-8 py-4 bg-[#8ca260] hover:bg-[#7b8f54] text-white font-bold rounded-full shadow-lg shadow-[#8ca260]/30 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            :style="{ backgroundColor: result.archetype.accent || '#8ca260' }"
          >
            <i class="fa-solid fa-download mr-2" v-if="!share.isExporting.value"></i>
            <i class="fa-solid fa-spinner fa-spin mr-2" v-else></i>
            {{ share.isExporting.value ? '导出中…' : '导出海报' }}
          </button>
          
          <button 
            @click="copyText"
            class="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-full transition-all active:scale-95 flex items-center justify-center"
          >
            <i class="fa-solid fa-copy mr-2 text-gray-400"></i>
            复制文案
          </button>

          <button 
            @click="retry"
            class="w-full sm:w-auto px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-full transition-all active:scale-95 flex items-center justify-center"
          >
            <i class="fa-solid fa-rotate-right mr-2"></i>
            再测一次
          </button>
        </div>
        <p v-if="share.feedback.value" class="mt-4 text-sm font-bold text-green-500">{{ share.feedback.value }}</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>

