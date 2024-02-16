<!-- Template -->
<template>
  <div>
    <!-- Ticker Input -->
    <input
      type="text"
      v-model="inputSymbol"
      placeholder="Enter A Ticker Symbol"
      @keyup.enter="getStockData"
    />
    <button @click="getStockData">Search</button>
    <!-- Chart -->
    <ChartComponent :chartData="chartData"></ChartComponent>
    <div class="value-box">
      <div v-if="formattedStockData">
        <h1>Stock Data for {{ currentSymbol }}</h1>
        <pre>{{ formattedStockData }}</pre>
      </div>
    </div>
  </div>
</template>
<!-- End of template -->
<!-- Script setup -->
<script setup>
import { ref, computed } from 'vue';
import { fetchStockData } from '../services.js';
import ChartComponent from '../components/ChartComponent.vue';

const inputSymbol = ref('');
const stockData = ref(null); // store the fetched stock data
const currentSymbol = ref('');

const chartData = ref({
  type: 'line', // type of chart
  data: {
    labels: [], // x-axis labels
    datasets: [
      {
        label: 'Stock Price',
        data: [], // y-axis data, price
        borderColor: '#4caf50',
        tension: 0.1,
      },
    ],
  },
  options: {},
});

const getStockData = async () => {
  if (inputSymbol.value) {
    currentSymbol.value = inputSymbol.value.toUpperCase(); // Uppercase for symbol consistency
    try {
      const response = await fetchStockData(
        currentSymbol.value
      );
      stockData.value = response; // Store the fetched data

      const timeSeries = response['Time Series (Daily)'];

      // Convert the object into an array of { date, price } objects
      const data = Object.entries(timeSeries).map(
        ([date, value]) => ({
          date: date,
          price: parseFloat(value['4. close']), // Convert the closing price to a float
        })
      );

      // Sort data by date
      data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      // Update chartData for Chart.js
      chartData.value.data.labels = data.map(
        (item) => item.date
      );
      chartData.value.data.datasets[0].data = data.map(
        (item) => item.price
      );
    } catch (error) {
      console.error('Error fetching stock data:', error);
      //reset chartData or handle the error
    }
  }
};
/* Format text to make it more user friendly */
const formattedStockData = computed(() => {
  if (stockData.value) {
    let str = JSON.stringify(stockData.value, null, 2);
    str = str.replace(/{/g, '');
    str = str.replace(/}/g, '');
    str = str.replace(/"/g, '');
    return str;
  }
  return '';
});
</script>
<!-- End of script setup -->
