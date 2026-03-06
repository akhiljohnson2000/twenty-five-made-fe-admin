<template>
  <nav class="bg-primary text-white shadow-lg">
    <div class="px-6 py-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold">TwentyFiveMade Admin</h1>
      <div class="flex items-center gap-4">
        <span class="text-sm">{{ authStore.user?.email }}</span>
        <button
          @click="handleLogout"
          class="bg-accent hover:bg-orange-600 text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>
