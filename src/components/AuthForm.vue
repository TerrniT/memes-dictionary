<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const isLogin = ref(true)
const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  if (isLogin.value) {
    await authStore.login(email.value, password.value)
  } else {
    await authStore.register(email.value, password.value)
  }
}
</script>

<template>
  <div class="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-center mb-6">
      {{ isLogin ? 'Вход' : 'Регистрация' }}
    </h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="flex flex-col">
        <label class="block text-sm font-medium mb-1">Почта</label>
        <input
          v-model="email"
          type="email"
          required
          class="flex-1 p-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
        />
      </div>
      
      <div class="flex flex-col">
        <label class="block text-sm font-medium mb-1">Пароль</label>
        <input
          v-model="password"
          type="password"
          required
          class="flex-1 p-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
        />
      </div>

      <div v-if="authStore.error" class="text-red-500 text-sm">
        {{ authStore.error }}
      </div>
      
      <button
        type="submit"
        :disabled="authStore.loading"
        class="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {{ authStore.loading ? 'Loading...' : (isLogin ? 'Login' : 'Register') }}
      </button>
    </form>
    
    <!-- <p class="mt-4 text-center text-sm"> -->
      <!-- {{ isLogin ? "Don't have an account?" : "Already have an account?" }} -->
      <!-- <button
        @click="isLogin = !isLogin"
        class="text-blue-500 hover:underline ml-1"
      >
        {{ isLogin ? 'Register' : 'Login' }}
      </button> -->
    <!-- </p> -->
  </div>
</template>