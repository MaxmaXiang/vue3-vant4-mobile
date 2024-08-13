import { defineStore } from 'pinia'
import { createStorage } from '@/utils/Storage'
import { store } from '@/store'
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutation-types'
import { ResultEnum } from '@/enums/httpEnum'
import { doLogout, getUserInfo, login, refreshTokenPort } from '@/api/system/user'
import { PageEnum } from '@/enums/pageEnum'
import router from '@/router'

const Storage = createStorage({ storage: localStorage })

interface UserInfo {
  id: number
  username: string
  icon: string
  roles:[]
  menus:[]
}

interface IUserState {
  token?: string
  userInfo: Nullable<UserInfo>
  lastUpdateTime: number
}

interface LoginParams {
  username: string
  password: string
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: () => ({
    userInfo: null,
    token: undefined,
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || Storage.get(CURRENT_USER, '') || {}
    },
    getToken(): string {
      return this.token || Storage.get(ACCESS_TOKEN, '')
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setToken(token) {
      this.token = token || ''
      Storage.set(ACCESS_TOKEN, token)
    },
    setUserInfo(info) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      Storage.set(CURRENT_USER, info)
    },

    async Login(params: LoginParams) {
      try {
        const response = await login(params)
        const { data, code } = response
        if (code === ResultEnum.SUCCESS) {
          this.setToken(data.token)
          // save token
          Storage.set("username",params.username)
        }
        return Promise.resolve(response)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },
    

    async refreshToken() {
      try {
        console.log("@@@@@@@@@@@@@@")
        const response = await refreshTokenPort()
        console.log("@@@"+response)
        const { data, code } = response
        if (code === ResultEnum.SUCCESS) {
          this.setToken(data.token)
        }
        return Promise.resolve(response)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    async GetUserInfo(params: any) {
      try {
        const response = await getUserInfo(params)
        const { data, code } = response
        if (code === ResultEnum.SUCCESS) {
          Storage.set("userId",data.id)
          this.setUserInfo(data)
        }
        return Promise.resolve(response)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    async Logout() {
      if (this.getToken) {
        try {
          await doLogout()
        }
        catch {
          console.error('注销Token失败')
        }
      }
      this.setToken(undefined)
      this.setUserInfo(null)
      Storage.remove(ACCESS_TOKEN)
      Storage.remove(CURRENT_USER)
      router.push(PageEnum.BASE_LOGIN)
      location.reload()
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store)
}
