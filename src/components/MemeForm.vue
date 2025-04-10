<script setup lang="ts">
import { ref } from 'vue'
import { useMemeStore } from '../stores/meme'

const memeStore = useMemeStore()
const newMeme = ref('')

const addMeme = () => {
  if (newMeme.value.trim()) {
    memeStore.addMeme(newMeme.value.trim())
    newMeme.value = ''
  }
}
</script>

<template>
  <div class="w-full max-w-md mx-auto p-4">
    <form @submit.prevent="addMeme" class="flex gap-2">
      <input
        v-model="newMeme"
        type="text"
        placeholder="Enter your meme..."
        class="flex-1 p-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0 }"
      />
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Add
      </button>
    </form>
  </div>
</template>