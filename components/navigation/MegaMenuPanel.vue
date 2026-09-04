<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import MegaPanelNavLink from '~/components/navigation/MegaPanelNavLink.vue'
import MegaPanelProduct from '~/components/navigation/MegaPanelProduct.vue'
import MegaPanelSolutions from '~/components/navigation/MegaPanelSolutions.vue'
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
    <MegaPanelProduct v-if="item.layout === 'product'" :item="item" @navigate="$emit('navigate')" />
    <MegaPanelSolutions v-else-if="item.layout === 'solutions'" :item="item" @navigate="$emit('navigate')" />

    <div v-else-if="item.columns?.length" class="mega-panel__columns">
      <section v-for="column in item.columns" :key="column.title" class="mega-panel__column">
        <h2>{{ column.title }}</h2>
        <div class="mega-panel__link-list">
          <MegaPanelNavLink
            v-for="link in linksFor(column)"
            :key="link.label"
            :link="link"
            @navigate="$emit('navigate')"
          />
        </div>

        <div v-for="group in column.groups" :key="group.title" class="mega-panel__group">
          <h3>{{ group.title }}</h3>
          <MegaPanelNavLink
            v-for="link in group.links ?? []"
            :key="link.label"
            :link="link"
            @navigate="$emit('navigate')"
          />
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
  grid-template-columns: minmax(240px, 300px) minmax(0, 1fr);
}

.mega-panel__columns--product,
.mega-panel__columns--solutions {
  min-height: 268px;
}

.mega-panel__columns {
  display: grid;
  gap: 0;
}

.mega-panel__column {
  display: flex;
  flex-direction: column;
  min-height: 100%;

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
  color: var(--dt-color-text);
  transition:
    background-color 180ms ease,
    color 180ms ease,
    transform 180ms ease;

  > svg {
    color: var(--dt-color-secondary);
  }

  strong {
    display: block;
    color: #ffffff;
    font-size: 14px;
    font-weight: 650;
    line-height: 1.35;
  }

  small {
    display: block;
    margin-top: 5px;
    color: var(--dt-color-text-muted);
    font-size: 12px;
    line-height: 1.45;
  }

  &:hover {
    border-color: rgba(166, 133, 255, 0.38);
    background: rgba(94, 78, 255, 0.09);
    transform: translateY(-2px);
  }
}

@media (max-width: 980px) {
  .mega-panel {
    display: none;
  }
}
</style>
