<template>
  <div>
    <NavBar />
    <div @click="addTagTabShow = true" style="color: blue;"><i class="i-material-symbols:add" />添加标签</div>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for="tag in list" :key="tag.id" @click="updateTag">
        <i class="i-pepicons-print:label" />
        {{ tag.tagName }}
      </div>
    </van-list>

    <!-- 新增修改弹窗 -->
    <van-popup v-model:show="addTagTabShow" position="bottom" :style="{ height: '30%' }"
      @click-overlay="closeAddTagTab()">
      <van-field v-model="tag.tagName" label="文本" placeholder="请输入名称" />
      <i class="i-line-md:confirm" @click="addTag" />
      <i class="i-material-symbols:delete-outline" style="color: red;" @click="deleteTag" v-if="tag.id != 0" />
    </van-popup>
  </div>

</template>

<script setup lang="ts">
import * as mouseModule from '@/store/modules/mouse'
import * as TagApi from '@/api/system/tag'
import { ResultEnum } from '@/enums/httpEnum'
import { createStorage } from '@/utils/Storage'

const Storage = createStorage({ storage: localStorage })
let list = ref<mouseModule.ItemTag[]>([]);
const loading = ref(false);
const finished = ref(false);
let addTagTabShow = ref(false);


function closeAddTagTab() {
  addTagTabShow.value = false
}
function onLoad() {
  queryTag(tag)
}

let tag = reactive({
  userName: Storage.get("username"),
  tagName: "",
  id: 0
})

async function queryTag(item) {
  try {
    const response = await TagApi.query(item)
    const { data, code } = response
    if (code === ResultEnum.SUCCESS) {
      list = data
      loading.value = false;
      finished.value = true;
    }
    return Promise.resolve(response)
  }
  catch (error) {
    return Promise.reject(error)
  }
}

async function updateTag(item) {
  try {
    const response = await TagApi.update(item)
    const { data, code } = response
    if (code === ResultEnum.SUCCESS) {
      queryTag(item)
    }
    return Promise.resolve(response)
  }
  catch (error) {
    return Promise.reject(error)
  }
}

async function deleteTag(item) {
  try {
    const response = await TagApi.deleteItem(item)
    const { data, code } = response
    if (code === ResultEnum.SUCCESS) {
      queryTag(item)
    }
    return Promise.resolve(response)
  }
  catch (error) {
    return Promise.reject(error)
  }
}

async function addTag(item) {
  try {
    const response = await TagApi.insert(item)
    const { data, code } = response
    if (code === ResultEnum.SUCCESS) {
      queryTag(item)
    }
    return Promise.resolve(response)
  }
  catch (error) {
    return Promise.reject(error)
  }
}

onMounted(() => {
  queryTag(tag)
})
</script>

<style scoped lang="less"></style>
