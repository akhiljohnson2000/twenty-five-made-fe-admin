<template>
  <div>
    <h1 class="text-4xl font-bold text-primary mb-8">Orders</h1>

    <!-- Orders Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div v-if="ordersStore.orders.length === 0" class="text-center py-8 text-gray-500">
        No orders yet
      </div>
      <table v-else class="w-full">
        <thead class="bg-neutral">
          <tr>
            <th class="text-left py-3 px-4 font-semibold">Order ID</th>
            <th class="text-left py-3 px-4 font-semibold">User ID</th>
            <th class="text-left py-3 px-4 font-semibold">Total Amount</th>
            <th class="text-left py-3 px-4 font-semibold">Status</th>
            <th class="text-left py-3 px-4 font-semibold">Date</th>
            <th class="text-left py-3 px-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in ordersStore.orders" :key="order.id" class="border-b hover:bg-neutral">
            <td class="py-3 px-4 font-mono text-sm">{{ order.id.slice(0, 8) }}...</td>
            <td class="py-3 px-4 font-mono text-sm">{{ order.user_id.slice(0, 8) }}...</td>
            <td class="py-3 px-4 font-semibold">${{ order.total_amount.toFixed(2) }}</td>
            <td class="py-3 px-4">
              <span :class="getStatusColor(order.status)" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ order.status }}
              </span>
            </td>
            <td class="py-3 px-4">{{ formatDate(order.created_at) }}</td>
            <td class="py-3 px-4">
              <select
                :value="order.status"
                @change="(e) => updateStatus(order.id, (e.target as HTMLSelectElement).value as any)"
                class="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useOrdersStore } from '@/stores/orders'

const ordersStore = useOrdersStore()

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

const updateStatus = async (orderId: string, status: string) => {
  await ordersStore.updateOrderStatus(orderId, status as any)
}

onMounted(async () => {
  await ordersStore.fetchOrders()
})
</script>
