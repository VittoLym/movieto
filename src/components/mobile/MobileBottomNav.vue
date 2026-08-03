<template>
  <nav class="fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-2xl border-t border-on-surface/5 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] flex justify-around items-center h-20 px-4 md:hidden">
    <a 
      v-for="item in navItems" 
      :key="item.name"
      class="flex flex-col items-center justify-center transition-all active:scale-90 duration-300 group cursor-pointer"
      :class="item.active ? 'text-primary font-bold bg-primary/5 rounded-xl px-4 py-1 shadow-sm' : 'text-on-surface-variant hover:text-primary'"
      @click="navigateTo(item.url, item.name)"
    >
      <span 
        class="material-symbols-outlined" 
        :class="!item.active ? 'transition-transform group-hover:-translate-y-1' : ''" 
        :style="item.active ? { fontVariationSettings: `'FILL' 1` } : {}"
      >
        {{ item.icon }}
      </span>
      <span class="font-label-md text-[10px] uppercase font-bold mt-1">{{ item.label }}</span>
    </a>
  </nav>
</template>

<script setup>
import { useNavigation } from '../../composable/useNavigation'

const { navItems, navigateTo } = useNavigation()
</script>