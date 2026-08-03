<template>
  <nav class="fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-2xl flex justify-around items-center h-20 pb-safe px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-outline/5 md:hidden">
    <a 
      v-for="item in navItems" 
      :key="item.name"
      class="flex flex-col items-center justify-center transition-all duration-300 active:scale-95"
      :class="[
        item.active ? 'text-primary font-bold bg-primary/10 rounded-xl px-4 py-1 scale-110' : 'text-outline hover:text-primary'
      ]"
      href="#"
      @click.prevent="setActive(item.name)"
    >
      <span class="material-symbols-outlined" :style="item.active ? { fontVariationSettings: `'FILL' 1` } : {}">
        {{ item.icon }}
      </span>
      <span class="font-label-md text-label-md mt-1">{{ item.label }}</span>
    </a>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const navItems = ref([
  { name: 'home', icon: 'home', label: 'Home', active: true },
  { name: 'discover', icon: 'auto_awesome', label: 'Discover', active: false },
  { name: 'library', icon: 'layers', label: 'Library', active: false },
  { name: 'settings', icon: 'settings', label: 'Settings', active: false }
])

const setActive = (name) => {
  navItems.value.forEach(item => {
    item.active = item.name === name
  })
}
</script>