<template>
  <div class="my-card m-40px rounded-2xl p-30px shadow-xl">
    <div ref="chartRef" :style="{ height: '380px' }" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, unref, watch } from 'vue'
import { createStorage } from '@/utils/Storage'
import { useMouseStore, EchartVo, ChartYVo } from '@/store/modules/mouse'
import type { EChartsOption } from 'echarts'
import { useECharts } from '@/hooks/web/useECharts'
import { ResultEnum } from '@/enums/httpEnum'
const chartRef = ref<HTMLDivElement | null>(null)
const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>)

const Storage = createStorage({ storage: localStorage })
// 使用 useUserStore 获取 store 实例
const mouseStore = useMouseStore();
let echartVo2 = ref<EchartVo[]>([])
let echartVo = reactive(echartVo2.value);
onMounted(async () => {
  // 在组件挂载后获取数据
  let item = {
    period: 1,
    userName: Storage.get("username"),
    year: 2024
  }
  try {
    const response = await mouseStore.queryEcharts(item); // 使用 await 等待异步操作完成
    const { data, code } = response
    if (code === ResultEnum.SUCCESS) {
      echartVo = mouseStore.getCurrentEchartVo
      // console.log("@@@"+JSON.stringify(echartVo.value))
      setOptions(({
        title: {
          text: "收入",
        },
        legend: {
          data: ['收入', '支出'],
          top: '10%',
        },
        // dataZoom: [
        //   {
        //     show: true,
        //     start: 0,
        //     end: 50
        //   }
        // ],

        xAxis: {
          axisLabel: { //设置x轴的字
            show: true,
            interval: 0,//使x轴横坐标全部显示

          },
          type: 'category',  // x坐标轴类型
          data: echartVo && echartVo[0] ? echartVo[0].xlist : []
          // data: ["1","222"]
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
          data: echartVo && echartVo[0] ? echartVo[0].yvoList[0].ylist : [],
          type: 'line'   // 图表类型 线形图
        },
        {

          name: '支出',
          data: echartVo && echartVo[0] ? echartVo[0].yvoList[1].ylist : [],
          type: 'line'   // 图表类型 线形图
        },
          // {

          //   name: '每月净现金流',
          //   data: [20, 342, 301, 334, 590, 430, 120],  // 数据内容数组
          //   type: 'line'   // 图表类型 线形图
          // }
        ]
      }));
    }
  } catch (error) {
    console.error('添加失败:', error);
    // 这里可以添加错误处理逻辑
  }
});
</script>

<style scoped></style>
