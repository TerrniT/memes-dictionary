<script setup lang="ts">
import { useMemeStore } from '../stores/meme'

const memeStore = useMemeStore()
</script>

<template>
  <div class="w-full max-w-4xl mx-auto p-4">
    <div v-if="memeStore.loading" class="flex justify-center">
      <svg
        class="animate-spin h-5 w-5 text-gray-900 dark:text-gray-100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C4 0 3.73.04 3.5.11L2.89.91c-.63-.13-1.48-.22-2.56-.22s-1.93.09-2.56.22L.5.11c-.27-.08-.5-.11-.5-.11-.04-.07-.11-.11-.11-.11C.04 0 .04 3.02 4 3.02a8 8 0 0112.01 0c3.98 0 7.03-.09 10.01-.22.88-.13 1.87-.22 2.89-.22s1.93.09 2.89.22L22.5.11c.27.08.5.11.5.11.04.07.11.11.11.11h.01c.04-.07.11-.11.11-.11.28-.09 1.02-.22 1.87-.22s1.48.09 2.56.22L20.89.91c.63.13 1.48.22 2.56.22s1.93-.09 2.56-.22L23.5.11c.27-.08.5-.11.5-.11.04-.07.11-.11.11-.11h.01a8 8 0 01-12.01 0z"
        ></path>
      </svg>
    </div>
    <div v-else v-for="[group, memes] in memeStore.groupedMemes" :key="group" class="mb-2">
      <h2 class="text-2xl font-bold mb-1">{{ group }}</h2>
      <div class="space-y-4">
        <div
          v-for="meme in memes"
          :key="meme.id"
          class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :enter="{ opacity: 1, x: 0 }"
        >
          <p class="text-lg">{{ meme.content }}</p>
          <p v-if="meme.add_date" class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Добавлено: {{ new Date(meme.add_date).toLocaleDateString() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>