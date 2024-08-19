import { defineStore } from 'pinia'
import { createStorage } from '@/utils/Storage'
import { store } from '@/store'
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutation-types'
import { ResultEnum } from '@/enums/httpEnum'
import { insert, update, deleteItem, query, queryEcharts } from '@/api/system/mouse'
import { PageEnum } from '@/enums/pageEnum'
import router from '@/router'
import { sumItemValues } from '@/utils/sum'
const Storage = createStorage({ storage: localStorage })

export interface Item {
  "id": number,
  "loopMode": number,
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
  itemTypeStr: Nullable<string>,
  itemType: Nullable<number>,
  itemList: Nullable<[Item]>
}

export interface EchartVo {
  chartName: string,
  xList: string[],
  yVoList: ChartYVo[]
}

export interface ChartYVo {
  lineName: string,
  yList: string[]
}



export const useMouseStore = defineStore({
  id: 'app-mouse',
  state: () => ({
    currentItem: ref<ItemList[]>([]),
    echartVo: ref<EchartVo[]>([])

  }),
  getters: {
    getCurrentItem(): ItemList[] {
      return this.currentItem
    },
    getCurrentItem0Type1(state): Item[] {
      return (state.currentItem[0].itemList || []).filter((item, index, array) => {
        return item.type == 1;
      });
    },
    getCurrentItem1Type1(state): Item[] {
      return (state.currentItem[1].itemList || []).filter((item, index, array) => {
        return item.type == 1;
      });
    },
    getCurrentItem2Type1(state): Item[] {
      return (state.currentItem[2].itemList || []).filter((item, index, array) => {
        return item.type == 1;
      });
    },
    getCurrentItem3Type1(state): Item[] {
      return (state.currentItem[3].itemList || []).filter((item, index, array) => {
        return item.type == 1;
      });
    },
    //总收入
    getCurrentItemIncomeTotal(state): number {
      let s = (state.currentItem[0].itemList || [])
      let total = sumItemValues(s)
      return total;
    },
    //总支出
    getCurrentItemExpendTotal(state): number {
      let s = (state.currentItem[1].itemList || [])
      let total = sumItemValues(s)
      return total;
    },
    //总资产
    getCurrentItemPropertyTotal(state): number {
      let s = (state.currentItem[2].itemList || [])
      let total = sumItemValues(s)
      return total;
    },
    //总负债
    getCurrentItemDebtTotal(state): number {
      let s = (state.currentItem[3].itemList || [])
      let total = sumItemValues(s)
      return total;
    },
    //每月净现金流
    getCurrentItemCashFlow(state): number {
      let s = (state.currentItem[0].itemList || [])
      let total = sumItemValues(s)
      let s1 = (state.currentItem[1].itemList || [])
      let total2 = sumItemValues(s1)
      return total - total2;
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
          this.echartVo = data
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
