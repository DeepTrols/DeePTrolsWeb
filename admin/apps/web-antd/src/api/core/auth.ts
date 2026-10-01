import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    ok: boolean;
  }
}

/**
 * 登录（主站封闭 cookie session，成功即写入 httpOnly cookie）
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('/admin/login', {
    password: data.password,
    username: data.username,
  });
}

/**
 * 退出登录（baseRequestClient 构造时已开 withCredentials；axios post 第二参是 body，不要再传配置对象）
 */
export async function logoutApi() {
  return baseRequestClient.post('/admin/logout');
}
