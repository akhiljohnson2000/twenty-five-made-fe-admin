import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Login from '@/pages/Login.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Products from '@/pages/Products.vue'
import Categories from '@/pages/Categories.vue'
import Orders from '@/pages/Orders.vue'
import Cashbook from '@/pages/Cashbook.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: { requiresAuth: true },
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    meta: { requiresAuth: true },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: { requiresAuth: true },
  },
  {
    path: '/cashbook',
    name: 'Cashbook',
    component: Cashbook,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (!authStore.isLoggedIn && authStore.token) {
    authStore.checkAuth()
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/')
  } else if (to.path === '/' && authStore.isLoggedIn) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
