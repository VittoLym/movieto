<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="border-b border-surface-variant pb-6">
      <h1 class="font-display-lg-mobile text-3xl md:text-4xl text-on-surface">Notificaciones</h1>
      <p class="font-body-lg text-on-surface-variant text-[16px] mt-2">Gestiona tus alertas y preferencias de notificación.</p>
    </div>

    <!-- Content -->
    <div class="space-y-4 max-w-md">
      <div class="glass-panel p-4 rounded-2xl flex items-center justify-between">
        <div>
          <p class="font-bold text-on-surface">Nuevos Estrenos</p>
          <p class="text-sm text-on-surface-variant">Recibe alertas cuando se estrenen películas de tus géneros favoritos</p>
        </div>
        <div 
          class="w-12 h-6 rounded-full relative flex items-center px-1 transition-all duration-300 cursor-pointer shadow-sm active:scale-90"
          :class="newReleases ? 'bg-primary' : 'bg-surface-container-highest'"
          @click="newReleases = !newReleases"
        >
          <div 
            class="w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm"
            :class="newReleases ? 'translate-x-6' : 'translate-x-0'"
          ></div>
        </div>
      </div>

      <div class="glass-panel p-4 rounded-2xl flex items-center justify-between">
        <div>
          <p class="font-bold text-on-surface">Recomendaciones Personalizadas</p>
          <p class="text-sm text-on-surface-variant">Recibe sugerencias basadas en tu actividad</p>
        </div>
        <div 
          class="w-12 h-6 rounded-full relative flex items-center px-1 transition-all duration-300 cursor-pointer shadow-sm active:scale-90"
          :class="personalizedRecommendations ? 'bg-primary' : 'bg-surface-container-highest'"
          @click="personalizedRecommendations = !personalizedRecommendations"
        >
          <div 
            class="w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm"
            :class="personalizedRecommendations ? 'translate-x-6' : 'translate-x-0'"
          ></div>
        </div>
      </div>

      <div class="glass-panel p-4 rounded-2xl flex items-center justify-between">
        <div>
          <p class="font-bold text-on-surface">Reseñas de Amigos</p>
          <p class="text-sm text-on-surface-variant">Notificaciones cuando tus amigos escriban reseñas</p>
        </div>
        <div 
          class="w-12 h-6 rounded-full relative flex items-center px-1 transition-all duration-300 cursor-pointer shadow-sm active:scale-90"
          :class="friendReviews ? 'bg-primary' : 'bg-surface-container-highest'"
          @click="friendReviews = !friendReviews"
        >
          <div 
            class="w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm"
            :class="friendReviews ? 'translate-x-6' : 'translate-x-0'"
          ></div>
        </div>
      </div>

      <div class="glass-panel p-4 rounded-2xl flex items-center justify-between">
        <div>
          <p class="font-bold text-on-surface">Emails Semanales</p>
          <p class="text-sm text-on-surface-variant">Resumen semanal de novedades y recomendaciones</p>
        </div>
        <div 
          class="w-12 h-6 rounded-full relative flex items-center px-1 transition-all duration-300 cursor-pointer shadow-sm active:scale-90"
          :class="weeklyEmails ? 'bg-primary' : 'bg-surface-container-highest'"
          @click="weeklyEmails = !weeklyEmails"
        >
          <div 
            class="w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm"
            :class="weeklyEmails ? 'translate-x-6' : 'translate-x-0'"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newReleases = ref(true)
const personalizedRecommendations = ref(true)
const friendReviews = ref(false)
const weeklyEmails = ref(true)
</script>

<style scoped>
.glass-panel {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>