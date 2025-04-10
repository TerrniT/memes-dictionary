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
      <input v-model="newMeme" type="text" placeholder="Введи наш с тобою мем"
        class="flex-1 py-2 px-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800" v-motion
        :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" />
      <button
        :disabled="memeStore.loading"
        type="submit"
        class="inline-flex h-12 items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600 px-6 font-medium text-neutral-50 shadow-lg shadow-transparent hover:shadow-blue-500/20 transition active:scale-95">
        <svg v-if="memeStore.loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <span v-else>Добавить</span>
      </button>
    </form>
  </div>
</template>