<template>
  <aside class="w-64 bg-primary text-white shadow-lg">
    <nav class="p-6 space-y-2">
      <RouterLink
        to="/dashboard"
        class="block px-4 py-3 rounded hover:bg-secondary transition"
        :class="{ 'bg-secondary': isActive('Dashboard') }"
      >
        📊 Dashboard
      </RouterLink>
      <RouterLink
        to="/products"
        class="block px-4 py-3 rounded hover:bg-secondary transition"
        :class="{ 'bg-secondary': isActive('Products') }"
      >
        📦 Products
      </RouterLink>
      <RouterLink
        to="/categories"
        class="block px-4 py-3 rounded hover:bg-secondary transition"
        :class="{ 'bg-secondary': isActive('Categories') }"
      >
        🏷️ Categories
      </RouterLink>
      <RouterLink
        to="/orders"
        class="block px-4 py-3 rounded hover:bg-secondary transition"
        :class="{ 'bg-secondary': isActive('Orders') }"
      >
        🛒 Orders
      </RouterLink>
      <RouterLink
        to="/cashbook"
        class="block px-4 py-3 rounded hover:bg-secondary transition"
        :class="{ 'bg-secondary': isActive('Cashbook') }"
      >
        💰 Cashbook
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
