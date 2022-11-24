<script setup lang="ts">
import Chart from 'chart.js/auto'
import { getRelativePosition } from 'chart.js/helpers'

const props = defineProps({
  id: {
    type: String,
    default: () => ('vueChart' + Math.ceil(Math.random() * 100000))
  },
  type: {
    type: String,
    default: 'bar',
  },
  data: {
    type: Object,
    required: true,
  },
})

setTimeout(() => {
  const ctx = document.getElementById(props.id)

  ctx.width = ctx.parentElement.clientWidth
  ctx.height = ctx.parentElement.clientHeight

  const chart = new Chart(ctx, {
    type: props.type,
    data: props.data,
    options: {
      onClick: e => {
        const canvasPosition = getRelativePosition(e, chart)

        // Substitute the appropriate scale IDs
        const dataX = chart.scales.x.getValueForPixel(canvasPosition.x)
        const dataY = chart.scales.y.getValueForPixel(canvasPosition.y)
      },
    },
  })
}, 1000)
</script>

<template>
  <canvas :id="id" />
</template>
