import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export interface Category {
  id: string
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get('/api/admin/categories', {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
      })
      categories.value = response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch categories'
    } finally {
      loading.value = false
    }
  }

  const addCategory = async (categoryData: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await axios.post('/api/admin/categories', categoryData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
      })
      categories.value.push(response.data)
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to add category'
      return false
    }
  }

  const updateCategory = async (id: string, categoryData: Partial<Category>) => {
    try {
      const response = await axios.put(`/api/admin/categories/${id}`, categoryData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
      })
      const index = categories.value.findIndex(c => c.id === id)
      if (index !== -1) {
        categories.value[index] = response.data
      }
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update category'
      return false
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      await axios.delete(`/api/admin/categories/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
      })
      categories.value = categories.value.filter(c => c.id !== id)
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to delete category'
      return false
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  }
})
