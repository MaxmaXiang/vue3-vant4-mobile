<template>
  <div class="main">
    <van-row class="head">
      <van-col span="4"><van-button plain hairline type="default" size="small"
          @click="changeToIncome()">收入状况</van-button></van-col>
      <van-col span="4"><van-button plain hairline type="default" size="small"
          @click="changeTopropertyShow()">资产负债表</van-button></van-col>
      <van-col span="4">
        <van-button plain hairline type="default" size="small" @click="chooseDate()">{{ currentDate.toString()
          }}</van-button>
      </van-col>
      <van-col span="1" offset="9"><van-image position="center" width="4rem" height="4rem" :src="plus"
          @click="openPopupShow()" /></van-col>
    </van-row>

    <!-- 收入支出tab页 -->
    <div class="container" v-show="incomeShow">
      <van-cell-group>
        <van-cell title="收入" :border="false" class="custom-cell" center />
        <van-pull-refresh v-model="isLoadingPull" @refresh="onRefresh">
          <van-list class="scroll-list" v-model:loading="loading" :finished="finished" finished-text="没有更多了"
            @load="onLoad">
            <van-row v-for="item in currentItem1" :key="item.id" type="flex" justify="space-between"
              class="light-green-background">
              <van-col class="name-col"><span>{{ item.name }}：</span></van-col>
              <van-col class="value-col"><span>￥{{ item.value }}</span></van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>
        <van-cell title="总收入" :border="false" style="height: 35px;" center />
        <van-cell title="支出" :border="false" style="height: 35px;" center />
        <van-pull-refresh v-model="isLoadingPull" @refresh="onRefresh">
          <van-list class="scroll-list" v-model:loading="loading" :finished="finished" finished-text="没有更多了"
            @load="onLoad">
            <van-row v-for="item in currentItem2" :key="item.id" type="flex" justify="space-between"
              class="light-green-background">
              <van-col class="name-col"><span>{{ item.name }}：</span></van-col>
              <van-col class="value-col"><span>￥{{ item.value }}</span></van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>
        <van-cell title="总支出" :border="false" style="height: 35px;" center />
        <van-cell title="每月净现金流" :border="false" style="height: 35px;" center />
      </van-cell-group>
    </div>

    <!-- 资产负债tab页 -->
    <div class="container" v-show="propertyShow">
      <van-cell-group>
        <van-cell title="资产" :border="false" class="custom-cell" center />
        <van-pull-refresh v-model="isLoadingPull" @refresh="onRefresh">
          <van-list class="scroll-list" v-model:loading="loading" :finished="finished" finished-text="没有更多了"
            @load="onLoad">
            <van-row v-for="item in currentItem3" :key="item.id" type="flex" justify="space-between"
              class="light-green-background">
              <van-col class="name-col"><span>{{ item.name }}：</span></van-col>
              <van-col class="value-col"><span>￥{{ item.value }}</span></van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>
        <van-cell title="总资产" :border="false" style="height: 35px;" center />
        <van-cell title="负债" :border="false" style="height: 35px;" center />
        <van-pull-refresh v-model="isLoadingPull" @refresh="onRefresh">
          <van-list class="scroll-list" v-model:loading="loading" :finished="finished" finished-text="没有更多了"
            @load="onLoad">
            <van-row v-for="item in currentItem4" :key="item.id" type="flex" justify="space-between"
              class="light-green-background">
              <van-col class="name-col"><span>{{ item.name }}：</span></van-col>
              <van-col class="value-col"><span>￥{{ item.value }}</span></van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>
        <van-cell title="总负债" :border="false" style="height: 35px;" center />
      </van-cell-group>
    </div>
    <!-- 新增修改弹窗 -->
    <van-popup v-model:show="popupShow" position="bottom" :style="{ height: '30%' }" @click-overlay="closePopupShow()">

      <van-row>
        <van-col span="10">
          <van-radio-group v-model="itemType" direction="horizontal">
            <van-radio name="1" shape="square" v-if="incomeShow">收入</van-radio>
            <van-radio name="2" shape="square" v-if="incomeShow">支出</van-radio>

            <van-radio name="3" shape="square" v-if="propertyShow">资产</van-radio>
            <van-radio name="4" shape="square" v-if="propertyShow">负债</van-radio>
          </van-radio-group>
          <van-radio-group v-model="type" direction="horizontal">
            <van-radio name="1" shape="square">文件夹</van-radio>
            <van-radio name="2" shape="square">文件</van-radio>
          </van-radio-group>

        </van-col>
        <van-button span="4" @click="openTreeSelectTabShow" size="normal">选择父id</van-button>
        <van-col span="4" offset="4"><img :src="plane" @click="addItem()" /></van-col>
      </van-row>


      <van-field v-model="itemName" label="名称" placeholder="请输入名称" />
      <van-field v-model="itemValue" label="值" placeholder="请输入值" />
    </van-popup>


    <!-- 日期选择弹窗 -->
    <van-popup v-model:show="dateTabShow" position="bottom" :style="{ height: '30%' }"
      @click-overlay="closeDateTabShow()">
      <van-date-picker v-model="currentDate" :title="currentDate.values[0] + currentDate.values[1]" :min-date="minDate"
        :max-date="maxDate" @confirm="closeDateTabShow()" @cancel="closeDateTabShow()"
        :columns-type="['year', 'month']" />
    </van-popup>

    <!-- 父id选择弹窗 -->
    <van-popup v-model:show="treeSelectTabShow" position="bottom" :style="{ height: '30%' }"
      @click-overlay="closeTreeSelectTabShow()">
      <van-picker title="选择父id" :columns="currentItem1" @confirm="onConfirm" @cancel="onCancel" @change="onChange" :columns-field-names="customFieldName"/>
    </van-popup>

  </div>
</template>

<script setup lang="ts">
import { useMouseStore, ItemList, Item } from '@/store/modules/mouse'
import { useDark, useToggle } from '@vueuse/core'
import { useDesignSettingStore } from '@/store/modules/designSetting'
import { showDialog, showToast } from 'vant';
import plane from '@/assets/icons/plane.svg';
import income from '@/views/example/components/income.vue'
import property from '@/views/example/components/property.vue'
import { createStorage } from '@/utils/Storage'
import plus from '@/assets/icons/plus.svg'


const Storage = createStorage({ storage: localStorage })
// 使用 useUserStore 获取 store 实例
const mouseStore = useMouseStore();

//收入tab页是否展示
let incomeShow = ref(true)
//资产tab页是否展示
let propertyShow = ref(false)
//新增tab页是否展示
let popupShow = ref(false)
//选择日期页是否展示
let dateTabShow = ref(false)
//选择父id页是否展示
let treeSelectTabShow = ref(false)

var getTime = new Date().getTime(); //获取到当前时间戳
var time = new Date(getTime); //创建一个日期对象
var year = time.getFullYear(); // 年
var month = (time.getMonth() + 1).toString().padStart(2, '0'); // 月
//收入支出页
const loading = ref(false);
const finished = ref(false);
let isLoadingPull = ref(true);
function onRefresh() {
  queryItem()
  isLoadingPull.value = false
}
const onLoad = () => {
  loading.value = false;
  finished.value = true;

};

let currentDate = ref([year.toString(), month]);
let minDate = new Date(2020, 0, 1)
let maxDate = new Date(2090, 0, 1)

interface column {
  text: string,
  value: string
}
//父id选择弹窗
const columns = [
  { text: '杭州', value: 'Hangzhou' },
  { text: '宁波', value: 'Ningbo' },
  { text: '温州', value: 'Wenzhou' },
  { text: '绍兴', value: 'Shaoxing' },
  { text: '湖州', value: 'Huzhou' },
];
const onConfirm = ({ selectedValues }) => {
  showToast(`当前值: ${selectedValues.join(',')}`);
};
const onChange = ({ selectedValues }) => {
  showToast(`当前值: ${selectedValues.join(',')}`);
};
const onCancel = () => showToast('取消');
const customFieldName = {
      text: 'name',
      value: 'id',
    };


function changeTopropertyShow() {
  propertyShow.value = true;
  incomeShow.value = false;
}
function changeToIncome() {
  propertyShow.value = false;
  incomeShow.value = true;
}

function closePopupShow() {
  popupShow.value = false
}

function openPopupShow() {
  popupShow.value = true
}

function closeTreeSelectTabShow() {
  treeSelectTabShow.value = false
}
function openTreeSelectTabShow() {
  treeSelectTabShow.value = true
}

async function addItem() {
  let item = {
    userName: Storage.get("username"),
    date: currentDate.value[0] + "-" + currentDate.value[1] + "-01",
    type: type.value,
    parentId: -1,
    itemType: itemType.value,
    value: itemValue.value,
    name: itemName.value,
    createBy: Storage.get("username"),
  };
  try {
    await mouseStore.insert(item); // 使用 await 等待异步操作完成
    showToast('新增成功！');
  } catch (error) {
    showToast('新增失败！');
    console.error('添加失败:', error);
    // 这里可以添加错误处理逻辑
  }
  popupShow.value = false
}


function chooseDate() {
  dateTabShow.value = true;
}

function closeDateTabShow() {
  dateTabShow.value = false;
}

const type = ref("1")
const itemType = ref("1")
const itemName = ref()
const itemValue = ref()


//获取收入支出资产负债数据
let currentItem = ref<ItemList[]>([])
let currentItem1 = ref<Item[]>([])
let currentItem2 = ref<Item[]>([])
let currentItem3 = ref<Item[]>([])
let currentItem4 = ref<Item[]>([])
let filterContinerItem1 = ref<Item[]>([])
let filterContinerItem2 = ref<Item[]>([])
let filterContinerItem3 = ref<Item[]>([])
let filterContinerItem4 = ref<Item[]>([])
async function queryItem() {
  nextTick();
  let item = {
    userName: Storage.get("username"),
    date: currentDate.value[0] + "-" + currentDate.value[1] + "-01"
  };
  try {

    const response = await mouseStore.query(item); // 使用 await 等待异步操作完成
    currentItem1 = response.data[0].itemList
    currentItem2 = response.data[1].itemList
    currentItem3 = response.data[2].itemList
    currentItem4 = response.data[3].itemList
    filterContinerItem1.value = (currentItem1.value || []).filter((item, index, array) => {
      return item.type == 1||'1';
    });
    filterContinerItem2.value = (currentItem2.value || []).filter((item, index, array) => {
      return item.type == 1;
    });
    filterContinerItem3.value = (currentItem3.value || []).filter((item, index, array) => {
      return item.type == 1;
    });
    filterContinerItem4.value = (currentItem4.value || []).filter((item, index, array) => {
      return item.type == 1;
    });
  } catch (error) {
    console.error('添加失败:', error);
    // 这里可以添加错误处理逻辑
  }

}

onMounted(async () => {
  // 在组件挂载后获取数据
  queryItem();
});
const activeId = ref(1);
const activeIndex = ref(0);


</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;

  .head {
    height: 40px;
    order: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .content {
    height: 200px;
    order: 0;
  }
}

.transportSwitch {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 0.97rem;

  div {
    height: 1.89rem;
    line-height: 1.89rem;

    width: 2.37rem;
    color: #0097e0;
    text-align: center;
    border-radius: 0.97rem;
    font-weight: 500;
    font-size: 0.86rem;
    padding: 0 0.2rem;
  }

  .choose {
    border-radius: 0.97rem;
    background: #0097e0;
    color: #ffffff;
  }
}

.icon-plane {
  font-size: 36px;
  /* 设置图标大小 */
  color: #007BFF;
}


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
  background-color: #846994;
  /* 紫色背景 */
  color: black;
  /* 白色文字 */
  height: 35px
}

.light-green-background {
  background-color: #C4ECCA;
  /* 浅绿色背景 */
}
</style>
