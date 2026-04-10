<template>
  <div class="site-shell">
    <!-- 16Personalities-style Header -->
    <header v-if="$route.path !== '/quiz'" class="site-header">
      <RouterLink class="brand-lockup" to="/">
        <div class="brand-logo">AC</div>
        <span class="brand-name">ACGTI</span>
      </RouterLink>

      <nav class="site-nav">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/intro">测试说明</RouterLink>
        <RouterLink to="/about">关于</RouterLink>
        <div class="nav-divider"></div>
        <RouterLink to="/quiz" class="button button-primary" style="padding: 8px 20px; min-height: 40px;">开始测试</RouterLink>
        <div class="nav-social">
          <a href="#" class="social-icon" title="GitHub">GH</a>
          <a href="#" class="social-icon" title="Email">✉</a>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="site-main">
      <RouterView />
    </main>

    <!-- 16Personalities-style Footer (only show on non-quiz pages) -->
    <footer v-if="$route.path !== '/quiz'" class="site-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">产品</h3>
          <a href="/quiz" class="footer-link">性格测试</a>
          <a href="/intro" class="footer-link">测试说明</a>
          <a href="#" class="footer-link">角色原型</a>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">资源</h3>
          <a href="/about" class="footer-link">关于我们</a>
          <a href="#" class="footer-link">常见问题</a>
          <a href="#" class="footer-link">开发文档</a>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">社区</h3>
          <a href="#" class="footer-link">GitHub</a>
          <a href="#" class="footer-link">反馈建议</a>
          <a href="#" class="footer-link">贡献指南</a>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">法律</h3>
          <a href="#" class="footer-link">隐私政策</a>
          <a href="#" class="footer-link">使用条款</a>
          <a href="#" class="footer-link">许可证</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copyright">© 2024 ACGTI. 基于 MIT 许可证开源</p>
        <div class="footer-social">
          <a href="#" title="GitHub">GH</a>
          <a href="#" title="Email">✉</a>
          <a href="#" title="Weibo">WB</a>
        </div>
      </div>
    </footer>
  </div>
</template>
