<template>
  <nav class="h-14 bg-[#0f172a] text-white shadow-sm border-b border-slate-700/50 flex-shrink-0">
    <div class="h-full px-4 lg:px-6 flex items-center justify-between max-w-[1920px] mx-auto">
      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="sidebarStore.toggle()"
          class="p-2 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            v-if="!sidebarStore.isOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 class="text-lg font-semibold tracking-tight">TwentyFiveMade Admin</h1>
      </div>
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
import { useSidebarStore } from '@/stores/sidebar'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const sidebarStore = useSidebarStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>
