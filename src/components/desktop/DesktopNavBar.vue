<template>
     <header class="bg-surface/80 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-white/10 px-4 md:px-16 h-16 flex justify-between items-center transition-all duration-300">
      <div class="flex items-center gap-2 md:gap-12">
        <span class="material-symbols-outlined text-primary md:hidden" style="font-variation-settings: 'FILL' 1;">movie_filter</span>
        <h1 class="font-display-lg text-[22px] md:text-[32px] text-primary tracking-tighter cursor-pointer" @click="$router.push('/')">
          MoVi(e)tto
        </h1>
        <nav class="hidden md:flex gap-8">
          <router-link
          v-for="item in navItems" 
          :key="item.name"
          class="nav-link font-medium transition-opacity"
          :class="item.active ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'"
          :to="item.url"
          @click="navigateTo(item.url,item.name)"
        >
          {{ item.label }}
          </router-link>
        </nav>
      </div>
      <div class="flex items-center gap-3 md:gap-6">
        <button class="material-symbols-outlined text-primary active:scale-95 transition-transform">search</button>
        <div class="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary transition-colors cursor-pointer">
          <img class="w-full h-full object-cover" alt="Profile" src="../../../public/img/avatar.jpg" />
        </div>
      </div>
    </header>
</template>

<script setup>
import { useNavigation } from '../../composable/useNavigation'

const { navItems, navigateTo } = useNavigation()
</script>

<style scoped>
.nav-link {
  position: relative;
  padding-bottom: 4px;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
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