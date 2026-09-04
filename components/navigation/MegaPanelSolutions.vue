<script setup lang="ts">
import MegaPanelNavLink from '~/components/navigation/MegaPanelNavLink.vue'
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
  <aside v-if="item.summary" class="mega-panel__summary">
    <h2>{{ item.summary.title }}</h2>
    <p v-for="line in item.summary.description" :key="line">{{ line }}</p>
  </aside>

  <div class="mega-panel__columns mega-panel__columns--solutions">
    <section v-for="column in item.columns" :key="column.title" class="mega-panel__column">
      <div class="mega-panel__link-list">
        <MegaPanelNavLink
          v-for="link in linksFor(column)"
          :key="link.label"
          :link="link"
          @navigate="$emit('navigate')"
        />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.mega-panel__summary {
  display: grid;
  align-content: center;
  gap: 12px;
  border: 1px solid rgba(166, 133, 255, 0.18);
  border-radius: var(--dt-radius-md);
  background: rgba(94, 78, 255, 0.09);
  padding: 22px;

  h2 {
    margin: 0;
    color: #ffffff;
    font-size: 20px;
    font-weight: 720;
    line-height: 1.2;
  }

  p {
    margin: 0;
    color: var(--dt-color-text-muted);
    font-size: 13px;
    line-height: 1.6;
  }
}

.mega-panel__column {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.mega-panel__columns--solutions .mega-panel__link-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}
</style>
