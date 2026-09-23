import { useFetch } from '#imports'
import { footerColumns, footerSocials } from '~/data/footer'
import type { FooterColumn, FooterSocial } from '~/data/footer'
import { primaryNavigation } from '~/data/navigation'
import type { NavItem } from '~/data/navigation'

export interface FooterMenu {
  columns: FooterColumn[]
  socials: FooterSocial[]
}

/**
 * 菜单双层回退（TASK-015.8）：
 * 1. API 层 /api/navigation DB 优先，无库/未命中回退静态快照；
 * 2. 页面层 useFetch 失败回退静态 import（default）。
 * key 固定，跨组件共享同一份 payload（header/footer 各有多个消费方）。
 */
export function useHeaderNavigation() {
  return useFetch<NavItem[]>('/api/navigation', {
    key: 'nav-header',
    query: { key: 'header' },
    default: () => primaryNavigation,
  })
}

export function useFooterNavigation() {
  return useFetch<FooterMenu>('/api/navigation', {
    key: 'nav-footer',
    query: { key: 'footer' },
    default: () => ({ columns: footerColumns, socials: footerSocials }),
  })
}
