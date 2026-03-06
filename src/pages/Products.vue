<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h1 class="text-2xl font-bold text-slate-900">Products</h1>
      <button
        @click="showAddForm = true"
        class="admin-btn-primary shrink-0"
      >
        Add Product
      </button>
    </div>

    <div v-if="showAddForm" class="admin-card p-6 mb-6">
      <h2 class="text-lg font-semibold text-slate-900 mb-4">{{ editingId ? 'Edit Product' : 'Add New Product' }}</h2>
      <form @submit.prevent="handleSave" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="form.name"
          type="text"
          placeholder="Product Name"
          required
          class="admin-input md:col-span-2"
        />
        <select
          v-model="form.category_id"
          required
          class="admin-input"
        >
          <option value="">Select Category</option>
          <option v-for="cat in categoriesStore.categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
        <input
          v-model.number="form.price"
          type="number"
          step="0.01"
          placeholder="Price"
          required
          class="admin-input"
        />
        <input
          v-model.number="form.stock"
          type="number"
          placeholder="Stock"
          required
          class="admin-input"
        />
        <textarea
          v-model="form.description"
          placeholder="Description"
          rows="2"
          class="admin-input md:col-span-2"
        />
        <div class="flex gap-3 md:col-span-2">
          <button
            type="submit"
            :disabled="productsStore.loading"
            class="admin-btn-primary flex-1 disabled:opacity-60"
          >
            {{ productsStore.loading ? 'Saving...' : 'Save' }}
          </button>
          <button type="button" @click="cancelEdit" class="admin-btn-secondary flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>

    <div class="admin-card overflow-hidden">
      <div v-if="productsStore.products.length === 0" class="text-center py-12 text-slate-500">
        No products yet
      </div>
      <table v-else class="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in productsStore.products" :key="product.id">
            <td class="font-medium text-slate-900">{{ product.name }}</td>
            <td>{{ getCategoryName(product.category_id) }}</td>
            <td>${{ product.price.toFixed(2) }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <div class="flex gap-2">
                <button
                  @click="editProduct(product)"
                  class="admin-btn-accent"
                >
                  Edit
                </button>
                <button
                  @click="deleteProduct(product.id)"
                  class="admin-btn-danger"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useCategoriesStore } from '@/stores/categories'

const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()

const showAddForm = ref(false)
const editingId = ref<string | null>(null)
const form = reactive({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category_id: '',
  image_url: '',
})

const getCategoryName = (categoryId: string) => {
  return categoriesStore.categories.find(c => c.id === categoryId)?.name || '—'
}

const handleSave = async () => {
  if (editingId.value) {
    await productsStore.updateProduct(editingId.value, form)
  } else {
    await productsStore.addProduct(form)
  }
  cancelEdit()
}

const editProduct = (product: typeof productsStore.products[0]) => {
  editingId.value = product.id
  Object.assign(form, product)
  showAddForm.value = true
}

const deleteProduct = async (id: string) => {
  if (confirm('Delete this product?')) {
    await productsStore.deleteProduct(id)
  }
}

const cancelEdit = () => {
  showAddForm.value = false
  editingId.value = null
  Object.assign(form, {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category_id: '',
    image_url: '',
  })
}

onMounted(async () => {
  await Promise.all([
    productsStore.fetchProducts(),
    categoriesStore.fetchCategories(),
  ])
})
</script>
