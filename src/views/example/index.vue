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
  <div>

    <van-row>
      <van-col span="8"><van-button type="primary">主要按钮</van-button></van-col>
      <van-col span="8"><van-button type="success">成功按钮</van-button></van-col>
      <van-col span="8"><van-image round width="5rem" height="5rem" :src="plus" /></van-col>
    </van-row>
    <van-row>
      <van-col span="4">span: 4</van-col>
      <van-col span="10" offset="4">offset: 4, span: 10</van-col>
    </van-row>
    <van-row>
      <van-col offset="12" span="12">offset: 12, span: 12</van-col>
    </van-row>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { useDesignSettingStore } from '@/store/modules/designSetting'
import { showDialog } from 'vant';

import plus from '@/assets/icons/plus.svg'

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }
    // 加载状态结束
    loading.value = false;
    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};

const designStore = useDesignSettingStore()

const isDark = useDark({
  valueDark: 'dark',
  valueLight: 'light',
})

const checked = ref(isDark.value)

const toggleDark = useToggle(isDark)

function toggle() {
  toggleDark()
  designStore.setDarkMode(isDark.value ? 'dark' : 'light')
}

const menuItems = [
  { title: '🐗 keep-alive', route: '/editNickname' },
  { title: '🦘 404 页演示', route: '/404' },
]
</script>

<style scoped lang="less"></style>
