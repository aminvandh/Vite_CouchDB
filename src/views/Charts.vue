<template>
  <div class="chart-wrapper">
    <div class="chart-container">
      <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
    <div class="button-container">
      <button @click="toggleData">Toggle Data</button>
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData1: {
        labels: ['CouchDB', 'MongoDB', 'Redis'],
        datasets: [{ data: [40, 20, 12] }]
      },
      chartData2: {
        labels: ['CouchDB', 'MongoDB', 'Redis'],
        datasets: [{ data: [2, 30, 20] }]
      },
      chartData: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: { display: true, text: 'CouchDB Benchmarks' }
        },
        scales: {
          y: {
            min: 1,
            max: 50
          }
        }
      },
      flag: false
    }
  },
  created() {
    this.chartData = this.chartData1
  },
  methods: {
    toggleData() {
      if (this.flag) {
        this.chartData = this.chartData1
        this.chartOptions.plugins.title.text = 'CouchDB Benchmarks'
      } else {
        this.chartData = this.chartData2
        this.chartOptions.plugins.title.text = 'New Title'
      }
      this.flag = !this.flag
    }
  }
}
</script>

<style scoped>
.chart-wrapper {
  position: relative;
  width: 400px;
  height: 300px;
}

.chart-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.button-container {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
