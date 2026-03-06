<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold text-primary">Categories</h1>
      <button
        @click="showAddForm = true"
        class="bg-secondary hover:bg-green-700 text-white px-6 py-2 rounded-lg transition font-semibold"
      >
        ➕ Add Category
      </button>
    </div>

    <!-- Add/Edit Form -->
    <div v-if="showAddForm" class="bg-white rounded-lg shadow p-6 mb-8">
      <h2 class="text-2xl font-bold text-primary mb-4">{{ editingId ? 'Edit Category' : 'Add New Category' }}</h2>
      <form @submit.prevent="handleSave" class="grid grid-cols-1 gap-4">
        <input
          v-model="form.name"
          type="text"
          placeholder="Category Name"
          required
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
        />

        <textarea
          v-model="form.description"
          placeholder="Description"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
        ></textarea>

        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="categoriesStore.loading"
            class="flex-1 bg-secondary hover:bg-green-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
          >
            {{ categoriesStore.loading ? 'Saving...' : 'Save' }}
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

    <!-- Categories Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div v-if="categoriesStore.categories.length === 0" class="text-center py-8 text-gray-500">
        No categories yet
      </div>
      <table v-else class="w-full">
        <thead class="bg-neutral">
          <tr>
            <th class="text-left py-3 px-4 font-semibold">Name</th>
            <th class="text-left py-3 px-4 font-semibold">Description</th>
            <th class="text-left py-3 px-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categoriesStore.categories" :key="category.id" class="border-b hover:bg-neutral">
            <td class="py-3 px-4 font-medium">{{ category.name }}</td>
            <td class="py-3 px-4 text-gray-600">{{ category.description || '-' }}</td>
            <td class="py-3 px-4 space-x-2">
              <button
                @click="editCategory(category)"
                class="bg-accent hover:bg-orange-600 text-white px-3 py-1 rounded text-sm transition"
              >
                ✏️ Edit
              </button>
              <button
                @click="deleteCategory(category.id)"
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
import { useCategoriesStore } from '@/stores/categories'

const categoriesStore = useCategoriesStore()

const showAddForm = ref(false)
const editingId = ref<string | null>(null)
const form = reactive({
  name: '',
  description: '',
})

const handleSave = async () => {
  if (editingId.value) {
    await categoriesStore.updateCategory(editingId.value, form)
  } else {
    await categoriesStore.addCategory(form)
  }
  cancelEdit()
}

const editCategory = (category: typeof categoriesStore.categories[0]) => {
  editingId.value = category.id
  Object.assign(form, category)
  showAddForm.value = true
}

const deleteCategory = async (id: string) => {
  if (confirm('Are you sure?')) {
    await categoriesStore.deleteCategory(id)
  }
}

const cancelEdit = () => {
  showAddForm.value = false
  editingId.value = null
  Object.assign(form, {
    name: '',
    description: '',
  })
}

onMounted(async () => {
  await categoriesStore.fetchCategories()
})
</script>
