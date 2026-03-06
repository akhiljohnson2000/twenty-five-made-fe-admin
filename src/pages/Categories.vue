<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h1 class="text-2xl font-bold text-slate-900">Categories</h1>
      <button
        @click="showAddForm = true"
        class="admin-btn-primary shrink-0"
      >
        Add Category
      </button>
    </div>

    <div v-if="showAddForm" class="admin-card p-6 mb-6">
      <h2 class="text-lg font-semibold text-slate-900 mb-4">{{ editingId ? 'Edit Category' : 'Add New Category' }}</h2>
      <form @submit.prevent="handleSave" class="space-y-4 max-w-xl">
        <input
          v-model="form.name"
          type="text"
          placeholder="Category Name"
          required
          class="admin-input"
        />
        <textarea
          v-model="form.description"
          placeholder="Description"
          rows="2"
          class="admin-input"
        />
        <div class="flex gap-3">
          <button
            type="submit"
            :disabled="categoriesStore.loading"
            class="admin-btn-primary flex-1 disabled:opacity-60"
          >
            {{ categoriesStore.loading ? 'Saving...' : 'Save' }}
          </button>
          <button type="button" @click="cancelEdit" class="admin-btn-secondary flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>

    <div class="admin-card overflow-hidden">
      <div v-if="categoriesStore.categories.length === 0" class="text-center py-12 text-slate-500">
        No categories yet
      </div>
      <table v-else class="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categoriesStore.categories" :key="category.id">
            <td class="font-medium text-slate-900">{{ category.name }}</td>
            <td class="text-slate-500">{{ category.description || '—' }}</td>
            <td>
              <div class="flex gap-2">
                <button
                  @click="editCategory(category)"
                  class="admin-btn-accent"
                >
                  Edit
                </button>
                <button
                  @click="deleteCategory(category.id)"
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
  if (confirm('Delete this category?')) {
    await categoriesStore.deleteCategory(id)
  }
}

const cancelEdit = () => {
  showAddForm.value = false
  editingId.value = null
  Object.assign(form, { name: '', description: '' })
}

onMounted(() => {
  categoriesStore.fetchCategories()
})
</script>
