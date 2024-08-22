<template>
  <div>
    <span v-for=" date in dateInfo" :key="date.id" :class="date.active ? 'active' : 'passive'">{{ date.name }}</span>
    <chart1 />
    <chart2 />
    <chart3 />
  </div>
</template>

<script setup lang="ts">
import chart1 from './chart1.vue'
import chart2 from './chart2.vue'
import chart3 from './chart3.vue'

const dateInfo = [
  { name: "按年统计", active: true,id:1 },
  {
    name: "按月统计",
    active: false,
    id:2
  },

]


</script>

<style scoped>
span {
  border-radius: 0.53rem;
  text-align: center;
}
</style>
