import { http } from '@/utils/http/axios'
import {getAppEnvConfig} from '@/utils/env'
const url=getAppEnvConfig().VITE_GLOB_API_URL+"/runningJerry/item"
export interface BasicResponseModel<T = any> {
  code: number
  message: string
  data: T
}


/**
 * @description: 新增项
 */
export function insert(params: any) {
    return http.request<BasicResponseModel>(
      {
        url: url+'/insert',
        method: 'POST',
        params,
      },
      {
        isTransformResponse: false,
      },
    )
  }

  /**
 * @description: 修改项
 */
export function update(params: any) {
    return http.request<BasicResponseModel>(
      {
        url: url+'/update',
        method: 'POST',
        params,
      },
      {
        isTransformResponse: false,
      },
    )
  }

  /**
 * @description: 删除项
 */
export function deleteItem(params: any) {
    return http.request<BasicResponseModel>(
      {
        url: url+'/delete',
        method: 'POST',
        params,
      },
      {
        isTransformResponse: false,
      },
    )
  }

  /**
 * @description: 查询项
 */
export function query(params: any) {
    return http.request<BasicResponseModel>(
      {
        url: url+'/query',
        method: 'POST',
        params,
      },
      {
        isTransformResponse: false,
      },
    )
  }


  /**
 * @description: 查询图表
 */
export function queryEcharts(params: any) {
  return http.request<BasicResponseModel>(
    {
      url: url+'/queryEcharts',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    },
  )
}