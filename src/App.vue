<script setup lang="ts">
import { onMounted } from 'vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import LogoutButton from './components/LogoutButton.vue'

import MemeHeading from './components/MemeHeading.vue'
import MemeForm from './components/MemeForm.vue'
import MemeList from './components/MemeList.vue'

import AuthForm from './components/AuthForm.vue'

import { useMemeStore } from './stores/meme'
import { useAuthStore } from './stores/auth'

const memeStore = useMemeStore()
const authStore = useAuthStore()


onMounted(async () => {
  await authStore.initialize()
  await memeStore.fetchMemes()
})
</script>

<template>
  <div class="min-h-screen p-4">
    <div class="fixed top-4 right-4 z-50 flex gap-x-2">
      <LogoutButton />
      <ThemeSwitcher />
    </div>

    <template v-if="authStore.loading">
      <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg
          class="animate-spin h-5 w-5 text-blue-500 dark:text-blue-400"
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
        </svg>
      </div>
    </template>
    <template v-else-if="authStore.isAuthenticated">
      <MemeHeading/>
      <MemeForm />
      <MemeList />
    </template>
    <template v-else>
      <AuthForm />
    </template>
  </div>
</template>