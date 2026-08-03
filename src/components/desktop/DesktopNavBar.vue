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
          :key="item.name"
          class="nav-link font-medium transition-opacity"
          :class="item.active ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'"
          href="#"
          @click.prevent="setActive(item.name)"
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
import { ref, onMounted, onUnmounted } from 'vue'

const headerRef = ref(null)
const navItems = ref([
  { name: 'home', label: 'Home', active: true },
  { name: 'discover', label: 'Discover', active: false },
  { name: 'library', label: 'Library', active: false },
  { name: 'settings', label: 'Settings', active: false }
])

const setActive = (name) => {
  navItems.value.forEach(item => {
    item.active = item.name === name
  })
}

// Header scroll behavior
let lastScroll = 0

const handleScroll = () => {
  const header = headerRef.value
  if (!header) return
  
  const currentScroll = window.pageYOffset
  
  if (currentScroll <= 0) {
    header.style.transform = 'translateY(0)'
    header.classList.remove('shadow-md', 'bg-surface/95')
    return
  }
  
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.style.transform = 'translateY(-100%)'
  } else {
    header.style.transform = 'translateY(0)'
    header.classList.add('shadow-md', 'bg-surface/95')
  }
  lastScroll = currentScroll
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>