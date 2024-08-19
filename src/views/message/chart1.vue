<template>
  <div class="my-card m-40px rounded-2xl p-30px shadow-xl">
    <div ref="chartRef" :style="{ height: '350px' }" />
  </div>
</template>

<script setup lang="ts">
import { createStorage } from '@/utils/Storage'
import { useMouseStore, ItemList, Item } from '@/store/modules/mouse'
import type { EChartsOption } from 'echarts'
import { useECharts } from '@/hooks/web/useECharts'

const chartRef = ref<HTMLDivElement | null>(null)
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

const Storage = createStorage({ storage: localStorage })
// 使用 useUserStore 获取 store 实例
const mouseStore = useMouseStore();
onMounted(async () => {
  // 在组件挂载后获取数据
  let item = {
    period: 1,
    userName: Storage.get("username"),
    year: 2024
  }
  try {
    const response = await mouseStore.queryEcharts(item); // 使用 await 等待异步操作完成
  } catch (error) {
    console.error('添加失败:', error);
    // 这里可以添加错误处理逻辑
  }
});
const chartOptions: EChartsOption = {
  title: {
    text: '收入支出表',
  },
  legend: {
    data: ['收入', '支出', '每月净现金流'],
    top: '10%',
  },
  xAxis: {
    type: 'category',  // x坐标轴类型
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']  // 类目数据
  },
  yAxis: {

    axisLabel: {
      margin: 1,
      // rotate: 30 ,
      showMaxLabel: true // 确保显示最大值
    },
    type: 'value'  // y坐标轴类型
  },
  series: [{
    name: '收入',
    data: [920, 1032, 1001, 1234, 1690, 1630, 1920],  // 数据内容数组
    type: 'line'   // 图表类型 线形图
  },
  {

    name: '支出',
    data: [820, 932, 901, 934, 1290, 1330, 1320],  // 数据内容数组
    type: 'line'   // 图表类型 线形图
  },
  {

    name: '每月净现金流',
    data: [20, 342, 301, 334, 590, 430, 120],  // 数据内容数组
    type: 'line'   // 图表类型 线形图
  }
  ]
}

onMounted(() => {
  setOptions(chartOptions)
})
</script>

<style scoped></style>
