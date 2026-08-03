<template>
  <header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-16 h-16 flex justify-between items-center transition-all duration-300">
    <div class="flex items-center gap-2 md:gap-12">
      <!-- Logo Mobile -->
      <span class="material-symbols-outlined text-primary md:hidden" style="font-variation-settings: 'FILL' 1;">movie_filter</span>
      
      <!-- Logo Desktop -->
      <h1 class="font-display-lg text-[22px] md:text-[32px] text-primary tracking-tighter cursor-pointer" @click="goHome">
        MoVi(e)tto
      </h1>
      <!-- Navigation Desktop -->
      <Navigation />
    </div>
    
    <div class="flex items-center gap-3 md:gap-6">
      <button class="material-symbols-outlined text-primary active:scale-95 transition-transform">
        search
      </button>
      <div class="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary transition-colors cursor-pointer">
        <img class="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3gyNDQ5ULfidAjrj6G7LQHORBU_xSefb260EEt1wAXTdOF4ZNuWCW7eR7SIRBgQ3aG88tR8mOaRhX9oaffTJ_IEPa-GJ72o7xqu4R0nbe9Shckv4rIB5LBwjmzTbVmkrTfZT7ruMA-5VyObEYU67kb4uFhRLnVmjImXZtRutEQ9qTR_FnuSBEH1gKLyPx8XH9nhQP7EKpfqjpb_Yw91KpzsQ7KYuYNozjV7XwP_WOn_-S_jWAD8-0" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Navigation from './Navigation.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>