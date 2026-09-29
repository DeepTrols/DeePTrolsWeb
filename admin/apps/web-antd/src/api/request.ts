/**
 * 该文件可自行根据业务逻辑进行调整
 */
import type { RequestClientConfig, RequestClientOptions } from '@vben/request';

import { useAppConfig } from '@vben/hooks';
import { preferences } from '@vben/preferences';
import {
  authenticateResponseInterceptor,
  errorMessageResponseInterceptor,
  RequestClient,
} from '@vben/request';
import { useAccessStore } from '@vben/stores';

import { message } from 'ant-design-vue';

import { useAuthStore } from '#/store';

// 组件自行处理错误提示（如推荐位/分类的 409 中文文案）时在请求 config 置 true，拦截器不再弹统一错误 toast
// （axios config 允许透传自定义字段；web-antd 无法对 axios 做模块增强——它是 @vben/request 的间接依赖）
// 交叉类型绕过 RequestClientConfig 全可选属性的弱类型检查（suppressErrorMessage 非其声明属性）
export const suppressErrorToastConfig: RequestClientConfig & {
  suppressErrorMessage: boolean;
} = { suppressErrorMessage: true };

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

function createRequestClient(baseURL: string, options?: RequestClientOptions) {
  const client = new RequestClient({
    ...options,
    baseURL,
    // 主站 cookie session 鉴权
    withCredentials: true,
  });

  /**
   * 重新认证逻辑（session 失效直接回登录页，无 refresh token 流程）
   */
  async function doReAuthenticate() {
    console.warn('Admin session is invalid or expired. ');
    const accessStore = useAccessStore();
    const authStore = useAuthStore();
    accessStore.setAccessToken(null);
    if (
      preferences.app.loginExpiredMode === 'modal' &&
      accessStore.isAccessChecked
    ) {
      accessStore.setLoginExpired(true);
    } else {
      await authStore.logout();
    }
  }

  async function doRefreshToken(): Promise<string> {
    throw new Error('Refresh token is not supported (cookie session auth).');
  }

  function formatToken(token: null | string) {
    return token ? `Bearer ${token}` : null;
  }

  // 请求头处理
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      config.headers['Accept-Language'] = preferences.app.locale;
      return config;
    },
  });

  // 主站 API 直接返回业务数据（无 code/data 包装）：在此剥掉 axios 外壳。
  // 注意 vben 的 responseReturn:'data' 只在 defaultResponseInterceptor 内生效；
  // 我们不注册它（它要求 {code:0,data} 信封），不剥壳时请求拿到的是整个 AxiosResponse
  client.addResponseInterceptor({
    fulfilled: (response) => response.data,
  });

  // 401 时触发重新登录
  client.addResponseInterceptor(
    authenticateResponseInterceptor({
      client,
      doReAuthenticate,
      doRefreshToken,
      enableRefreshToken: false,
      formatToken,
    }),
  );

  // 通用的错误处理,如果没有进入上面的错误处理逻辑，就会进入这里
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((msg: string, error) => {
      // 这里可以根据业务进行定制,你可以拿到 error 内的信息进行定制化处理，根据不同的 code 做不同的提示，而不是直接使用 message.error 提示 msg
      if (error?.config?.suppressErrorMessage) {
        return;
      }
      // 主站 h3 错误体里 error 字段是 boolean true（勿取），可读文案在 statusMessage/message
      const responseData = error?.response?.data ?? {};
      const errorMessage =
        [responseData?.statusMessage, responseData?.message].find(
          (m) => typeof m === 'string',
        ) ?? '';
      // 如果没有错误信息，则会根据状态码进行提示
      message.error(errorMessage || msg);
    }),
  );

  return client;
}

export const requestClient = createRequestClient(apiURL, {
  responseReturn: 'data',
});

export const baseRequestClient = new RequestClient({
  baseURL: apiURL,
  withCredentials: true,
});
