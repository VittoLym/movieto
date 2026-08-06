<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="border-b border-surface-variant pb-6">
      <h1 class="font-display-lg-mobile text-3xl md:text-4xl text-on-surface">Privacidad y Seguridad</h1>
      <p class="font-body-lg text-on-surface-variant text-[16px] mt-2">Controla quién ve tu perfil y cómo compartes tu actividad.</p>
    </div>

    <!-- Content -->
    <div class="space-y-4 max-w-md">
      <div class="glass-panel p-4 rounded-2xl flex items-center justify-between">
        <div>
          <p class="font-bold text-on-surface">Visibilidad de Perfil</p>
          <p class="text-sm text-on-surface-variant">Quién puede ver tu perfil y actividad</p>
        </div>
        <select class="px-3 py-2 rounded-lg border border-outline-variant bg-white text-on-surface">
          <option>Público</option>
          <option selected>Amigos</option>
          <option>Privado</option>
        </select>
      </div>

      <div class="glass-panel p-4 rounded-2xl flex items-center justify-between">
        <div>
          <p class="font-bold text-on-surface">Compartir Actividad</p>
          <p class="text-sm text-on-surface-variant">Mostrar lo que estás viendo a tus amigos</p>
        </div>
        <div 
          class="w-12 h-6 rounded-full relative flex items-center px-1 transition-all duration-300 cursor-pointer shadow-sm active:scale-90"
          :class="shareActivity ? 'bg-primary' : 'bg-surface-container-highest'"
          @click="shareActivity = !shareActivity"
        >
          <div 
            class="w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm"
            :class="shareActivity ? 'translate-x-6' : 'translate-x-0'"
          ></div>
        </div>
      </div>

      <div class="glass-panel p-4 rounded-2xl flex items-center justify-between">
        <div>
          <p class="font-bold text-on-surface">Mostrar en Recomendaciones</p>
          <p class="text-sm text-on-surface-variant">Usar tu actividad para recomendar a amigos</p>
        </div>
        <div 
          class="w-12 h-6 rounded-full relative flex items-center px-1 transition-all duration-300 cursor-pointer shadow-sm active:scale-90"
          :class="showInRecommendations ? 'bg-primary' : 'bg-surface-container-highest'"
          @click="showInRecommendations = !showInRecommendations"
        >
          <div 
            class="w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm"
            :class="showInRecommendations ? 'translate-x-6' : 'translate-x-0'"
          ></div>
        </div>
      </div>

      <div class="p-4 bg-error-container/20 border-l-4 border-error rounded-r-lg flex items-start gap-3">
        <span class="material-symbols-outlined text-error text-[20px] mt-0.5">security</span>
        <div>
          <h6 class="font-semibold text-[14px] text-on-surface">Datos personales</h6>
          <p class="text-[13px] text-on-surface-variant mt-1 leading-relaxed">
            Tus datos están protegidos. No compartimos tu información con terceros sin tu consentimiento.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const shareActivity = ref(true)
const showInRecommendations = ref(false)
</script>

<style scoped>
.glass-panel {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>