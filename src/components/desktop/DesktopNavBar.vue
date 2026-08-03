<template>
  <header 
    ref="headerRef"
    class="hidden md:flex fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 justify-between items-center px-16 h-16 transition-all duration-300"
  >
    <div class="flex items-center gap-12">
      <h1 class="font-display-lg text-[32px] text-primary tracking-tighter cursor-pointer active:scale-95 transition-transform">
        MoVi(e)tto
      </h1>
      <nav class="hidden md:flex gap-8">
        <a 
          v-for="item in navItems"
          class="nav-link font-medium transition-opacity"
          :class="item.active ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'"
          :href="item.url"
          @click="navigateTo(item.url,item.name)"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>
    <div class="flex items-center gap-6">
      <button class="flex items-center justify-center p-2 rounded-full hover:bg-surface-container transition-all active:scale-90">
        <span class="material-symbols-outlined text-primary">search</span>
      </button>
      <div class="w-10 h-10 rounded-full overflow-hidden border border-surface-variant cursor-pointer active:scale-90 transition-transform">
        <img 
          class="w-full h-full object-cover" 
          alt="Profile" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2IqJSZgccoZ4c91usI_-GJvJ5UCqAEc7r3CY9V9ZjihjOFBnrFKCBXHw07-dDR_Ts9QIoWA0xN-AaMbflePRbO19m3kvdUyeDQcIzKkq8UE5N6ZhPIzjv01YJQV1FJ1p3W7flD97YddxxXMP1aXJ-VU7fJOYKmmK2--Y8cqAa4FvkjTDCW6zU1I85FhxmugKE5xa4MJbuRD-Ansx2qHz6dhJySRiPjsBIAmX_KxU0g7qit1xwrLaP"
        />
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