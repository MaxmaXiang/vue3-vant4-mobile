<template>
  <div>
    <NavBar />
    <div class="tag-container">

      <div @click="addTagFun" style="color: blue;"><i class="i-material-symbols:add" />&nbsp;添加标签</div>

      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

      </van-pull-refresh>
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="tag in list" :key="tag.id" @click="updateTagFun(tag)" class="tag-item">
          <i class="i-pepicons-print:label" /> &nbsp;
          {{ tag.tagName }}
        </div>
      </van-list>

      <!-- 新增修改弹窗 -->
      <van-popup v-model:show="addTagTabShow" position="bottom" :style="{ height: '20%' }"
        @click-overlay="closeAddTagTab()">
        <i class="i-line-md:confirm" @click="addTag" style="font-size: 25px;"/>
        <i class="i-material-symbols:delete-outline" style="color: red;" @click="deleteTag" v-if="tag.id != 0" />
        <van-field v-model="tag.tagName" placeholder="名称" class="field-class"/>
      </van-popup>
    </div>
  </div>

</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import * as mouseModule from '@/store/modules/mouse'
import * as TagApi from '@/api/system/tag'
import { ResultEnum } from '@/enums/httpEnum'
import { createStorage } from '@/utils/Storage'

import { showToast } from 'vant';
const Storage = createStorage({ storage: localStorage })
let list = ref<mouseModule.ItemTag[]>([]);
const loading = ref(false);
const finished = ref(false);
let addTagTabShow = ref(false);
const refreshing = ref(false);

function closeAddTagTab() {
  addTagTabShow.value = false
}
function onLoad() {
  queryTag()
}

let tag = reactive({
  userName: Storage.get("username"),
  tagName: "",
  id: 0
})

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  // 重新加载数据
  onLoad();
};


async function queryTag() {
  try {
    const response = await TagApi.query(tag)
    const { data, code } = response
    if (code === ResultEnum.SUCCESS) {
      list.value = data
      loading.value = false;
      finished.value = true;
    }
    return Promise.resolve(response)
  }
  catch (error) {
    return Promise.reject(error)
  }
}

function updateTagFun(tagNow) {
  addTagTabShow.value = true
  tag.id = tagNow.id
  tag.tagName = tagNow.tagName
}
function addTagFun() {
  addTagTabShow.value = true
  tag.id = 0
  tag.tagName = ""
}
async function updateTag() {
  try {
    const response = await TagApi.update(tag)
    const { data, code } = response
    if (code === ResultEnum.SUCCESS) {
      queryTag()
      addTagTabShow.value = false
      showToast('更新成功！');
    }
    return Promise.resolve(response)
  }
  catch (error) {
    return Promise.reject(error)
  }
}

async function deleteTag() {
  try {
    const response = await TagApi.deleteItem(tag)
    const { data, code } = response
    if (code === ResultEnum.SUCCESS) {
      queryTag()
      addTagTabShow.value = false
      showToast('删除成功！');
    }
    return Promise.resolve(response)
  }
  catch (error) {
    return Promise.reject(error)
  }
}

async function addTag() {
  if (tag.id == 0) {
    try {
      const response = await TagApi.insert(tag)
      const { data, code } = response
      if (code === ResultEnum.SUCCESS) {
        queryTag()
        addTagTabShow.value = false
        showToast('新增成功！');
      }
      return Promise.resolve(response)
    }
    catch (error) {
      return Promise.reject(error)
    }
  } else {
    updateTag()
  }

}

onMounted(() => {
  queryTag()
})
</script>

<style scoped lang="less">
.field-class{
  background-color: #F3F4F9;
  margin: 20px;
  border-radius: 8px; /* 设置圆角的大小，这里使用了8px作为示例 */
  border: 2px solid #ccc; /* 设置边框的颜色和宽度，这里使用了1px的细边框和灰色(#ccc) */
  /* 可以添加额外的样式来改善视觉效果，比如添加内边距 */
  padding: 10px;
}
.tag-container {
  margin: 20px;
  border-radius: 8px; /* 设置圆角的大小，这里使用了8px作为示例 */
  border: 1px solid #ccc; /* 设置边框的颜色和宽度，这里使用了1px的细边框和灰色(#ccc) */
  /* 可以添加额外的样式来改善视觉效果，比如添加内边距 */
  padding: 10px;
  /* 如果边框颜色想要更现代的风格，可以选用其他颜色或使用变量 */
  /* border-color: var(--border-color); */
  background-color: #FFFFFF;

}

.tag-list {
  margin-bottom: 10px;
}

.tag-item {
  margin: 5px;
}
</style>
