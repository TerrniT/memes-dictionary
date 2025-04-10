<script setup lang="ts">
import { useMemeStore } from '../stores/meme'

const memeStore = useMemeStore()
</script>

<template>
  <div class="w-full max-w-4xl mx-auto p-4">
    <div v-for="[group, memes] in memeStore.groupedMemes" :key="group" class="mb-2">
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