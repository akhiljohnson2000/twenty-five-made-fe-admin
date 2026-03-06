<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-900 mb-6">Orders</h1>

    <div class="admin-card overflow-hidden">
      <div v-if="ordersStore.orders.length === 0" class="text-center py-12 text-slate-500">
        No orders yet
      </div>
      <table v-else class="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in ordersStore.orders" :key="order.id">
            <td class="font-mono text-sm">{{ order.id.slice(0, 8) }}...</td>
            <td class="font-mono text-sm">{{ order.user_id?.slice(0, 8) || '—' }}...</td>
            <td class="font-semibold">${{ order.total_amount.toFixed(2) }}</td>
            <td>
              <span :class="['px-3 py-1 rounded-full text-xs font-medium', getStatusClass(order.status)]">
                {{ order.status }}
              </span>
            </td>
            <td>{{ formatDate(order.created_at) }}</td>
            <td>
              <select
                :value="order.status"
                @change="(e) => updateStatus(order.id, (e.target as HTMLSelectElement).value as any)"
                class="admin-input py-1.5 px-2 text-sm w-full max-w-[130px]"
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

const getStatusClass = (status: string) => {
  const map: Record<string, string> = {
    pending: 'badge-pending',
    processing: 'badge-processing',
    completed: 'badge-completed',
    cancelled: 'badge-cancelled',
  }
  return map[status] || 'bg-slate-100 text-slate-700'
}

const updateStatus = async (orderId: string, status: string) => {
  await ordersStore.updateOrderStatus(orderId, status as any)
}

onMounted(() => {
  ordersStore.fetchOrders()
})
</script>
