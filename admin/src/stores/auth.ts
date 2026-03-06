import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ id: string; email: string } | null>(null)
  const token = ref<string | null>(localStorage.getItem('admin_token'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isLoggedIn = computed(() => !!token.value && !!user.value)

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.post('/api/admin/login', { email, password })
      token.value = response.data.token
      user.value = response.data.user
      localStorage.setItem('admin_token', token.value)
      localStorage.setItem('admin_user', JSON.stringify(user.value))
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
  }

  const checkAuth = () => {
    const storedToken = localStorage.getItem('admin_token')
    const storedUser = localStorage.getItem('admin_user')
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isLoggedIn,
    login,
    logout,
    checkAuth,
  }
})
