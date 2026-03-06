<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold text-primary">Products</h1>
      <button
        @click="showAddForm = true"
        class="bg-secondary hover:bg-green-700 text-white px-6 py-2 rounded-lg transition font-semibold"
      >
        ➕ Add Product
      </button>
    </div>

    <!-- Add/Edit Form -->
    <div v-if="showAddForm" class="bg-white rounded-lg shadow p-6 mb-8">
      <h2 class="text-2xl font-bold text-primary mb-4">{{ editingId ? 'Edit Product' : 'Add New Product' }}</h2>
      <form @submit.prevent="handleSave" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="form.name"
          type="text"
          placeholder="Product Name"
          required
          class="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
        />

        <select
          v-model="form.category_id"
          required
          class="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
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
          class="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
        />

        <input
          v-model.number="form.stock"
          type="number"
          placeholder="Stock"
          required
          class="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
        />

        <textarea
          v-model="form.description"
          placeholder="Description"
          class="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
        ></textarea>

        <div class="col-span-2 flex gap-4">
          <button
            type="submit"
            :disabled="productsStore.loading"
            class="flex-1 bg-secondary hover:bg-green-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
          >
            {{ productsStore.loading ? 'Saving...' : 'Save' }}
          </button>
          <button
            type="button"
            @click="cancelEdit"
            class="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div v-if="productsStore.products.length === 0" class="text-center py-8 text-gray-500">
        No products yet
      </div>
      <table v-else class="w-full">
        <thead class="bg-neutral">
          <tr>
            <th class="text-left py-3 px-4 font-semibold">Name</th>
            <th class="text-left py-3 px-4 font-semibold">Category</th>
            <th class="text-left py-3 px-4 font-semibold">Price</th>
            <th class="text-left py-3 px-4 font-semibold">Stock</th>
            <th class="text-left py-3 px-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in productsStore.products" :key="product.id" class="border-b hover:bg-neutral">
            <td class="py-3 px-4">{{ product.name }}</td>
            <td class="py-3 px-4">{{ getCategoryName(product.category_id) }}</td>
            <td class="py-3 px-4">${{ product.price.toFixed(2) }}</td>
            <td class="py-3 px-4">{{ product.stock }}</td>
            <td class="py-3 px-4 space-x-2">
              <button
                @click="editProduct(product)"
                class="bg-accent hover:bg-orange-600 text-white px-3 py-1 rounded text-sm transition"
              >
                ✏️ Edit
              </button>
              <button
                @click="deleteProduct(product.id)"
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
              >
                🗑️ Delete
              </button>
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
  return categoriesStore.categories.find(c => c.id === categoryId)?.name || 'Unknown'
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
  if (confirm('Are you sure?')) {
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
