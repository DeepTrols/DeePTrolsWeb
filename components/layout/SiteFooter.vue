<script setup lang="ts">
type FooterLink = {
  label: string
  href: string
  arrow?: boolean
}

type FooterColumn = {
  title: string
  groups: FooterLink[][]
}

const footerColumns: FooterColumn[] = [
  {
    title: '产品',
    groups: [
      [
        { label: '数曜·数据治理平台', href: '/products/data-governance' },
        { label: '数曜·数据标签平台', href: '/products/data-labeling' },
        { label: '数曜·数据开发平台', href: '/products/data-development' },
        { label: '数曜·数据资产管理平台', href: '/products/data-assets' },
        { label: '博曜·企业级知识管理平台', href: '/products/knowledge-management' },
      ],
      [
        { label: '探曜·AI物联感知平台', href: '/products/ai-iot-perception' },
        { label: 'Device Agent', href: '/products/device-agent' },
      ],
      [
        { label: 'API安全管控平台', href: '/products/api-security-control' },
        { label: 'API安全审计系统', href: '/products/api-security-audit' },
        { label: '业务威胁感知系统', href: '/products/business-threat-sensing' },
      ],
    ],
  },
  {
    title: '使用场景',
    groups: [
      [
        { label: '智能制造', href: '/solutions/manufacturing' },
        { label: '智能环保', href: '/solutions/environment' },
        { label: '智能水利', href: '/solutions/water' },
        { label: '智慧能源', href: '/solutions/energy' },
        { label: '数据治理', href: '/solutions/data-governance' },
        { label: '企业AI应用', href: '/solutions/enterprise-ai' },
        { label: '智慧城市', href: '/solutions/smart-city' },
        { label: '智慧医疗', href: '/solutions/healthcare' },
      ],
    ],
  },
  {
    title: '行业',
    groups: [
      [
        { label: '制造业', href: '/industries/manufacturing' },
        { label: '能源', href: '/industries/energy' },
        { label: '交通运输与物流', href: '/industries/transportation-logistics' },
        { label: '政府/公共事业', href: '/industries/government-public-sector' },
        { label: '教育', href: '/industries/education' },
        { label: '水利/水务', href: '/industries/water' },
        { label: '金融服务', href: '/industries/financial-services' },
        { label: '城市治理', href: '/industries/city-governance' },
        { label: '零售', href: '/industries/retail' },
      ],
    ],
  },
  {
    title: '服务',
    groups: [
      [
        { label: 'Token Hub', href: '/services/token-hub', arrow: true },
        { label: '白皮书&报告', href: '/resources/reports' },
        { label: '产品文档', href: '/docs' },
        { label: '算力与基础设施', href: '/services/infrastructure' },
        { label: '智能体社区', href: '/community/agents', arrow: true },
      ],
    ],
  },
  {
    title: '公司',
    groups: [
      [
        { label: '关于我们', href: '/about' },
        { label: '新闻动态', href: '/news' },
        { label: '合作伙伴', href: '/partners' },
        { label: '加入我们', href: '/careers' },
        { label: '联系我们', href: '/contact' },
        { label: '品牌资源', href: '/brand' },
        { label: '服务案例', href: '/cases' },
        { label: '投资计划', href: '/investment' },
      ],
    ],
  },
]

</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__subscribe">
        <div class="site-footer__subscribe-title">
          <h3>订阅 DeepTrols 最新资讯</h3>
        </div>
        <form class="site-footer__subscribe-form" aria-label="订阅 DeepTrols 最新资讯" @submit.prevent>
          <div class="site-footer__input" data-slot="root">
            <input
              id="footer-email"
              type="email"
              name="email"
              placeholder="邮箱"
              required
              autocomplete="off"
              data-slot="base"
            />
          </div>
          <button type="submit" data-slot="base" class="site-footer__subscribe-button dt-button dt-button--primary dt-button--lg">
            <span data-slot="label" class="truncate">订阅</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              class="iconify iconify--lucide shrink-0 size-4"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              data-slot="trailingIcon"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h14m-7-7l7 7l-7 7"
              />
            </svg>
          </button>
        </form>
      </div>

      <hr class="site-footer__rule" />

      <div class="site-footer__main">
        <div class="site-footer__identity">
          <NuxtLink class="site-footer__logo" to="/" aria-label="DeepTrols 首页">
            <img src="/logo-while.svg" alt="DeepTrols" />
          </NuxtLink>
        </div>

        <nav class="site-footer__nav" aria-label="页脚导航">
          <div class="site-footer__columns">
            <section v-for="column in footerColumns" :key="column.title" class="site-footer__column">
              <h4>{{ column.title }}</h4>
              <template v-for="(group, groupIndex) in column.groups" :key="`${column.title}-${groupIndex}`">
                <ul class="site-footer__list">
                  <li v-for="link in group" :key="link.label">
                    <NuxtLink :to="link.href" class="site-footer__link">
                      <span>{{ link.label }}</span>
                      <svg
                        v-if="link.arrow"
                        xmlns="http://www.w3.org/2000/svg"
                        width="9"
                        fill="none"
                        viewBox="0 0 11 12"
                        class="site-footer__external-icon translate-inline-px translate-y-[-2px] scale-inline-100 transform"
                        aria-hidden="true"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.3"
                          d="M1.71 4.5h6.07m0 0v6.07m0-6.07-7 7"
                        />
                      </svg>
                    </NuxtLink>
                  </li>
                </ul>
                <hr v-if="groupIndex < column.groups.length - 1" class="site-footer__group-rule" />
              </template>
            </section>
          </div>
        </nav>
      </div>

      <div class="site-footer__socials" aria-label="社交媒体">
        <a
          href="https://github.com"
          rel="noopener noreferrer"
          target="_blank"
          class="site-footer__social-link"
          aria-label="GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="iconify iconify--simple-icons w-full h-6"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
        </a>
        <a
          href="https://x.com"
          rel="noopener noreferrer"
          target="_blank"
          class="site-footer__social-link"
          aria-label="X"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="iconify iconify--simple-icons w-full h-6"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M14.234 10.162L22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299l-.929-1.329L3.076 1.56h3.182l5.965 8.532l.929 1.329l7.754 11.09h-3.182z"
            />
          </svg>
        </a>
        <a
          href="https://www.bilibili.com"
          rel="noopener noreferrer"
          target="_blank"
          class="site-footer__social-link"
          aria-label="哔哩哔哩"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="iconify iconify--simple-icons w-full h-6"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M17.813 4.653h.854q2.266.08 3.773 1.574Q23.946 7.72 24 9.987v7.36q-.054 2.266-1.56 3.773c-1.506 1.507-2.262 1.524-3.773 1.56H5.333q-2.266-.054-3.773-1.56C.053 19.614.036 18.858 0 17.347v-7.36q.054-2.267 1.56-3.76t3.773-1.574h.774l-1.174-1.12a1.23 1.23 0 0 1-.373-.906q0-.534.373-.907l.027-.027q.4-.373.92-.373t.92.373L9.653 4.44q.107.106.187.213h4.267a.8.8 0 0 1 .16-.213l2.853-2.747q.4-.373.92-.373c.347 0 .662.151.929.4s.391.551.391.907q0 .532-.373.906zM5.333 7.24q-1.12.027-1.88.773q-.76.748-.786 1.894v7.52q.026 1.146.786 1.893t1.88.773h13.334q1.12-.026 1.88-.773t.786-1.893v-7.52q-.026-1.147-.786-1.894t-1.88-.773zM8 11.107q.56 0 .933.373q.375.374.4.96v1.173q-.025.586-.4.96q-.373.375-.933.374c-.56-.001-.684-.125-.933-.374q-.375-.373-.4-.96V12.44q0-.56.386-.947q.387-.386.947-.386m8 0q.56 0 .933.373q.375.374.4.96v1.173q-.025.586-.4.96q-.373.375-.933.374c-.56-.001-.684-.125-.933-.374q-.375-.373-.4-.96V12.44q.025-.586.4-.96q.373-.373.933-.373"
            />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com"
          rel="noopener noreferrer"
          target="_blank"
          class="site-footer__social-link"
          aria-label="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="iconify iconify--simple-icons w-full h-6"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"
            />
          </svg>
        </a>
        <button type="button" class="site-footer__social-link" aria-label="微信公众号">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="iconify iconify--simple-icons w-full h-6"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213c0 .163.13.295.29.295a.33.33 0 0 0 .167-.054l1.903-1.114a.86.86 0 0 1 .717-.098a10.2 10.2 0 0 0 2.837.403c.276 0 .543-.027.811-.05c-.857-2.578.157-4.972 1.932-6.446c1.703-1.415 3.882-1.98 5.853-1.838c-.576-3.583-4.196-6.348-8.596-6.348M5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178a1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18m5.34 2.867c-1.797-.052-3.746.512-5.28 1.786c-1.72 1.428-2.687 3.72-1.78 6.22c.942 2.453 3.666 4.229 6.884 4.229c.826 0 1.622-.12 2.361-.336a.72.72 0 0 1 .598.082l1.584.926a.3.3 0 0 0 .14.047c.134 0 .24-.111.24-.247c0-.06-.023-.12-.038-.177l-.327-1.233a.6.6 0 0 1-.023-.156a.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983a.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983a.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982"
            />
          </svg>
        </button>
      </div>

      <hr class="site-footer__rule site-footer__rule--bottom" />

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
    </div>
  </footer>
</template>

<style scoped lang="scss">
.site-footer {
  padding-top: 48px;
  background: var(--dt-color-bg-soft);
  color: var(--dt-color-text);
}

.site-footer__subscribe {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  text-align: center;

  h3 {
    margin: 0;
    color: var(--dt-color-text-highlighted);
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
  }
}

.site-footer__subscribe-title {
  width: 100%;
}

.site-footer__subscribe-form {
  display: flex;
  width: 100%;
  max-width: 640px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.site-footer__input {
  position: relative;
  display: inline-flex;
  width: 100%;
  min-width: 250px;
  flex-grow: 1;
  align-items: center;

  input {
    width: 100%;
    height: 48px;
    appearance: none;
    border: 0;
    border-radius: 6px;
    background: var(--dt-color-bg);
    box-shadow: inset 0 0 0 1px var(--dt-color-line-strong);
    color: var(--dt-color-text-highlighted);
    font-size: 16px;
    line-height: 24px;
    outline: none;
    padding: 8px 12px;
    transition:
      background 180ms ease,
      box-shadow 180ms ease;

    &::placeholder {
      color: var(--dt-color-text-dimmed);
    }

    &:focus-visible {
      box-shadow:
        inset 0 0 0 1px var(--dt-color-primary),
        0 0 0 2px var(--dt-color-primary);
    }
  }
}

.site-footer__subscribe-button {
  flex-shrink: 0;
}

.site-footer__rule {
  height: 1px;
  margin: 24px 0 32px;
  border: 0;
  background: var(--dt-color-line);
}

.site-footer__main {
  display: flex;
  flex-direction: column;
  gap: 40px;
  text-align: center;
}

.site-footer__identity {
  flex: 0 0 auto;
}

.site-footer__logo {
  display: inline-block;
  margin-bottom: 0;
  padding: 0;

  img {
    width: 240px;
    height: auto;
  }
}

.site-footer__socials {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 40px;
}

.site-footer__social-link {
  display: inline-flex;
  width: 24px;
  height: 24px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: var(--dt-color-text-muted);
  padding: 0;
  transition: color 180ms ease;

  &:hover {
    color: var(--dt-color-text-highlighted);
  }

  &:focus-visible {
    border-radius: 4px;
    outline: 2px solid var(--dt-color-primary);
    outline-offset: 2px;
  }

  svg {
    width: 100%;
    height: 24px;
  }
}

.site-footer__nav {
  min-width: 0;
}

.site-footer__columns {
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;
}

.site-footer__column {
  h4 {
    margin: 0 0 16px;
    color: var(--dt-color-text-highlighted);
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
  }
}

.site-footer__list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.site-footer__link {
  display: inline-flex;
  align-items: center;
  color: var(--dt-color-text);
  font-size: 14px;
  line-height: 20px;
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

.site-footer__external-icon {
  margin-left: 4px;
  transform: translate(1px, -2px);
}

.site-footer__group-rule {
  height: 1px;
  margin: 16px 0;
  border: 0;
  background: var(--dt-color-line);
}

.site-footer__rule--bottom {
  margin: 40px 0 24px;
}

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
  .site-footer__subscribe {
    flex-direction: row;
    align-items: center;
    text-align: left;
  }

  .site-footer__subscribe-title {
    width: 41.6667%;
  }

  .site-footer__subscribe-form {
    width: 50%;
    max-width: none;
    flex-direction: row;
    margin-left: 8.333%;
  }

  .site-footer__main {
    text-align: left;
  }

  .site-footer__socials {
    justify-content: flex-start;
  }

  .site-footer__columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

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

@media (min-width: 1024px) {
  .site-footer__main {
    flex-direction: row;
    gap: 48px;
  }

  .site-footer__identity {
    width: 20%;
  }

  .site-footer__nav {
    flex: 1 1 0;
  }

  .site-footer__columns {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

@media print {
  .site-footer {
    display: none;
  }
}
</style>
