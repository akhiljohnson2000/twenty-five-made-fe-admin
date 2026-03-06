<template>
  <div id="app" class="min-h-screen bg-neutral">
    <component v-if="!isLoggedIn" :is="LoginPage" />
    <template v-else>
      <Navbar />
      <div class="flex">
        <Sidebar />
        <main class="flex-1 p-6">
          <RouterView />
        </main>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import LoginPage from '@/pages/Login.vue'

const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)
</script>
