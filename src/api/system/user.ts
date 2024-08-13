import { http } from '@/utils/http/axios'
import {getAppEnvConfig} from '@/utils/env'
const url=getAppEnvConfig().VITE_GLOB_API_URL+"/admin"
export interface BasicResponseModel<T = any> {
  code: number
  message: string
  data: T
}

/**
 * @description: 用户登录
 */
export function login(params: any) {
  return http.request<BasicResponseModel>(
    {
      url: url+'/login',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    },
  )
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo(params: any) {
  return http.request({
    url: url+'/info',
    method: 'get',
  })
}

/**
 * @description: 用户登出
 */
export function doLogout() {
  return http.request({
    url: url+'/logout',
    method: 'POST',
  })
}

/**
 * @description: 刷新token
 */
export function refreshTokenPort() {
  return http.request({
    url: url+'/refreshToken',
    method: 'get',
  })
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params: any, uid: any) {
  return http.request(
    {
      url: `/user/u${uid}/changepw`,
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    },
  )
}


