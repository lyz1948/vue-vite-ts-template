<script setup lang="ts">
import Chart from 'chart.js/auto'
import { getRelativePosition } from 'chart.js/helpers'
import { debounce } from '@/utils/index'
import { onMounted, ref } from 'vue';

const props = defineProps({
  id: {
    type: String,
    default: () => 'vueChart' + Math.ceil(Math.random() * 100000),
  },
  options: {
    type: Object,
    required: true,
  },
})

const canvasRef = ref(null)
const chart = ref(null)

const initChart = () => {
  const ctx = document.getElementById(props.id)
  ctx.width = ctx.parentElement.offsetWidth
  ctx.height = ctx.parentElement.offsetHeight

  const chart = new Chart(ctx, {
    ...props.options,
    options: {
      onClick: e => {
        const canvasPosition = getRelativePosition(e, chart)
        // Substitute the appropriate scale IDs
        const dataX = chart.scales.x.getValueForPixel(canvasPosition.x)
        const dataY = chart.scales.y.getValueForPixel(canvasPosition.y)
      },
    },
  })

  chart.value = chart
}

onMounted(() => {
  setTimeout(() => {
    initChart()
  }, 1000)
})


// window.addEventListener('resize', debounce(() => {
//   const ctx = canvasRef.value
//   // ctx.width = ctx.parentElement.offsetWidth
//   ctx.height = ctx.parentElement.offsetHeight
// }, 500))

</script>

<template>
  <canvas :id="id" ref="canvasRef" />
</template>
