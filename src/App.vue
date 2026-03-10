<template>
  <div id="app" class="min-h-screen bg-[#f1f5f9]">
    <component v-if="!isLoggedIn" :is="LoginPage" />
    <template v-else>
      <Navbar />
      <div class="min-h-[calc(100vh-56px)]">
        <Sidebar />
        <main class="p-6 lg:p-8 overflow-auto">
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
