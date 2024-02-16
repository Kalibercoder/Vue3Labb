<script setup>
import { ref, watchEffect } from 'vue';
import Chart from 'chart.js/auto';

// Props received from parent
const props = defineProps({
  chartData: Object,
});

const chartRef = ref(null);
let myChart = null;

watchEffect(() => {
  if (props.chartData) {
    if (myChart) {
      myChart.destroy();
    }
    myChart = new Chart(chartRef.value, props.chartData);
  }
});
</script>

<template>
  <div class="chart-box">
    <h1>Chart</h1>
    <canvas ref="chartRef"></canvas>
  </div>
</template>
