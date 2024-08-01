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
      <van-col span="5"><van-button type="primary" size="small">主要按钮</van-button></van-col>
      <van-col span="5"><van-button type="success" size="small">成功按钮</van-button></van-col>
      <van-col span="5" offset="9"><van-image round width="3rem" height="3rem" :src="plus" /></van-col>
    </van-row>
    <income />
    <income/>

  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { useDesignSettingStore } from '@/store/modules/designSetting'
import { showDialog } from 'vant';
import income from '@/views/example/components/income.vue'

import plus from '@/assets/icons/plus.svg'

const loading = ref(true);
onMounted(() => {
  loading.value = false;
});


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

<style scoped lang="scss">
.content {
  height: 45%;
  overflow-y: scroll;

  .item {
    padding: 12px 0;

    &:nth-child(even) {
      background-color: #ebf6f9;
    }
  }
}
</style>
