<template>
  <div class="min-h-screen bg-gradient-to-br from-primary to-dark flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
      <h1 class="text-3xl font-bold text-primary mb-8 text-center">TwentyFiveMade</h1>
      <h2 class="text-xl font-semibold text-dark mb-6 text-center">Admin Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-dark mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            placeholder="admin@twentyfivemade.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-dark mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full bg-secondary hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
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
