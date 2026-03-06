<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
    <div class="admin-card w-full max-w-md p-8 shadow-xl">
      <h1 class="text-2xl font-bold text-slate-900 mb-1 text-center">TwentyFiveMade</h1>
      <h2 class="text-lg font-medium text-slate-600 mb-6 text-center">Admin Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="admin-input"
            placeholder="admin@twentyfivemade.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="admin-input"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full admin-btn-primary py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {{ authStore.loading ? 'Logging in...' : 'Login' }}
        </button>

        <div v-if="authStore.error" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {{ authStore.error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  const success = await authStore.login(email.value, password.value)
  if (success) {
    router.push('/dashboard')
  }
}
</script>
