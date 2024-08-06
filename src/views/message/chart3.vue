<template>
  <div class="my-card m-40px rounded-2xl p-30px shadow-xl">
    <div ref="chartRef" :style="{ height: '350px' }" />
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { useECharts } from '@/hooks/web/useECharts'

const chartRef = ref<HTMLDivElement | null>(null)
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

const chartOptions: EChartsOption = {
  title: {
    text: '资产收益率表',
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
