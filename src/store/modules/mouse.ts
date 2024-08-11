import { defineStore } from 'pinia'
import { createStorage } from '@/utils/Storage'
import { store } from '@/store'
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutation-types'
import { ResultEnum } from '@/enums/httpEnum'
import { insert, update, deleteItem, query, queryEcharts } from '@/api/system/mouse'
import { PageEnum } from '@/enums/pageEnum'
import router from '@/router'

const Storage = createStorage({ storage: localStorage })

export  interface Item {
  "id": number,
  "userName": Nullable<string>,
  "parentId": Nullable<number>,
  "type": Nullable<number>,
  "itemType": Nullable<number>,
  "name": Nullable<string>,
  "value": Nullable<string>,
  "date": Nullable<string>,
  "createBy": Nullable<string>,
  "createTime": Nullable<string>,
  "updateBy": Nullable<string>,
  "updateTime": Nullable<string>,
  "ifDelete": number,
  "children": Nullable<[Item]>
}

export interface ItemList {
  itemTypeStr:Nullable<string>,
  itemType:Nullable<number>,
  itemList:Nullable<[Item]>
}



export const useMouseStore = defineStore({
  id: 'app-mouse',
  state: () => ({
    currentDate: ref(['2021', '01']),
    currentItem: ref([])
  }),
  getters: {
    getCurrentItem(): any {
      return this.currentItem
    },
  },
  actions: {
    async insert(item) {
      try {

        const response = await insert(item)
        const { data, code } = response
        if (code === ResultEnum.SUCCESS) {

        }
        return Promise.resolve(response)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },
    async update(item) {
      try {

        const response = await update(item)
        const { data, code } = response
        if (code === ResultEnum.SUCCESS) {

        }
        return Promise.resolve(response)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },
    async deleteItem(item) {
      try {

        const response = await deleteItem(item)
        const { data, code } = response
        if (code === ResultEnum.SUCCESS) {

        }
        return Promise.resolve(response)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },
    async query(item) {
      try {

        const response = await query(item)
        const { data, code } = response
        if (code === ResultEnum.SUCCESS) {
          this.currentItem = data
        }
        return Promise.resolve(response)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },
    async queryEcharts(item) {
      try {

        const response = await queryEcharts(item)
        const { data, code } = response
        if (code === ResultEnum.SUCCESS) {

        }
        return Promise.resolve(response)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useMouseStore(store)

}
