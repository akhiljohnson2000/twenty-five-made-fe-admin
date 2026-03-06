<template>
  <div class="w-full h-full">
    <svg :viewBox="`0 0 ${width} ${height}`" class="w-full h-full" style="max-width: 100%">
      <!-- Grid -->
      <g class="grid">
        <line v-for="i in 5" :key="`h-${i}`" :x1="0" :y1="(height / 5) * i" :x2="width" :y2="(height / 5) * i" stroke="#e5e7eb" stroke-width="1" />
      </g>

      <!-- Line -->
      <polyline
        :points="points"
        fill="none"
        stroke="#10b981"
        stroke-width="3"
        stroke-linejoin="round"
        stroke-linecap="round"
      />

      <!-- Dots -->
      <circle v-for="(point, i) in parsedPoints" :key="`dot-${i}`" :cx="point.x" :cy="point.y" r="4" fill="#10b981" />

      <!-- X-axis -->
      <line :x1="0" :y1="height - 40" :x2="width" :y2="height - 40" stroke="#9ca3af" stroke-width="2" />

      <!-- Y-axis -->
      <line :x1="40" :y1="0" :x2="40" :y2="height - 40" stroke="#9ca3af" stroke-width="2" />

      <!-- X Labels -->
      <g class="text-xs fill-gray-600">
        <text
          v-for="(item, i) in data"
          :key="`label-x-${i}`"
          :x="40 + (i * (width - 80)) / (data.length - 1)"
          :y="height - 20"
          text-anchor="middle"
          font-size="12"
        >
          {{ item.date?.slice(0, 5) }}
        </text>
      </g>

      <!-- Y Labels -->
      <g class="text-xs fill-gray-600">
        <text v-for="i in 5" :key="`label-y-${i}`" x="30" :y="(height / 5) * (5 - i) + 5" text-anchor="end" font-size="12">
          ${{ ((maxAmount / 5) * i).toFixed(0) }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface DataPoint {
  date: string
  amount: number
}

interface Props {
  data: DataPoint[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})

const width = 800
const height = 300

const maxAmount = computed(() => {
  return Math.max(...props.data.map(d => d.amount), 100)
})

const parsedPoints = computed(() => {
  if (props.data.length === 0) return []

  const xStep = (width - 80) / (props.data.length - 1 || 1)
  const yScale = (height - 40) / maxAmount.value

  return props.data.map((point, i) => ({
    x: 40 + i * xStep,
    y: height - 40 - point.amount * yScale,
  }))
})

const points = computed(() => {
  return parsedPoints.value.map(p => `${p.x},${p.y}`).join(' ')
})
</script>
