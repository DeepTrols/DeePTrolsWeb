import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            // 同源代理到 Nuxt 主站（Nitro API），cookie session 直接透传
            target: 'http://localhost:3000',
          },
          // 媒体库上传产物（public/uploads）同样走主站，保证 <img> 预览可用
          '/uploads': {
            changeOrigin: true,
            target: 'http://localhost:3000',
          },
        },
      },
    },
  };
});
