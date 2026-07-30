<template>
  <div class="site-footer__bottom">
    <div class="site-footer__filings">
      <a href="https://beian.mps.gov.cn/" target="_blank" rel="noreferrer">
        京公网安备100861001010000号
      </a>
      <span aria-hidden="true">|</span>
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
        京ICP备20018888号-4
      </a>
    </div>
    <div class="site-footer__copyright">
      <span>@ 武汉深度数智科技有限公司 2026 版权所有</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.site-footer__bottom {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
  text-align: center;
}

.site-footer__filings,
.site-footer__copyright {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  color: var(--dt-color-text-muted);
  font-size: 12px;
  font-weight: 500;
  line-height: 17px;
}

.site-footer__filings {
  a {
    transition: color 180ms ease;

    &:hover {
      color: var(--dt-color-primary);
    }

    &:focus-visible {
      border-radius: 4px;
      outline: 2px solid var(--dt-color-primary);
      outline-offset: 2px;
    }
  }
}

@media (min-width: 768px) {
  .site-footer__bottom {
    flex-direction: row;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
    text-align: left;
  }

  .site-footer__filings {
    justify-content: flex-start;
  }

  .site-footer__copyright {
    justify-content: flex-end;
    margin-left: auto;
    text-align: right;
  }
}
</style>
