<template>
  <div>
    <h1 class="text-4xl font-bold text-primary mb-8">Dashboard</h1>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-gray-600 text-sm font-medium mb-2">Total Products</div>
        <div class="text-3xl font-bold text-primary">{{ productsStore.products.length }}</div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-gray-600 text-sm font-medium mb-2">Total Categories</div>
        <div class="text-3xl font-bold text-secondary">{{ categoriesStore.categories.length }}</div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-gray-600 text-sm font-medium mb-2">Total Orders</div>
        <div class="text-3xl font-bold text-accent">{{ ordersStore.orders.length }}</div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-gray-600 text-sm font-medium mb-2">Total Revenue</div>
        <div class="text-3xl font-bold text-primary">{{ formatCurrency(totalRevenue) }}</div>
      </div>
    </div>

    <!-- Recent Orders -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-bold text-primary mb-4">Recent Orders</h2>
      <div v-if="ordersStore.orders.length === 0" class="text-center py-8 text-gray-500">
        No orders yet
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-2 px-4 font-semibold">Order ID</th>
              <th class="text-left py-2 px-4 font-semibold">Amount</th>
              <th class="text-left py-2 px-4 font-semibold">Status</th>
              <th class="text-left py-2 px-4 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in ordersStore.orders.slice(0, 5)" :key="order.id" class="border-b hover:bg-neutral">
              <td class="py-3 px-4">{{ order.id.slice(0, 8) }}...</td>
              <td class="py-3 px-4">{{ formatCurrency(order.total_amount) }}</td>
              <td class="py-3 px-4">
                <span :class="getStatusColor(order.status)" class="px-3 py-1 rounded-full text-sm font-medium">
                  {{ order.status }}
                </span>
              </td>
              <td class="py-3 px-4">{{ formatDate(order.created_at) }}</td>
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
  await Promise.all([
    productsStore.fetchProducts(),
    categoriesStore.fetchCategories(),
    ordersStore.fetchOrders(),
  ])
})
</script>
