<template>
  <nav class="h-14 bg-[#0f172a] text-white shadow-sm border-b border-slate-700/50 flex-shrink-0">
    <div class="h-full px-4 lg:px-6 flex items-center justify-between max-w-[1920px] mx-auto">
      <h1 class="text-lg font-semibold tracking-tight">TwentyFiveMade Admin</h1>
      <div class="flex items-center gap-3">
        <span class="text-sm text-slate-300 hidden sm:inline">{{ authStore.user?.email }}</span>
        <button
          @click="handleLogout"
          class="admin-btn-accent !bg-amber-600 hover:!bg-amber-500 !py-2 !px-4 text-sm font-medium"
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
