<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="admin-card p-6">
        <div class="text-slate-500 text-sm font-medium mb-1">Total Products</div>
        <div class="text-2xl font-bold text-slate-900">{{ productsStore.products.length }}</div>
      </div>
      <div class="admin-card p-6">
        <div class="text-slate-500 text-sm font-medium mb-1">Total Categories</div>
        <div class="text-2xl font-bold text-emerald-600">{{ categoriesStore.categories.length }}</div>
      </div>
      <div class="admin-card p-6">
        <div class="text-slate-500 text-sm font-medium mb-1">Total Orders</div>
        <div class="text-2xl font-bold text-amber-600">{{ ordersStore.orders.length }}</div>
      </div>
      <div class="admin-card p-6">
        <div class="text-slate-500 text-sm font-medium mb-1">Total Revenue</div>
        <div class="text-2xl font-bold text-slate-900">{{ formatCurrency(totalRevenue) }}</div>
      </div>
    </div>

    <div class="admin-card p-6">
      <h2 class="text-lg font-semibold text-slate-900 mb-4">Recent Orders</h2>
      <div v-if="ordersStore.orders.length === 0" class="text-center py-12 text-slate-500">
        No orders yet
      </div>
      <div v-else class="overflow-x-auto -mx-6 -mb-6">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in ordersStore.orders.slice(0, 5)" :key="order.id">
              <td class="font-mono text-sm">{{ order.id.slice(0, 8) }}...</td>
              <td>{{ formatCurrency(order.total_amount) }}</td>
              <td>
                <span :class="['px-3 py-1 rounded-full text-xs font-medium', getStatusClass(order.status)]">
                  {{ order.status }}
                </span>
              </td>
              <td>{{ formatDate(order.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useCategoriesStore } from '@/stores/categories'
import { useOrdersStore } from '@/stores/orders'

const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()
const ordersStore = useOrdersStore()

const totalRevenue = computed(() => {
  return ordersStore.orders.reduce((sum, order) => sum + order.total_amount, 0)
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

onMounted(async () => {
  await Promise.all([
    productsStore.fetchProducts(),
    categoriesStore.fetchCategories(),
    ordersStore.fetchOrders(),
  ])
})
</script>
