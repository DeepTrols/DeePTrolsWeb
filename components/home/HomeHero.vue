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
    linear-gradient(90deg, rgba(0, 0, 0, 0.55) 0, rgba(0, 0, 0, 0.26) 38%, rgba(0, 0, 0, 0) 62%),
    url("/images/home/deepctrls-hero-ai.png");
  background-position: 50% 50%;
  background-size: cover;
}

.home-hero__content {
  position: relative;
  width: calc(100% - (var(--dt-hero-gutter) * 2));
  height: 100%;
  max-width: none;
}

h1 {
  position: absolute;
  top: clamp(78px, 10.729vw, 206px);
  left: 0;
  width: min(763px, 100%);
  max-width: 100%;
  margin: 0;
  background: linear-gradient(104.09deg, #1e44e0 -15.53%, #ffffff 36.62%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-family: "Source Han Sans CN", "Noto Sans SC", sans-serif;
  font-size: clamp(28px, 2.5vw, 48px);
  font-weight: 500;
  line-height: clamp(38px, 3.75vw, 72px);
  letter-spacing: 0;
  -webkit-text-fill-color: transparent;

  span {
    display: block;
  }
}

.home-hero__subtitle {
  position: absolute;
  top: clamp(150px, 19.74vw, 379px);
  left: 0;
  width: min(494px, 100%);
  max-width: 100%;
  margin: 0;
  color: #ffffff;
  font-family: "Source Han Sans CN", "Noto Sans SC", sans-serif;
  font-size: clamp(14px, 0.885vw, 17px);
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 1px;
}

.home-hero__cta {
  position: absolute;
  top: clamp(205px, 24.375vw, 468px);
  left: 0;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 277px;
  height: 47px;
  gap: 8px;
  background: linear-gradient(90deg, #1e44e0, #6583ff);
  color: #ffffff;
  padding: 0 18px 0 24px;
  font-family: "Source Han Sans CN", "Noto Sans SC", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  text-decoration: none;
  transition:
    transform 200ms ease,
    box-shadow 200ms ease,
    filter 200ms ease;

  &:hover,
  &:focus-visible {
    box-shadow: 0 12px 28px rgba(30, 68, 224, 0.24);
    filter: saturate(1.08);
    transform: translateY(-2px);
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
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.68) 0%, rgba(0, 0, 0, 0.28) 68%, rgba(0, 0, 0, 0.05) 100%);
    pointer-events: none;
  }

  .home-hero__content {
    z-index: 1;
    width: calc(100% - 48px);
  }

  h1 {
    top: 142px;
    font-size: 32px;
    line-height: 1.32;
  }

  .home-hero__subtitle {
    top: 270px;
    font-size: 15px;
  }

  .home-hero__cta {
    top: 340px;
    width: min(277px, 100%);
    gap: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-hero__cta {
    transition: none;
  }

  .home-hero__cta:hover,
  .home-hero__cta:focus-visible {
    transform: none;
  }
}
</style>
