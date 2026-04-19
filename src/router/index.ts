import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../pages/HomePage.vue') },
    { path: '/quiz', name: 'quiz', component: () => import('../pages/QuizPage.vue') },
    { path: '/result', name: 'result', component: () => import('../pages/ResultPage.vue') },
    { path: '/characters', name: 'characters', component: () => import('../pages/CharactersPage.vue') },
    { path: '/about', name: 'about', component: () => import('../pages/AboutPage.vue') },
    { path: '/stats', name: 'stats', component: () => import('../pages/StatsPage.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

// 兼容旧 hash 路由：检测 URL 中的 #/xxx 并重定向到 /xxx
const hashMatch = window.location.hash.match(/^#\/(.+)/)
if (hashMatch) {
  const path = '/' + hashMatch[1]
  window.history.replaceState(null, '', path)
  // 让 vue-router 在初始化后正确导航
  router.push(path).catch(() => {})
}

export default router
