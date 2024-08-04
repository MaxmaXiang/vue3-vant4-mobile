<template>
    <div class="container">
        <van-cell-group>
            <van-cell title="收入" :border="false" class="custom-cell" center />
            <van-pull-refresh v-model="isLoadingPull" @refresh="onRefresh">
                <van-list class="scroll-list" v-model:loading="loading" :finished="finished" finished-text="没有更多了"
                @load="onLoad">
                <van-row v-for="item in list" :key="item" type="flex" class="light-green-background">
                    <van-col class="col" span="5">哈哈</van-col>
                </van-row>
            </van-list>
        </van-pull-refresh>
        <van-cell title="总收入" :border="false" style="height: 35px;" center />
        <van-cell title="支出" :border="false" style="height: 35px;" center />
        <van-pull-refresh v-model="isLoadingPull" @refresh="onRefresh">
            <van-list class="scroll-list" v-model:loading="loading" :finished="finished" finished-text="没有更多了"
            @load="onLoad">
            <van-row v-for="item in list" :key="item" type="flex">
                <van-col class="col" span="5">哈哈</van-col>
            </van-row>
        </van-list>
    </van-pull-refresh>
    <van-cell title="总支出" :border="false" style="height: 35px;" center />
    <van-cell title="每月净现金流" :border="false" style="height: 35px;" center />
        </van-cell-group>
    </div>
</template>

<script setup lang="ts">
import { number } from 'echarts';


let isLoadingPull = ref(true);
function onRefresh() {

}

const list = ref([]) as Ref<number[]>;

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
</script>

<style lang="scss" scoped>
.smallhead {
    position: sticky;
    top: 0;
    background-color: #fff;
    /* 背景色，防止内容被覆盖 */
    z-index: 10;
    /* 确保表头在列表之上 */
    height: 50px;
    /* 表头高度 */
    line-height: 50px;
    /* 文字垂直居中 */
    padding: 0 16px;
    /* 表头内边距 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.scroll-list {
    height: 200px;
    /* 列表固定高度 */
    overflow-y: scroll;
    /* 允许垂直滚动 */
}

.container {
    position: relative;
    padding-top: 5px;
    /* 表头的高度 */
}

.custom-cell {
  background-color: #846994; /* 紫色背景 */
  color: white; /* 白色文字 */
  height:35px
}

.light-green-background {
  background-color: #C4ECCA; /* 浅绿色背景 */
}
</style>