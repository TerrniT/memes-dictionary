<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button @click="toggleDark()"
    class="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-zinc-700">
    <div class="transition duration-300 group-hover:rotate-[360deg] select-none">
      <span v-if="isDark">🌞</span>
      <span v-else>🌙</span>
    </div>
  </button>
</template>