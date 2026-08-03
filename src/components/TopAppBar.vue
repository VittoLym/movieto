<template>
  <header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline/10 flex justify-between items-center px-margin-mobile h-16">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full overflow-hidden border border-outline/20 active:scale-90 transition-transform cursor-pointer">
        <img class="w-full h-full object-cover" alt="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG_uT96CeISjW-GGGDv4vdaFhRHqUiA4xCaqlplzwLYAq0YiIAx8ri6himLGl9b0RzQetKXvNVRWeDY7zQZ_vTU5CfBITNcV3mAeWm83odeAl2tmLz-0AhFJlETtaumQEzf5HL1uQ6bKjLysAoK7rxNn-pXx1sKvtNpSdBcaPFHYbOvLgm2WICRxDZ84V-h6WICjkYtiHIT3VliW9pXpVPZOKrBYP4-Oncwlnwp7EgLHZYkZEXWEIS" />
      </div>
      <h1 class="font-display text-headline-md text-primary tracking-tighter">MoVi(e)tto</h1>
    </div>
    <button class="text-on-surface-variant hover:opacity-80 transition-all active:scale-90">
      <span class="material-symbols-outlined text-3xl">search</span>
    </button>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  const handleScroll = () => {
    const header = document.querySelector('header')
    if (window.scrollY > 20) {
      header?.classList.add('bg-surface/95', 'shadow-md')
      header?.classList.remove('bg-surface/80')
    } else {
      header?.classList.add('bg-surface/80')
      header?.classList.remove('bg-surface/95', 'shadow-md')
    }
  }

  window.addEventListener('scroll', handleScroll)
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>