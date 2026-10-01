import process from 'node:process';

import { defineConfig } from '@vben/vite-config';

import { loadEnv } from 'vite';

export default defineConfig(async ({ mode }) => {
  // 代理目标可配（VITE_PROXY_TARGET，默认主站 dev 端口），避免端口变化导致接口报错
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const proxyTarget = env.VITE_PROXY_TARGET || 'http://localhost:3000';

  return {
    application: {},
    vite: {
      server: {
        // 固定端口：被占用时直接报错，不再静默漂移到 5667/5668…
        port: 5666,
        strictPort: true,
        proxy: {
          // 同源代理到 Nuxt 主站（Nitro API），cookie session 直接透传
          '/api': {
            changeOrigin: true,
            target: proxyTarget,
          },
          // 媒体库上传产物（public/uploads）同样走主站，保证 <img> 预览可用
          '/uploads': {
            changeOrigin: true,
            target: proxyTarget,
          },
        },
      },
    },
  };
});
