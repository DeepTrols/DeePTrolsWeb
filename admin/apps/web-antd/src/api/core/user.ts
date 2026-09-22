import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户信息：探测主站 admin session（401 时由响应拦截器触发重新登录），
 * 通过后返回固定的单管理员身份信息。
 */
export async function getUserInfoApi(): Promise<UserInfo> {
  await requestClient.get('/admin/session');
  return {
    avatar: '',
    desc: 'DeepTrols 站点管理员',
    homePath: '/leads',
    realName: '管理员',
    roles: ['super'],
    token: 'cookie-session',
    userId: 'admin',
    username: 'admin',
  };
}
