<template>
  <div class="bg-background text-on-background font-body-md overflow-x-hidden selection:bg-primary selection:text-on-primary min-h-screen">
    <!-- Hero Background Layer -->
    <div class="fixed inset-0 z-0">
      <div class="absolute inset-0 bg-cover bg-center animate-hero" :style="{ backgroundImage: `url('${recommendationData.backgroundImage}')` }">
      </div>
      <div class="absolute inset-0 hero-gradient"></div>
    </div>
    <!-- Main Content -->
    <main class="relative z-10 min-h-screen pt-24 pb-32 px-margin-mobile flex flex-col justify-end max-w-4xl mx-auto">
      <div class="space-y-6">
        <!-- Movie Identity -->
        <div class="space-y-3">
          <div class="flex items-center gap-3 animate-reveal" style="animation-delay: 100ms;">
            <span class="px-3 py-1 glass-panel rounded-full font-bold text-primary text-[11px] uppercase tracking-widest border border-primary/10 transition-transform hover:scale-105 hover:bg-white cursor-default">
              {{ recommendationData.badge }}
            </span>
            <div class="flex items-center text-primary">
              <span v-for="n in 4" :key="n" class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
              <span class="material-symbols-outlined text-[18px]">star_half</span>
              <span class="ml-2 font-bold text-on-surface">{{ recommendationData.rating }}</span>
            </div>
          </div>
          
          <h2 class="font-display-lg text-on-surface leading-tight drop-shadow-sm text-on-background animate-reveal" style="animation-delay: 200ms;">
            {{ recommendationData.title }}
          </h2>
          
          <div class="flex items-center gap-4 font-medium text-sm text-on-surface animate-reveal flex-wrap" style="animation-delay: 300ms;">
            <span class="hover:text-primary transition-colors cursor-default">{{ recommendationData.year }}</span>
            <span class="w-1 h-1 bg-outline rounded-full"></span>
            <span class="hover:text-primary transition-colors cursor-default">{{ recommendationData.genre }}</span>
            <span class="w-1 h-1 bg-outline rounded-full"></span>
            <span class="hover:text-primary transition-colors cursor-default">{{ recommendationData.duration }}</span>
            <span class="border border-outline px-1 rounded text-[10px] font-bold">4K</span>
          </div>
        </div>

        <!-- Synopsis -->
        <div class="max-w-2xl animate-reveal" style="animation-delay: 400ms;">
          <p class="font-body-lg leading-relaxed text-on-background/80">
            {{ recommendationData.synopsis }}
          </p>
        </div>

        <!-- Action Buttons Grid -->
        <div class="flex flex-col sm:flex-row gap-4 pt-4 animate-reveal" style="animation-delay: 500ms;">
          <button class="group flex items-center justify-center gap-2 bg-primary text-on-primary font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 flex-1 md:flex-none animate-pulse-soft" @click="handleWatchTrailer">
            <span class="material-symbols-outlined transition-transform group-hover:scale-125" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
            Ver Trailer
          </button>
          <button class="flex items-center justify-center gap-2 bg-surface-container-highest text-on-surface font-semibold py-4 px-8 rounded-xl hover:bg-surface-dim hover:shadow-md transition-all active:scale-95 flex-1 md:flex-none" @click="handleAddToList">
            <span class="material-symbols-outlined">add</span>
            Añadir a mi lista
          </button>
          <button class="flex items-center justify-center gap-2 bg-white text-primary border border-outline-variant font-semibold py-4 px-8 rounded-xl hover:bg-surface-container-low hover:shadow-sm transition-all active:scale-95 flex-1 md:flex-none group" @click="handleTryAgain">
            <span class="material-symbols-outlined group-hover:rotate-180 transition-transform duration-700">casino</span>
            Probar otra vez
          </button>
        </div>
      </div>

      <!-- Secondary Info Cards (Bento Style) -->
      <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          v-for="(info, index) in recommendationData.infoCards" 
          :key="index"
          class="glass-panel p-4 rounded-xl flex flex-col gap-2 animate-reveal hover:scale-[1.03] transition-all cursor-pointer hover:shadow-xl hover:bg-white"
          :class="info.highlight ? 'bg-primary-fixed/30 border-primary/10 hover:bg-primary/5' : ''"
          :style="{ animationDelay: `${600 + (index * 100)}ms` }"
          @click="handleInfoClick(info)"
        >
          <span class="text-[11px] font-bold uppercase tracking-widest" :class="info.highlight ? 'text-primary' : 'text-on-surface'">
            {{ info.label }}
          </span>
          <span class="font-semibold" :class="info.highlight ? 'text-primary font-extrabold' : 'text-on-surface'">
            {{ info.value }}
          </span>
        </div>
      </div>
    </main>

    <!-- Bottom Navigation Bar -->
    <nav class="fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-2xl border-t border-on-surface/5 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] flex justify-around items-center h-20 pb-safe px-4 animate-footer">
      <router-link 
        v-for="item in navItems" 
        :key="item.name"
        class="flex flex-col items-center justify-center transition-all active:scale-90 duration-300 group"
        :class="item.active ? 'text-primary font-bold bg-primary/5 rounded-xl px-4 py-1 shadow-sm' : 'text-on-surface-variant hover:text-primary'"
        :to="item.path"
        @click="setActive(item.name)"
      >
        <span class="material-symbols-outlined" :class="!item.active ? 'transition-transform group-hover:-translate-y-1' : ''" :style="item.active ? { fontVariationSettings: `'FILL' 1` } : {}">
          {{ item.icon }}
        </span>
        <span class="font-label-md text-[10px] uppercase font-bold mt-1">{{ item.label }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Datos de la recomendación
const recommendationData = ref({
  badge: 'RECOMENDACIÓN DEL DÍA',
  title: 'The Midnight Protocol',
  year: '2024',
  genre: 'Acción / Sci-Fi',
  duration: '2h 15m',
  rating: '4.8',
  synopsis: 'En un futuro donde la realidad y lo virtual se han fusionado, un ex-analista de seguridad debe infiltrarse en el núcleo de la inteligencia artificial más avanzada del mundo para detener un colapso global inminente antes de que el tiempo se agote.',
  backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ0sQwcTva_t4gUGSwfEkFj9rHMmQBojEVACvQYOLzJguL5rQARavb4DUAikZPK85hbVsMnx6i0zUP_gReNbSFScd8GwMtXOMbeNY0V_I1PRX4KCnorfrxXgyhd6n8PyMztIMVzIA6Mr-WhdoP1nyYRIlJaFJfbVQwN9ibDFhip2irMX8w5jmMh2PonTNbSXQ67V54GVgdQV3PWWzTEgnz6zVccnrHBW0E6nja37iYIw7mpu4ckDrb',
  infoCards: [
    { label: 'Director', value: 'Denis Villeneuve', highlight: false },
    { label: 'Reparto', value: 'Cillian Murphy, Ana de Armas...', highlight: false },
    { label: 'Similar a', value: 'Inception, Blade Runner', highlight: false },
    { label: 'Match', value: '98% para ti', highlight: true }
  ]
})

// Navegación inferior
const navItems = ref([
  { name: 'home', icon: 'home', label: 'Home', path: '/', active: false },
  { name: 'discover', icon: 'auto_awesome', label: 'Discover', path: '/recommendation', active: true },
  { name: 'library', icon: 'layers', label: 'Library', path: '/library', active: false },
  { name: 'settings', icon: 'settings', label: 'Settings', path: '/settings', active: false }
])

const setActive = (name) => {
  navItems.value.forEach(item => {
    item.active = item.name === name
  })
}

// Event handlers
const handleSearch = () => {
  console.log('Search clicked')
}

const handleWatchTrailer = () => {
  console.log('Watch trailer clicked')
}

const handleAddToList = () => {
  console.log('Added to list')
}

const handleTryAgain = () => {
  console.log('Try again clicked')
  // Recargar la página o obtener nueva recomendación
  window.location.reload()
}

const handleInfoClick = (info) => {
  console.log('Info card clicked:', info)
}
</script>

<style scoped>
.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
}

.hero-gradient {
  background: linear-gradient(to top, #f9f9fb 0%, rgba(249, 249, 251, 0.8) 40%, transparent 70%, rgba(249, 249, 251, 0.2) 100%);
}

/* Animations */
@keyframes revealUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes zoomFade {
  from { opacity: 0; transform: scale(1.1); }
  to { opacity: 1; transform: scale(1.05); }
}

@keyframes pulseSoft {
  0%, 100% { box-shadow: 0 10px 25px -5px rgba(184, 0, 11, 0.4); transform: scale(1); }
  50% { box-shadow: 0 15px 35px -5px rgba(184, 0, 11, 0.6); transform: scale(1.02); }
}

@keyframes slideDown {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}

@keyframes slideUpNav {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.animate-hero {
  animation: zoomFade 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-reveal {
  opacity: 0;
  animation: revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-pulse-soft {
  animation: pulseSoft 3s ease-in-out infinite;
}

.animate-header {
  animation: slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-footer {
  animation: slideUpNav 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>