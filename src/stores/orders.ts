import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/lib/api'

export interface Order {
  id: string
  user_id?: string
  customer_name?: string
  customer_email?: string
  total_amount: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  order_status?: string
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  product_name?: string
}

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchOrders = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/api/admin/orders', {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
      })
      orders.value = (response.data || []).map((o: any) => ({
      ...o,
      status: (o.order_status ?? o.status) as Order['status'],
      user_id: o.customer_email ?? o.user_id,
    }))
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch orders'
    } finally {
      loading.value = false
    }
  }

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      const response = await api.patch(`/api/admin/orders/${id}`, { order_status: status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
      })
      const index = orders.value.findIndex(o => o.id === id)
      if (index !== -1) {
        orders.value[index] = response.data
      }
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update order'
      return false
    }
  }

  return {
    orders,
    loading,
    error,
    fetchOrders,
    updateOrderStatus,
  }
})
