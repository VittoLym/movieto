<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="border-b border-surface-variant pb-6">
      <h1 class="font-display-lg-mobile text-3xl md:text-4xl text-on-surface">Géneros Favoritos</h1>
      <p class="font-body-lg text-on-surface-variant text-[16px] mt-2">Selecciona tus géneros preferidos para mejorar las recomendaciones.</p>
    </div>

    <!-- Content -->
    <div class="flex flex-wrap gap-3">
      <button 
        v-for="genre in genres" 
        :key="genre.name"
        class="glass-panel px-4 py-2 rounded-full font-label-md transition-all hover:scale-105 active:scale-95"
        :class="genre.active ? 'text-primary border-primary bg-primary/5' : 'text-on-surface-variant hover:text-primary hover:border-primary'"
        @click="toggleGenre(genre)"
      >
        {{ genre.name }}
      </button>
      <button class="w-10 h-10 flex items-center justify-center rounded-full glass-panel text-on-surface-variant hover:text-primary hover:scale-110 active:scale-90 transition-all">
        <span class="material-symbols-outlined">add</span>
      </button>
    </div>

    <div class="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/20">
      <p class="text-sm text-on-surface-variant">
        <span class="font-bold text-primary">Tip:</span> Selecciona al menos 3 géneros para obtener mejores recomendaciones personalizadas.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const genres = ref([
  { name: 'Sci-Fi', active: true },
  { name: 'Drama', active: false },
  { name: 'Thriller', active: true },
  { name: 'Acción', active: false },
  { name: 'Terror', active: true },
  { name: 'Comedia', active: false }
])

const toggleGenre = (genre) => {
  genre.active = !genre.active
}
</script>

<style scoped>
.glass-panel {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>