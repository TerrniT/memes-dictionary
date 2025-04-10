<script setup lang="ts">
import { onMounted } from 'vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import MemeForm from './components/MemeForm.vue'
import MemeList from './components/MemeList.vue'
import { useMemeStore } from './stores/meme'

const memeStore = useMemeStore()

onMounted(async () => {
  await memeStore.fetchMemes()
})
</script>

<template>
  <div class="min-h-screen p-4">
    <div class="fixed top-4 right-4 z-50">
      <ThemeSwitcher />
    </div>
    <h1 class="text-4xl font-bold text-center mb-8">Meme Storage</h1>
    <MemeForm />
    <MemeList />
  </div>
</template>