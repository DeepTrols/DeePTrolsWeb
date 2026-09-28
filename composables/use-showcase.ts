import { useFetch } from '#imports'
import { aboutIntroGallery } from '~/data/about'
import type { AboutIntroGalleryItem } from '~/data/about'
import { customerLogos } from '~/data/home-logos'
import type { CustomerLogo } from '~/data/home-logos'

interface ShowcaseResponse<T> {
  key: string
  items: T
  source: 'db' | 'static'
}

/**
 * 展示位素材双层回退（TASK-015.14）：
 * 1. API 层 /api/showcase DB 优先，无库/未命中回退静态快照；
 * 2. 页面层 useFetch 失败回退静态 import（default）。
 * key 固定；Logo 静态回退含纯文本条目（DB 协议仅图片条目，见 server/utils/showcase-admin.ts）。
 */
export function useShowcaseGallery() {
  return useFetch('/api/showcase', {
    key: 'showcase-about-gallery',
    query: { key: 'about-gallery' },
    default: () => aboutIntroGallery,
    transform: (res: ShowcaseResponse<AboutIntroGalleryItem[]>) => res.items,
  })
}

export function useShowcaseLogos() {
  return useFetch('/api/showcase', {
    key: 'showcase-home-logos',
    query: { key: 'home-logos' },
    default: () => customerLogos,
    transform: (res: ShowcaseResponse<CustomerLogo[]>) => res.items,
  })
}
