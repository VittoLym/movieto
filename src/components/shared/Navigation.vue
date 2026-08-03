<template>
  <!-- Desktop Navigation -->
  <nav class="hidden md:flex gap-8">
    <a 
      v-for="item in navItems" 
      :key="item.name"
      class="nav-link transition-opacity cursor-pointer"
      :class="item.active ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'"
      @click="navigateTo(item.url, item.name)"
    >
      {{ item.label }}
    </a>
  </nav>

  <!-- Mobile Bottom Navigation -->
  <nav class="fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-2xl border-t border-on-surface/5 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] flex justify-around items-center h-20 px-4 md:hidden">
    <a 
      v-for="item in mobileNavItems" 
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

const { navItems, mobileNavItems, navigateTo } = useNavigation()
</script>

<style scoped>
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: #b8000b;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.text-primary::after {
  width: 100%;
}
</style>