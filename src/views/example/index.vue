<template>
  <!-- <div class="my-4">
    <van-cell-group inset>
      <van-cell center title="🌓 暗黑模式">
        <template #right-icon>
          <i inline-block align-middle i="dark:carbon-moon carbon-sun" />
          <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
          <span class="mx-2">{{ isDark }}</span>
          <van-switch v-model="checked" size="22" @click="toggle()" />
        </template>
</van-cell>
<template v-for="item in menuItems" :key="item.route">
        <van-cell :title="item.title" :to="item.route" is-link />
      </template>
</van-cell-group>
</div> -->

  <div class="main">
    <van-row class="head">
      <van-col span="5"><van-button plain hairline type="default" size="small"
          @click="changeToIncome()">收入状况</van-button></van-col>
      <van-col span="5"><van-button plain hairline type="default" size="small"
          @click="changeTopropertyShow()">资产负债表</van-button></van-col>
      <van-col span="5" offset="9"><van-image position="center" width="4rem" height="4rem" :src="plus"
          @click="openPopupShow()" /></van-col>
    </van-row>
    <income class="content" v-show="incomeShow" />
    <property class="content" v-show="propertyShow" />
    <van-popup v-model:show="popupShow" position="bottom" :style="{ height: '30%' }" @click-overlay="closePopupShow()">

      <van-row>
        <van-col span="20">
          <van-radio-group v-model="checked1" direction="horizontal">
            <van-radio name="1" shape="square" v-if="incomeShow">收入</van-radio>
            <van-radio name="2" shape="square" v-if="incomeShow">支出</van-radio>

            <van-radio name="1" shape="square" v-if="propertyShow">资产</van-radio>
            <van-radio name="2" shape="square" v-if="propertyShow">负债</van-radio>
          </van-radio-group>
          <van-radio-group v-model="checked2" direction="horizontal">
            <van-radio name="1" shape="square">具体项</van-radio>
            <van-radio name="2" shape="square">分类</van-radio>
          </van-radio-group>
        </van-col>
        <van-col span="4"><img :src="plane" @click="addItem()"/></van-col>
      </van-row>


      <van-field v-model="itemName" label="名称" placeholder="请输入名称" />
      <van-field v-model="itemValue" label="值" placeholder="请输入值" />
    </van-popup>

  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { useDesignSettingStore } from '@/store/modules/designSetting'
import { showDialog } from 'vant';
import plane from '@/assets/icons/plane.svg';
import income from '@/views/example/components/income.vue'
import property from '@/views/example/components/property.vue'

import plus from '@/assets/icons/plus.svg'

let incomeShow = ref(true)
let propertyShow = ref(false)
let popupShow = ref(false)

function changeTopropertyShow() {
  propertyShow.value = true;
  incomeShow.value = false;
}
function changeToIncome() {
  propertyShow.value = false;
  incomeShow.value = true;
}

function closePopupShow() {
  popupShow.value = false
}

function openPopupShow() {
  popupShow.value = true
}


let task = ref("1")

function onChoose(value) {

}

function addItem() {
  popupShow.value = false
}

const checked1 = ref("1")
const checked2 = ref("1")
const itemName = ref()
const itemValue = ref()
// const loading = ref(true);
// onMounted(() => {
//   loading.value = false;
// });


// const designStore = useDesignSettingStore()

// const isDark = useDark({
//   valueDark: 'dark',
//   valueLight: 'light',
// })

// const checked = ref(isDark.value)

// const toggleDark = useToggle(isDark)

// function toggle() {
//   toggleDark()
//   designStore.setDarkMode(isDark.value ? 'dark' : 'light')
// }

// const menuItems = [
//   { title: '🐗 keep-alive', route: '/editNickname' },
//   { title: '🦘 404 页演示', route: '/404' },
// ]
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;

  .head {
    height: 40px;
    order: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .content {
    height: 200px;
    order: 0;
  }
}

.transportSwitch {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 0.97rem;

  div {
    height: 1.89rem;
    line-height: 1.89rem;
    
    width: 2.37rem;
    color: #0097e0;
    text-align: center;
    border-radius: 0.97rem;
    font-weight: 500;
    font-size: 0.86rem;
    padding: 0 0.2rem;
  }

  .choose {
    border-radius: 0.97rem;
    background: #0097e0;
    color: #ffffff;
  }
}

.icon-plane {
  font-size: 36px;
  /* 设置图标大小 */
  color: #007BFF;
}
</style>
