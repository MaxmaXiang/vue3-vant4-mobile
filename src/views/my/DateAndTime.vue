<template>
    <div>
        <NavBar />
        <!-- 可以使用 CellGroup 作为容器 -->
        <van-cell-group inset>
            <van-field v-model="value" label="每月时间范围" placeholder="请输入1-28" @blur="blur()"/>
        </van-cell-group>
    </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
let value = ref("")

function blur(){
    console.log("@@@")
}
</script>

<style scoped></style>