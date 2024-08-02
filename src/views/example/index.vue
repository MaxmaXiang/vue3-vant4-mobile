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
      <van-col span="5"><van-button plain hairline type="default" size="small" @click="changeToIncome()">收入状况</van-button></van-col>
      <van-col span="5"><van-button plain hairline type="default" size="small" @click="changeTopropertyShow()">资产负债表</van-button></van-col>
      <van-col span="5" offset="9"><van-image position="center" width="4rem" height="4rem" :src="plus" /></van-col>
    </van-row>
    <income class="content" v-show="incomeShow"/>
    <property class="content" v-show="propertyShow"/>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { useDesignSettingStore } from '@/store/modules/designSetting'
import { showDialog } from 'vant';
import income from '@/views/example/components/income.vue'
import property from '@/views/example/components/property.vue'

import plus from '@/assets/icons/plus.svg'

let incomeShow=ref(true)
let propertyShow=ref(false)

function changeTopropertyShow(){
  propertyShow.value=true;
  incomeShow.value=false;
}
function changeToIncome(){
  propertyShow.value=false;
  incomeShow.value=true;
}
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
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .content {
    height: 200px;
    order: 0;
  }
}
</style>
