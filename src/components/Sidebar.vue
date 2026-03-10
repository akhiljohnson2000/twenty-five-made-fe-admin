<template>
  <Teleport to="body">
    <!-- Backdrop: close sidebar when clicking outside (mobile/tablet) -->
    <Transition name="backdrop">
      <div
        v-if="sidebarStore.isOpen"
        class="fixed inset-0 bg-black/50 z-40 lg:hidden"
        aria-hidden="true"
        @click="sidebarStore.close()"
      />
    </Transition>

    <!-- Sidebar panel -->
    <Transition name="sidebar">
      <aside
        v-if="sidebarStore.isOpen"
        class="fixed top-14 left-0 bottom-0 w-60 bg-[#0f172a] text-white border-r border-slate-700/50 flex flex-col z-50 shadow-xl"
      >
        <nav class="p-4 space-y-1 overflow-y-auto">
          <RouterLink
            to="/dashboard"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
            :class="{ 'bg-emerald-600/20 text-emerald-400': isActive('Dashboard') }"
            @click="sidebarStore.close()"
          >
            <span class="text-lg" aria-hidden="true">📊</span>
            <span>Dashboard</span>
          </RouterLink>
          <RouterLink
            to="/products"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
            :class="{ 'bg-emerald-600/20 text-emerald-400': isActive('Products') }"
            @click="sidebarStore.close()"
          >
            <span class="text-lg" aria-hidden="true">📦</span>
            <span>Products</span>
          </RouterLink>
          <RouterLink
            to="/categories"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
            :class="{ 'bg-emerald-600/20 text-emerald-400': isActive('Categories') }"
            @click="sidebarStore.close()"
          >
            <span class="text-lg" aria-hidden="true">🏷️</span>
            <span>Categories</span>
          </RouterLink>
          <RouterLink
            to="/orders"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
            :class="{ 'bg-emerald-600/20 text-emerald-400': isActive('Orders') }"
            @click="sidebarStore.close()"
          >
            <span class="text-lg" aria-hidden="true">🛒</span>
            <span>Orders</span>
          </RouterLink>
          <RouterLink
            to="/cashbook"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
            :class="{ 'bg-emerald-600/20 text-emerald-400': isActive('Cashbook') }"
            @click="sidebarStore.close()"
          >
            <span class="text-lg" aria-hidden="true">💰</span>
            <span>Cashbook</span>
          </RouterLink>
        </nav>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useSidebarStore } from '@/stores/sidebar'

const route = useRoute()
const sidebarStore = useSidebarStore()

const isActive = (name: string) => {
  return route.name === name
}
</script>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.25s ease;
}
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.2s ease;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
</style>
