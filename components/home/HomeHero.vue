<template>
  <section class="home-hero" aria-labelledby="home-hero-title">
    <div class="home-shell home-hero__content pt-40 pb-32 lg:pb-44">
      <h1 id="home-hero-title">
        <span>构建企业级AI能力体系</span>
        <span>让智能成为业务增长的新引擎</span>
      </h1>
      <p class="home-hero__subtitle">在AI时代，企业不再需要更多工具，而是需要可落地的结果</p>
      <NuxtLink class="home-hero__cta" to="/contact">
        <span>免费获取专属方案</span>
        <span class="home-hero__cta-arrow" aria-hidden="true"></span>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home-hero {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1920 / 655;
  min-height: 420px;
  color: #ffffff;
  background-image:
    linear-gradient(90deg, rgba(3, 9, 15, 0.78) 0%, rgba(3, 9, 15, 0.48) 42%, rgba(3, 9, 15, 0.08) 72%),
    url("/images/home/deepctrls-hero-ai.webp");
  background-position: 50% 50%;
  background-size: cover;
}

.home-hero__content {
  position: relative;
  display: flex;
  width: var(--dt-container);
  height: 100%;
  flex-direction: column;
  justify-content: center;
  max-width: none;
  padding-top: calc(var(--dt-header-height) + 56px);
}

h1 {
  width: min(763px, 100%);
  max-width: 100%;
  margin: 0;
  color: #f7f8fa;
  font-family: "Noto Sans SC Variable", "Source Han Sans CN", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: clamp(28px, 2.5vw, 48px);
  font-weight: 500;
  line-height: clamp(38px, 3.75vw, 72px);
  letter-spacing: 0;

  span {
    display: block;
  }
}

.home-hero__subtitle {
  width: min(494px, 100%);
  max-width: 100%;
  margin: 20px 0 0;
  color: rgba(247, 248, 250, 0.82);
  font-family: "Noto Sans SC Variable", "Source Han Sans CN", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: clamp(14px, 0.885vw, 17px);
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 0;
}

.home-hero__cta {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 240px;
  height: 48px;
  gap: 8px;
  margin-top: 32px;
  border-radius: var(--dt-ui-radius);
  background: var(--dt-color-primary);
  color: #ffffff;
  padding: 0 18px 0 24px;
  font-family: "Noto Sans SC Variable", "Source Han Sans CN", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  text-decoration: none;
  transition:
    background-color 180ms ease,
    border-color 180ms ease;

  &:hover,
  &:focus-visible {
    background: var(--dt-color-primary-hover);
  }
}

.home-hero__cta-arrow {
  position: relative;
  width: 24px;
  height: 8px;
  flex: 0 0 auto;

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 0;
    width: 21px;
    height: 2px;
    background: currentcolor;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    border-top: 2px solid currentcolor;
    border-right: 2px solid currentcolor;
    transform: rotate(45deg);
  }
}

@media (max-width: 700px) {
  .home-hero {
    aspect-ratio: auto;
    min-height: 540px;
    background-position: 63% 50%;
  }

  .home-hero::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(3, 9, 15, 0.48) 0%, rgba(3, 9, 15, 0.18) 70%, transparent 100%);
    pointer-events: none;
  }

  .home-hero__content {
    z-index: 1;
    justify-content: flex-start;
    padding-top: 142px;
  }

  h1 {
    font-size: 32px;
    line-height: 1.32;
  }

  .home-hero__subtitle {
    margin-top: 20px;
    font-size: 15px;
  }

  .home-hero__cta {
    margin-top: 28px;
    width: min(277px, 100%);
    gap: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-hero__cta {
    transition: none;
  }

}
</style>
