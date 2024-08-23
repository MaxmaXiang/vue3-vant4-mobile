<template>
  <div>
    <van-button size="small" round @click="changePeriod(1)" :class="item.period==1 ? 'active' : ''">按月统计</van-button>
    <van-button size="small" round @click="changePeriod(2)" :class="item.period==2 ? 'active' : ''">按年统计</van-button>
    <van-button size="small" round v-show="item.period == 1" @click="dateTabShow=true">{{ item.year }}</van-button>
    <div class="my-card m-40px rounded-2xl p-30px shadow-xl">
      <div ref="chartRef1" :style="{ height: '380px' }" />
    </div>

    <div class="my-card m-40px rounded-2xl p-30px shadow-xl">
      <div ref="chartRef2" :style="{ height: '380px' }" />
    </div>

    <div class="my-card m-40px rounded-2xl p-30px shadow-xl">
      <div ref="chartRef3" :style="{ height: '380px' }" />
    </div>

    <!-- 日期选择弹窗 -->
  <van-popup v-model:show="dateTabShow" position="bottom" :style="{ height: '30%' }" @click-overlay="dateTabShow = false">
    <van-date-picker v-model="currentDate" title="选择年份" :min-date="minDate" :max-date="maxDate"
      @confirm="confirmDateTabShow()" @cancel="dateTabShow = false" :columns-type="['year']" />
  </van-popup>
  </div>


</template>

<script setup lang="ts">




import { computed, nextTick, ref, unref, watch } from 'vue'
import { createStorage } from '@/utils/Storage'
import { useMouseStore, ChartVo } from '@/store/modules/mouse'
import type { EChartsOption } from 'echarts'
import { useECharts } from '@/hooks/web/useECharts'
import { ResultEnum } from '@/enums/httpEnum'


const chartRef1 = ref<HTMLDivElement | null>(null)
const { setOptions: setOptions1 } = useECharts(chartRef1 as Ref<HTMLDivElement>)

const chartRef2 = ref<HTMLDivElement | null>(null)
const { setOptions: setOptions2 } = useECharts(chartRef2 as Ref<HTMLDivElement>)
const chartRef3 = ref<HTMLDivElement | null>(null)
const { setOptions: setOptions3 } = useECharts(chartRef3 as Ref<HTMLDivElement>)

const Storage = createStorage({ storage: localStorage })
// 使用 useUserStore 获取 store 实例
const mouseStore = useMouseStore();
let echartVo = ref<ChartVo[]>([])

//日期相关
let dateTabShow = ref(false)
var getTime = new Date().getTime(); //获取到当前时间戳
var time = new Date(getTime); //创建一个日期对象
var year = time.getFullYear(); // 年
let currentDate = ref([year.toString()]);
let minDate = new Date(2020, 0, 1)
let maxDate = new Date(2090, 0, 1)


function confirmDateTabShow() {
  dateTabShow.value = false
  item.year = parseInt(currentDate.value[0])
  queryEchart()
}


let item = reactive({
  period: 1,
  userName: Storage.get("username"),
  year: parseInt(year.toString())
})


function changePeriod(period) {
  if (item.period != period) {
    item.period = period
    queryEchart()
  }
}


async function queryEchart() {
  // 在组件挂载后获取数据
  try {
    const response = await mouseStore.queryEcharts(item); // 使用 await 等待异步操作完成
    const { data, code } = response
    if (code === ResultEnum.SUCCESS) {
      echartVo.value = mouseStore.getCurrentEchartVo
      // console.log("@@@"+JSON.stringify(echartVo.value))
      setOptions1(({
        title: {
          text: "收入支出表",
        },
        legend: {
          data: ['收入', '支出', '每月净现金流'],
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
          data: echartVo.value.map(d => d.dateStr)
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
          data: echartVo.value.map(d => d.income),
          type: 'line'   // 图表类型 线形图
        },
        {

          name: '支出',
          data: echartVo.value.map(d => d.expend),
          type: 'line'   // 图表类型 线形图
        },
        {

          name: '每月净现金流',
          data: echartVo.value.map(d => d.profit),
          type: 'line'   // 图表类型 线形图
        }
        ]
      }));


      setOptions2(({
        title: {
          text: "资产负债表",
        },
        legend: {
          data: ['资产', '负债'],
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
          data: echartVo.value.map(d => d.dateStr)
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
          name: '资产',
          data: echartVo.value.map(d => d.property),
          type: 'line'   // 图表类型 线形图
        },
        {

          name: '负债',
          data: echartVo.value.map(d => d.debt),
          type: 'line'   // 图表类型 线形图
        },
        ]
      }));


      //3

      setOptions3(({
        title: {
          text: "现金流变化表",
        },
        legend: {
          data: ['现金流变化'],
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
          data: echartVo.value.map(d => d.dateStr)
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
          name: '现金流变化',
          data: echartVo.value.map(d => d.propertySecondOrderAdmittance),
          type: 'line'   // 图表类型 线形图
        },
        ]
      }));

    }
  } catch (error) {
    console.error('添加失败:', error);
    // 这里可以添加错误处理逻辑
  }
}
onMounted(async () => {
  queryEchart()
});


</script>

<style scoped>
.active{
  background-color: blue;
  color: aliceblue
}
</style>
