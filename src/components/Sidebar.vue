<template>
  <aside class="w-60 bg-[#0f172a] text-white flex-shrink-0 border-r border-slate-700/50 flex flex-col">
    <nav class="p-4 space-y-1">
      <RouterLink
        to="/dashboard"
        class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
        :class="{ 'bg-emerald-600/20 text-emerald-400': isActive('Dashboard') }"
      >
        <span class="text-lg" aria-hidden="true">📊</span>
        <span>Dashboard</span>
      </RouterLink>
      <RouterLink
        to="/products"
        class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
        :class="{ 'bg-emerald-600/20 text-emerald-400': isActive('Products') }"
      >
        <span class="text-lg" aria-hidden="true">📦</span>
        <span>Products</span>
      </RouterLink>
      <RouterLink
        to="/categories"
        class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
        :class="{ 'bg-emerald-600/20 text-emerald-400': isActive('Categories') }"
      >
        <span class="text-lg" aria-hidden="true">🏷️</span>
        <span>Categories</span>
      </RouterLink>
      <RouterLink
        to="/orders"
        class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
        :class="{ 'bg-emerald-600/20 text-emerald-400': isActive('Orders') }"
      >
        <span class="text-lg" aria-hidden="true">🛒</span>
        <span>Orders</span>
      </RouterLink>
      <RouterLink
        to="/cashbook"
        class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
        :class="{ 'bg-emerald-600/20 text-emerald-400': isActive('Cashbook') }"
      >
        <span class="text-lg" aria-hidden="true">💰</span>
        <span>Cashbook</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (name: string) => {
  return route.name === name
}
</script>
