<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <h1 class="hero-quote">
        "终于有人真正懂你了。"
      </h1>
      <p class="hero-subtitle">
        只需 10 分钟，就能获得一个"极其准确"的描述，告诉你是什么样的人，以及你为什么会用这样的方式做事。
      </p>
      <RouterLink to="/quiz" class="hero-cta">开始测试</RouterLink>
      <div class="hero-image-placeholder">
        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" class="hero-image">
          <!-- Background gradient -->
          <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#E0F6FF;stop-opacity:1" />
            </linearGradient>
          </defs>

          <!-- Sky background -->
          <rect width="800" height="400" fill="url(#skyGradient)"/>

          <!-- Mountains -->
          <polygon points="0,400 150,250 300,400" fill="#6B8E8E"/>
          <polygon points="200,400 400,200 600,400" fill="#5A7A7A"/>
          <polygon points="500,400 650,220 800,400" fill="#6B8E8E"/>

          <!-- Ground -->
          <rect x="0" y="350" width="800" height="50" fill="#4A6741"/>

          <!-- Campfire -->
          <ellipse cx="400" cy="370" rx="30" ry="8" fill="#8B7355"/>
          <ellipse cx="400" cy="365" rx="20" ry="12" fill="#FF6B35"/>
          <ellipse cx="400" cy="360" rx="12" ry="15" fill="#FF8C42"/>

          <!-- People silhouettes sitting around campfire -->
          <circle cx="350" cy="340" r="15" fill="#2C3E50"/>
          <rect x="342" y="355" width="16" height="25" rx="8" fill="#2C3E50"/>

          <circle cx="380" cy="335" r="15" fill="#34495E"/>
          <rect x="372" y="350" width="16" height="25" rx="8" fill="#34495E"/>

          <circle cx="420" cy="335" r="15" fill="#2C3E50"/>
          <rect x="412" y="350" width="16" height="25" rx="8" fill="#2C3E50"/>

          <circle cx="450" cy="340" r="15" fill="#34495E"/>
          <rect x="442" y="355" width="16" height="25" rx="8" fill="#34495E"/>

          <!-- Stars -->
          <circle cx="100" cy="80" r="2" fill="#FFFFFF"/>
          <circle cx="200" cy="120" r="2" fill="#FFFFFF"/>
          <circle cx="700" cy="90" r="2" fill="#FFFFFF"/>
          <circle cx="650" cy="150" r="2" fill="#FFFFFF"/>
          <circle cx="150" cy="180" r="2" fill="#FFFFFF"/>
          <circle cx="750" cy="200" r="2" fill="#FFFFFF"/>

          <!-- Moon -->
          <circle cx="680" cy="80" r="40" fill="#F5F5DC"/>
        </svg>
      </div>
    </section>

    <!-- Personality Types Section -->
    <section class="feature-section">
      <div class="section-header">
        <span class="section-eyebrow">角色原型</span>
        <h2 class="section-title">了解不同的角色类型</h2>
        <p class="section-description">
          在我们的角色原型描述中，你将了解真正驱动、激励和困扰不同性格类型的因素，帮助你建立更有意义的人际关系。
        </p>
      </div>

      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon" style="background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);">
            🎭
          </div>
          <h3 class="feature-card-title">主角型</h3>
          <p class="feature-card-text">
            天生的领导者，富有魅力和自信，总是能够激励他人朝着共同的目标努力。
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon" style="background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);">
            💡
          </div>
          <h3 class="feature-card-title">智囊型</h3>
          <p class="feature-card-text">
            善于分析和思考的创新者，总是能够想出独特的解决方案来应对复杂问题。
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon" style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);">
            ⚔️
          </div>
          <h3 class="feature-card-title">守护者型</h3>
          <p class="feature-card-text">
            务实可靠的守护者，重视传统和稳定，总是能够保护和支持身边的人。
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon" style="background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);">
            🎨
          </div>
          <h3 class="feature-card-title">探险家型</h3>
          <p class="feature-card-text">
            充满好奇心的探险家，热爱自由和探索，总是渴望体验新事物和冒险。
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon" style="background: linear-gradient(135deg, #33a474 0%, #27ae60 100%);">
            🌟
          </div>
          <h3 class="feature-card-title">治愈者型</h3>
          <p class="feature-card-text">
            温和善良的治愈者，总是能够理解和支持他人的情感需求。
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon" style="background: linear-gradient(135deg, #88619a 0%, #8e44ad 100%);">
            🔮
          </div>
          <h3 class="feature-card-title">神秘主义者型</h3>
          <p class="feature-card-text">
            富有想象力的梦想家，总是能够看到事物背后更深层的含义。
          </p>
        </div>
      </div>
    </section>

    <!-- Teams Section -->
    <section class="feature-section feature-section-alt">
      <div class="split-section">
        <div class="split-section-content">
          <span class="section-eyebrow">团队合作</span>
          <h2 class="split-section-title">更好地了解你的团队</h2>
          <p class="split-section-text">
            通过我们的团队评估工具，更好地了解你的团队。改善沟通，创造和谐，帮助团队成员发展个人优势。适用于各种规模的团队。
          </p>
          <RouterLink to="/quiz" class="button button-primary">开始团队评估</RouterLink>
        </div>
        <div class="split-section-image">
          <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <!-- Office background -->
            <rect x="0" y="0" width="400" height="300" fill="#f8f9fa"/>

            <!-- Desk -->
            <rect x="50" y="200" width="300" height="10" fill="#8B7355"/>
            <rect x="70" y="210" width="10" height="60" fill="#8B7355"/>
            <rect x="320" y="210" width="10" height="60" fill="#8B7355"/>

            <!-- Person 1 - standing -->
            <circle cx="120" cy="140" r="20" fill="#3498db"/>
            <rect x="110" y="160" width="20" height="40" rx="5" fill="#3498db"/>

            <!-- Person 2 - sitting -->
            <circle cx="200" cy="150" r="20" fill="#e74c3c"/>
            <rect x="190" y="170" width="20" height="30" rx="5" fill="#e74c3c"/>

            <!-- Person 3 - standing -->
            <circle cx="280" cy="140" r="20" fill="#33a474"/>
            <rect x="270" y="160" width="20" height="40" rx="5" fill="#33a474"/>

            <!-- Speech bubble -->
            <ellipse cx="160" cy="100" rx="40" ry="20" fill="#ffffff" stroke="#d0d0d0" stroke-width="2"/>
            <polygon points="170,115 175,125 165,125" fill="#ffffff" stroke="#d0d0d0" stroke-width="2"/>

            <!-- Speech bubble 2 -->
            <ellipse cx="240" cy="90" rx="40" ry="20" fill="#ffffff" stroke="#d0d0d0" stroke-width="2"/>
            <polygon points="230,105 235,115 225,115" fill="#ffffff" stroke="#d0d0d0" stroke-width="2"/>

            <!-- Laptop -->
            <rect x="180" y="190" width="40" height="5" fill="#2c3e50"/>
            <rect x="185" y="195" width="30" height="3" fill="#34495e"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="section-header">
        <span class="section-eyebrow">用户评价</span>
        <h2 class="section-title">看看大家怎么说</h2>
      </div>

      <div class="testimonials-grid">
        <div class="testimonial-card">
          <div class="testimonial-avatar"></div>
          <p class="testimonial-text">
            "这个测试太准了！它完全理解了我在二次元世界中的真实性格，让我知道了自己属于哪种角色类型。"
          </p>
          <p class="testimonial-author">动漫爱好者</p>
          <p class="testimonial-type">主角型 (ENFJ)</p>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-avatar" style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);"></div>
          <p class="testimonial-text">
            "终于有一个专门为二次元爱好者设计的性格测试了！结果非常准确，推荐给所有喜欢动漫的朋友。"
          </p>
          <p class="testimonial-author">资深宅男</p>
          <p class="testimonial-type">智囊型 (INTP)</p>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-avatar" style="background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);"></div>
          <p class="testimonial-text">
            "测试过程很有趣，结果也很有趣。发现自己原来是最像某个动漫角色的类型，太神奇了！"
          </p>
          <p class="testimonial-author">cosplay 爱好者</p>
          <p class="testimonial-type">探险家型 (ISFP)</p>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-avatar" style="background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);"></div>
          <p class="testimonial-text">
            "作为一个长期看动漫的人，这个测试真的很懂我！它抓住了我内心深处的角色原型。"
          </p>
          <p class="testimonial-author">动画专业学生</p>
          <p class="testimonial-type">神秘主义者型 (INFJ)</p>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="feature-section">
      <div class="section-header">
        <h2 class="section-title">好奇我们有多了解你？</h2>
        <p class="section-description" style="margin-top: 16px;">
          加入成千上万的二次元爱好者，发现你的角色原型
        </p>
        <div style="margin-top: 32px;">
          <RouterLink to="/quiz" class="hero-cta">立即开始测试</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Home page component - 16Personalities style layout
</script>

<style scoped>
.home-page {
  width: 100%;
}

.hero-image-placeholder {
  margin-top: 48px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.hero-image {
  width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

@media (max-width: 768px) {
  .hero-image-placeholder {
    margin-top: 32px;
  }
}
</style>
