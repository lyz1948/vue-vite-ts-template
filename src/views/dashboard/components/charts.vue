<script setup lang="ts">
import Chart from '@/components/Chart/index.vue'
import { lineData, barData, pieData } from './options'
</script>

<template>
  <div class="chart">
    <div class="container">
      <div class="chart-list">
        <div class="chart-item">
          <div class="inner" style="height: 450px">
            <Chart :options="barData" />
          </div>
        </div>
        <div class="chart-item">
          <div class="inner" style="height: 450px">
            <Chart :options="lineData" />
          </div>
        </div>
      </div>

      <div class="chart-list">
        <div class="chart-item">
          <div class="inner">
            <Chart :options="pieData" />
          </div>
        </div>
        <div class="chart-item">
          <div class="inner">
            <Chart :options="pieData" />
          </div>
        </div>
        <div class="chart-item">
          <div class="inner">
            <Chart :options="pieData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart {
  &-list {
    display: flex;
    margin-bottom: 20px;
    margin-right: -20px;

    .chart-item {
      flex: 1;
      margin-right: 20px;
    }
    .inner {
      height: 350px;
      padding: 20px;
      background: #fff;
      
    }
    canvas {
      margin: 0 auto;
    }
  }
}
</style>
