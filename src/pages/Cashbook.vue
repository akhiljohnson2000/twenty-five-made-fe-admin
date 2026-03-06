<template>
  <div>
    <h1 class="text-4xl font-bold text-primary mb-8">Cashbook & Analytics</h1>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-gray-600 text-sm font-medium mb-2">Total Revenue</div>
        <div class="text-3xl font-bold text-secondary">{{ formatCurrency(totalRevenue) }}</div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-gray-600 text-sm font-medium mb-2">Completed Orders</div>
        <div class="text-3xl font-bold text-primary">{{ completedOrders }}</div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-gray-600 text-sm font-medium mb-2">Average Order Value</div>
        <div class="text-3xl font-bold text-accent">{{ formatCurrency(averageOrderValue) }}</div>
      </div>
    </div>

    <!-- Sales Over Time Chart -->
    <div class="bg-white rounded-lg shadow p-6 mb-8">
      <h2 class="text-2xl font-bold text-primary mb-4">Daily Sales</h2>
      <div class="h-80">
        <LineChart :data="dailySalesData" />
      </div>
    </div>

    <!-- Transactions Table -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-bold text-primary mb-4">All Transactions</h2>
      <div v-if="ordersStore.orders.length === 0" class="text-center py-8 text-gray-500">
        No transactions yet
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4 font-semibold">Date</th>
              <th class="text-left py-3 px-4 font-semibold">Order ID</th>
              <th class="text-left py-3 px-4 font-semibold">Amount</th>
              <th class="text-left py-3 px-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in sortedOrders" :key="order.id" class="border-b hover:bg-neutral">
              <td class="py-3 px-4">{{ formatDate(order.created_at) }}</td>
              <td class="py-3 px-4 font-mono text-sm">{{ order.id.slice(0, 8) }}...</td>
              <td class="py-3 px-4 font-semibold text-secondary">{{ formatCurrency(order.total_amount) }}</td>
              <td class="py-3 px-4">
                <span :class="getStatusColor(order.status)" class="px-3 py-1 rounded-full text-sm font-medium">
                  {{ order.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useOrdersStore } from '@/stores/orders'
import LineChart from '@/components/LineChart.vue'

const ordersStore = useOrdersStore()

const completedOrders = computed(() => {
  return ordersStore.orders.filter(o => o.status === 'completed').length
})

const totalRevenue = computed(() => {
  return ordersStore.orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + o.total_amount, 0)
})

const averageOrderValue = computed(() => {
  if (completedOrders.value === 0) return 0
  return totalRevenue.value / completedOrders.value
})

const sortedOrders = computed(() => {
  return [...ordersStore.orders].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
})

const dailySalesData = computed(() => {
  const data: Record<string, number> = {}
  ordersStore.orders.forEach(order => {
    const date = new Date(order.created_at).toLocaleDateString()
    data[date] = (data[date] || 0) + (order.status === 'completed' ? order.total_amount : 0)
  })

  return Object.entries(data)
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([date, amount]) => ({
      date,
      amount,
    }))
})

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

onMounted(async () => {
  await ordersStore.fetchOrders()
})
</script>
