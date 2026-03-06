<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-900 mb-6">Cashbook & Analytics</h1>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div class="admin-card p-6">
        <div class="text-slate-500 text-sm font-medium mb-1">Total Revenue</div>
        <div class="text-2xl font-bold text-emerald-600">{{ formatCurrency(totalRevenue) }}</div>
      </div>
      <div class="admin-card p-6">
        <div class="text-slate-500 text-sm font-medium mb-1">Completed Orders</div>
        <div class="text-2xl font-bold text-slate-900">{{ completedOrders }}</div>
      </div>
      <div class="admin-card p-6">
        <div class="text-slate-500 text-sm font-medium mb-1">Average Order Value</div>
        <div class="text-2xl font-bold text-amber-600">{{ formatCurrency(averageOrderValue) }}</div>
      </div>
    </div>

    <div class="admin-card p-6 mb-6">
      <h2 class="text-lg font-semibold text-slate-900 mb-4">Daily Sales</h2>
      <div class="h-80">
        <LineChart :data="dailySalesData" />
      </div>
    </div>

    <div class="admin-card p-6">
      <h2 class="text-lg font-semibold text-slate-900 mb-4">All Transactions</h2>
      <div v-if="ordersStore.orders.length === 0" class="text-center py-12 text-slate-500">
        No transactions yet
      </div>
      <div v-else class="overflow-x-auto -mx-6 -mb-6">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Order ID</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in sortedOrders" :key="order.id">
              <td>{{ formatDate(order.created_at) }}</td>
              <td class="font-mono text-sm">{{ order.id.slice(0, 8) }}...</td>
              <td class="font-semibold text-emerald-600">{{ formatCurrency(order.total_amount) }}</td>
              <td>
                <span :class="['px-3 py-1 rounded-full text-xs font-medium', getStatusClass(order.status)]">
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
    .map(([date, amount]) => ({ date, amount }))
})

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const getStatusClass = (status: string) => {
  const map: Record<string, string> = {
    pending: 'badge-pending',
    processing: 'badge-processing',
    completed: 'badge-completed',
    cancelled: 'badge-cancelled',
  }
  return map[status] || 'bg-slate-100 text-slate-700'
}

onMounted(() => {
  ordersStore.fetchOrders()
})
</script>
