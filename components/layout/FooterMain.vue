<script setup lang="ts">
import { footerColumns } from '~/data/footer'
</script>

<template>
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
</template>

<style scoped lang="scss">
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

@media (min-width: 768px) {
  .site-footer__main {
    text-align: left;
  }

  .site-footer__columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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
</style>
