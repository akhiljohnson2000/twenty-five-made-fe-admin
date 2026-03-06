import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/lib/api'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category_id: string
  image_url?: string
  created_at: string
  updated_at: string
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/api/admin/products', {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
      })
      products.value = response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  const addProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await api.post('/api/admin/products', productData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
      })
      products.value.push(response.data)
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to add product'
      return false
    }
  }

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const response = await api.put(`/api/admin/products/${id}`, productData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
      })
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = response.data
      }
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update product'
      return false
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      await api.delete(`/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
      })
      products.value = products.value.filter(p => p.id !== id)
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to delete product'
      return false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  }
})
