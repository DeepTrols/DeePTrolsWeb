<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import type { NavColumn, NavItem, NavLink } from '~/data/navigation'

defineProps<{
  item: NavItem
}>()

defineEmits<{
  navigate: []
}>()

function linksFor(column: NavColumn): NavLink[] {
  return column.links ?? []
}
</script>

<template>
  <div class="container mega-panel" :class="`mega-panel--${item.layout ?? 'default'}`">
    <template v-if="item.layout === 'services'">
      <div class="mega-panel__services">
        <NuxtLink
          v-for="feature in item.features"
          :key="feature.title"
          :to="feature.href"
          class="mega-panel__service"
          @click="$emit('navigate')"
        >
          <component :is="feature.icon" :size="21" aria-hidden="true" />
          <span>
            <strong>{{ feature.title }}</strong>
            <small>{{ feature.description }}</small>
          </span>
        </NuxtLink>
      </div>
    </template>

    <template v-else>
      <div
        v-if="item.columns?.length"
        class="mega-panel__columns"
        :class="`mega-panel__columns--${item.layout ?? 'default'}`"
      >
        <section v-for="column in item.columns" :key="column.title" class="mega-panel__column">
          <h2>{{ column.title }}</h2>
          <div class="mega-panel__link-list">
            <NuxtLink
              v-for="link in linksFor(column)"
              :key="link.label"
              :to="link.href"
              class="mega-panel__link"
              :class="{ 'mega-panel__link--plain': !link.icon }"
              @click="$emit('navigate')"
            >
              <component v-if="link.icon" :is="link.icon" :size="18" aria-hidden="true" />
              <span>
                <strong>{{ link.label }}</strong>
                <small v-if="link.description">{{ link.description }}</small>
              </span>
            </NuxtLink>
          </div>

          <div v-for="group in column.groups" :key="group.title" class="mega-panel__group">
            <h3>{{ group.title }}</h3>
            <NuxtLink
              v-for="link in group.links"
              :key="link.label"
              :to="link.href"
              class="mega-panel__link"
              @click="$emit('navigate')"
            >
              <component v-if="link.icon" :is="link.icon" :size="18" aria-hidden="true" />
              <span>
                <strong>{{ link.label }}</strong>
                <small v-if="link.description">{{ link.description }}</small>
              </span>
            </NuxtLink>
          </div>

          <NuxtLink
            v-if="column.footerHref && column.footerLabel"
            :to="column.footerHref"
            class="mega-panel__view-all"
            @click="$emit('navigate')"
          >
            {{ column.footerLabel }}
            <ArrowRight :size="16" aria-hidden="true" />
          </NuxtLink>
        </section>
      </div>

      <aside v-if="item.features?.length" class="mega-panel__features" aria-label="FDE">
        <h2 v-if="item.featuresTitle">{{ item.featuresTitle }}</h2>
        <NuxtLink
          v-for="feature in item.features"
          :key="feature.title"
          :to="feature.href"
          class="mega-panel__feature"
          @click="$emit('navigate')"
        >
          <component :is="feature.icon" :size="24" aria-hidden="true" />
          <span>
            <strong>{{ feature.title }}</strong>
            <small>{{ feature.description }}</small>
          </span>
          <ArrowRight :size="18" aria-hidden="true" />
        </NuxtLink>
      </aside>
    </template>
  </div>
</template>

<style scoped lang="scss">
.mega-panel.container {
  display: grid;
  gap: 32px;
  max-width: var(--dt-container);
  padding: 30px 0 34px;
}

.mega-panel--solutions {
  grid-template-columns: minmax(0, 1fr) minmax(320px, 380px);
}

.mega-panel__columns {
  display: grid;
  gap: 0;
}

.mega-panel__columns--product {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.mega-panel__columns--solutions {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.mega-panel__column {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 4px 30px 4px 0;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  margin-right: 30px;

  &:last-child {
    border-right: 0;
    margin-right: 0;
  }

  h2,
  h3 {
    margin: 0;
    color: rgba(238, 245, 251, 0.5);
    font-size: 12px;
    font-weight: 760;
    letter-spacing: 0;
    line-height: 1;
  }
}

.mega-panel__link-list,
.mega-panel__group {
  display: grid;
  gap: 10px;
  margin-top: 18px;
}

.mega-panel__group {
  padding-top: 20px;
}

.mega-panel__link,
.mega-panel__feature,
.mega-panel__service {
  color: var(--dt-color-text);
  transition:
    background-color 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}

.mega-panel__link {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  min-height: 58px;
  border-radius: var(--dt-radius-sm);
  padding: 10px 8px;

  svg {
    color: var(--dt-color-secondary);
    margin-top: 2px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.055);
    transform: translateX(2px);
  }
}

.mega-panel__link--plain {
  grid-template-columns: 1fr;
  min-height: 30px;
  padding: 5px 0;

  &:hover {
    background: transparent;
    color: var(--dt-color-primary);
  }
}

.mega-panel__link strong,
.mega-panel__feature strong,
.mega-panel__service strong {
  display: block;
  color: #ffffff;
  font-size: 14px;
  font-weight: 650;
  line-height: 1.35;
}

.mega-panel__link small,
.mega-panel__feature small,
.mega-panel__service small {
  display: block;
  margin-top: 5px;
  color: var(--dt-color-text-muted);
  font-size: 12px;
  line-height: 1.45;
}

.mega-panel__view-all {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding-top: 24px;
  color: var(--dt-color-secondary);
  font-size: 13px;
  font-weight: 680;
}

.mega-panel__features {
  display: grid;
  gap: 14px;
  align-content: start;
  padding-left: 4px;

  h2 {
    margin: 4px 0 2px;
    color: rgba(238, 245, 251, 0.5);
    font-size: 12px;
    font-weight: 760;
    letter-spacing: 0;
  }
}

.mega-panel__feature {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) 18px;
  align-items: center;
  gap: 14px;
  min-height: 106px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--dt-radius-md);
  background: rgba(255, 255, 255, 0.035);
  padding: 18px;

  > svg {
    color: var(--dt-color-secondary);
  }

  &:hover {
    border-color: rgba(166, 133, 255, 0.38);
    background: rgba(94, 78, 255, 0.09);
    transform: translateY(-2px);
  }
}

.mega-panel__services {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 24px;
  width: min(100%, 760px);
  padding: 8px 0;
}

.mega-panel__service {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 14px;
  min-height: 92px;
  border-radius: var(--dt-radius-sm);
  padding: 16px;

  svg {
    color: var(--dt-color-secondary);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.055);
    transform: translateY(-2px);
  }
}

@media (max-width: 980px) {
  .mega-panel {
    display: none;
  }
}
</style>
