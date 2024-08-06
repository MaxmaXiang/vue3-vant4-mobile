<template>
  <div>
    <div :style="getUserCoverBg" class="my-bg h-70" />
    <div
      class="my-card relative mx-6 flex flex-col items-center rounded-2xl pb-2 shadow-xl -top-18"
    >
      <van-image
        class="h-22 w-22 border-2 border-solid !absolute -top-10"
        round
        fit="cover"
        :src="avatar"
      />
      <div class="mt-14 flex flex-col items-center">
        <p class="mb-2 text-5 font-black">
          {{ nickname }}
        </p>
        <p class="text-4">
          {{ sign }}
        </p>
      </div>
      <van-divider class="w-full" />

      <van-cell :border="false" title="个人信息" is-link to="/editUserInfo">
        <template #icon>
          <i class="i-mingcute:idcard-fill mr-2 text-xl" />
        </template>
      </van-cell>

      <van-cell :border="false" title="账号与安全" is-link to="/accountSetting">
        <template #icon>
          <i class="i-material-symbols:account-box mr-2 text-xl" />
        </template>
      </van-cell>

      <van-cell :border="false" title="主题设置" is-link to="/themeSetting">
        <template #icon>
          <i class="i-material-symbols:palette mr-2 text-xl" />
        </template>
      </van-cell>

      <van-cell :border="false" title="日期与时间" is-link to="/dateAndTime">
        <template #icon>
          <i class="i-material-symbols:list-alt-rounded mr-2 text-xl" />
        </template>
      </van-cell>

      <van-cell :border="false" title="退出登录" is-link @click="showLogoutAction = true">
        <template #icon>
          <i class="i-solar:logout-3-bold mr-2 text-xl" />
        </template>
      </van-cell>


      <van-cell center title="🌓 暗黑模式">
        <template #right-icon>
          <i inline-block align-middle i="dark:carbon-moon carbon-sun" />
          <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
          <span class="mx-2">{{ isDark }}</span>
          <van-switch v-model="checked" size="22" @click="toggle()" />
        </template>
      </van-cell>

      <van-action-sheet
        v-model:show="showLogoutAction"
        teleport="body"
        :actions="logoutActions"
        cancel-text="取消"
        description="确认退出登录吗"
        close-on-click-action
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { showToast } from 'vant'
import { useUserStore } from '@/store/modules/user'
import { useDark, useToggle } from '@vueuse/core'
import { useDesignSettingStore } from '@/store/modules/designSetting'

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


const userStore = useUserStore()
const showLogoutAction = ref(false)

const { nickname, avatar, cover, sign } = userStore.getUserInfo

const logoutActions = [
  {
    name: '退出登录',
    color: '#ee0a24',
    callback: () => {
      userStore.Logout()
      showToast('退出成功')
    },
  },
]

const getUserCoverBg = computed(() => {
  return { backgroundImage: `url(${cover || avatar})` }
})
</script>

<style lang="less" scoped>
.my-bg {
  clip-path: inset(0 -55% 0 -55% round 0 0 100% 100%);
  background-size: cover;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), #000);
    opacity: 0.9;
  }
}

.van-cell {
  align-items: center;
  background: transparent;

  &:active {
    background-color: var(--van-cell-active-color);
  }
}
</style>
