<script setup lang="ts">
import { onMounted } from 'vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'

import MemeHeading from './components/MemeHeading.vue'
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
    <MemeHeading/>
    <MemeForm />
    <MemeList />
  </div>
</template>