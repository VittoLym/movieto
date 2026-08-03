<template>
  <div class="bg-background text-on-surface font-body-md min-h-screen overflow-x-hidden">
    <!-- Hero Section -->
    <section class="relative h-[600px] md:h-[870px] w-full mt-16 overflow-hidden flex items-center">
      <!-- Background Immersive Image -->
      <div class="absolute inset-0 z-0 overflow-hidden">
        <div 
          class="w-full h-full bg-cover bg-center md:bg-right"
          :class="isDesktop ? 'ken-burns' : ''"
          :style="{ backgroundImage: `url('${movieData.backgroundImage}')` }"
        ></div>
        <div class="absolute inset-0 hero-gradient"></div>
      </div>
      
      <!-- Content Overlay -->
      <div class="relative z-10 px-4 md:px-16 max-w-4xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary-container text-on-primary font-label-sm text-label-sm rounded-full mb-4 md:mb-6 uppercase tracking-wider animate-pulse-match">
          <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
          {{ movieData.match }} Match para ti
        </div>
        <h1 class="font-display-lg text-3xl md:text-display-lg text-on-surface mb-3 md:mb-4">{{ movieData.title }}</h1>
        <div class="flex flex-wrap items-center gap-2 md:gap-4 text-on-surface-variant font-label-sm text-label-sm mb-4 md:mb-6">
          <span>{{ movieData.year }}</span>
          <span class="w-1 h-1 bg-outline rounded-full"></span>
          <span>{{ movieData.genre }}</span>
          <span class="w-1 h-1 bg-outline rounded-full"></span>
          <span class="border border-outline px-2 py-0.5 rounded">{{ movieData.rating }}</span>
          <span class="w-1 h-1 bg-outline rounded-full"></span>
          <span>{{ movieData.duration }}</span>
        </div>
        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-6 md:mb-10 leading-relaxed">
          {{ movieData.synopsis }}
        </p>
        <div class="flex flex-wrap gap-3 md:gap-4">
          <button class="bg-primary-container text-on-primary px-6 md:px-8 py-3 md:py-4 rounded-xl font-headline-md text-sm md:text-[18px] flex items-center gap-2 hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all duration-300 shadow-lg shadow-primary/20">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
            Ver Trailer
          </button>
          <button class="bg-surface-container-highest text-on-secondary-fixed-variant px-6 md:px-8 py-3 md:py-4 rounded-xl font-headline-md text-sm md:text-[18px] flex items-center gap-2 hover:bg-surface-variant hover:scale-105 hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-300">
            <span class="material-symbols-outlined">add</span>
            Añadir a mi lista
          </button>
          <button class="bg-transparent border-2 border-outline/30 text-on-surface-variant px-6 md:px-8 py-3 md:py-4 rounded-xl font-headline-md text-sm md:text-[18px] flex items-center gap-2 hover:bg-surface-variant/50 hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-300" @click="handleTryAgain">
            <span class="material-symbols-outlined">refresh</span>
            Probar otra vez
          </button>
        </div>
      </div>
    </section>

    <!-- Information Grid Section -->
    <main class="px-4 md:px-16 py-8 md:py-12 bg-surface">
      <div class="grid grid-cols-12 gap-4 md:gap-8">
        <!-- Left Column: Details -->
        <div class="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <!-- Director Card -->
          <div class="reveal col-span-1 bg-surface-container-lowest p-4 md:p-6 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.08)] group cursor-default hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <h3 class="font-label-sm text-label-sm text-outline uppercase mb-3 md:mb-4 tracking-widest">Director</h3>
            <div class="flex items-center gap-3 md:gap-4">
              <div class="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-surface-variant">
                <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" :alt="movieData.director" :src="movieData.directorImage" />
              </div>
              <div>
                <p class="font-headline-md text-base md:text-[20px] text-on-surface">{{ movieData.director }}</p>
                <p class="text-on-surface-variant text-[10px] md:text-label-sm">{{ movieData.directorMovies }}</p>
              </div>
            </div>
          </div>

          <!-- Match Reason Card -->
          <div class="reveal col-span-1 bg-primary/5 p-4 md:p-6 rounded-2xl border border-primary/10 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <h3 class="font-label-sm text-label-sm text-primary uppercase mb-3 md:mb-4 tracking-widest">¿Por qué este Match?</h3>
            <p class="text-on-surface-variant text-sm md:text-base leading-relaxed">
              Basado en tu interés por <span class="font-bold text-on-surface">"{{ movieData.basedOn }}"</span> y {{ movieData.basedOnReason }}. Esta película combina precisión científica con un núcleo emocional profundo.
            </p>
          </div>

          <!-- Reparto Section -->
          <div class="reveal col-span-1 md:col-span-2 mt-2 md:mt-4">
            <h3 class="font-label-sm text-label-sm text-outline uppercase mb-4 md:mb-6 tracking-widest px-2">Reparto Principal</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
              <div v-for="actor in movieData.cast" :key="actor.name" 
                class="bg-surface-container-lowest p-3 md:p-4 rounded-xl flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                <div class="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-2 md:mb-3 border-2 border-transparent group-hover:border-primary transition-all duration-300">
                  <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" :alt="actor.name" :src="actor.image" />
                </div>
                <p class="font-bold text-on-surface text-xs md:text-sm">{{ actor.name }}</p>
                <p class="text-on-surface-variant text-[10px] md:text-[12px]">{{ actor.character }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Sidebar / Similar -->
        <div class="reveal col-span-12 lg:col-span-4 flex flex-col gap-4 md:gap-8">
          <div class="bg-surface-container-low p-4 md:p-8 rounded-2xl md:rounded-3xl h-full border border-surface-variant/50">
            <h3 class="font-label-sm text-label-sm text-outline uppercase mb-4 md:mb-8 tracking-widest">Títulos Similares</h3>
            <div class="flex flex-col gap-4 md:gap-6">
              <div v-for="similar in movieData.similar" :key="similar.title" 
                class="flex gap-3 md:gap-4 group cursor-pointer">
                <div class="w-20 h-28 md:w-24 md:h-36 rounded-xl overflow-hidden shadow-lg flex-shrink-0 group-hover:scale-105 group-hover:shadow-primary/20 group-hover:shadow-2xl transition-all duration-300">
                  <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" :alt="similar.title" :src="similar.image" />
                </div>
                <div class="flex flex-col justify-center">
                  <p class="font-bold text-on-surface text-sm md:text-base group-hover:text-primary transition-colors duration-300">{{ similar.title }}</p>
                  <p class="text-on-surface-variant text-xs md:text-sm mb-1 md:mb-2">{{ similar.genre }}</p>
                  <div class="flex items-center gap-1 text-primary text-[12px] md:text-[14px]">
                    <span class="material-symbols-outlined text-[14px] md:text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
                    <span>{{ similar.rating }}</span>
                  </div>
                </div>
              </div>
            </div>
            <button class="w-full mt-6 md:mt-10 py-2 md:py-3 rounded-xl border border-primary/20 text-primary font-bold hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300">
              Explorar más como este
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isDesktop = ref(window.innerWidth >= 768)

// Nav Links Desktop
const navLinks = ref([
  { name: 'home', label: 'Home', path: '/', active: false },
  { name: 'discover', label: 'Discover', path: '/recommendation', active: false },
  { name: 'library', label: 'Library', path: '/library', active: false },
  { name: 'settings', label: 'Settings', path: '/settings', active: false }
])

// Mobile Nav Items
const mobileNavItems = ref([
  { name: 'home', icon: 'home', label: 'Home', path: '/', active: false },
  { name: 'discover', icon: 'auto_awesome', label: 'Discover', path: '/recommendation', active: false },
  { name: 'library', icon: 'layers', label: 'Library', path: '/library', active: false },
  { name: 'settings', icon: 'settings', label: 'Settings', path: '/settings', active: false }
])

// Movie Data
const movieData = ref({
  title: 'Interstellar: El Viaje',
  year: '2014',
  genre: 'Ciencia Ficción',
  rating: 'PG-13',
  duration: '2h 49m',
  match: '98%',
  synopsis: 'Un grupo de científicos y exploradores, encabezados por Cooper, se embarcan en un viaje espacial para encontrar un nuevo hogar para la humanidad. A través de un agujero de gusano, desafiarán las leyes del tiempo y el espacio en la misión más importante de la historia.',
  backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpK0h_uf5AeEUkSPMQKIDxDRmbC7UgG_QWbZIRRtmuXFAydotnQObjsQ72Stoxiy_RaephzbLslfTcvRKuzL8ilPVKX-NKCXt-Mh0WP83Q3ECCJqBDfIIWrbdrYo5_Mz8qllvbaBUUHshl0_-dXuksDHeqdLAJ1PdGOPjwXAz188yNzcFtuZgy7EhGg11j-TWUDhWpcpdBrwlPM-9R5boVsndr1NxG9sES---2GRXbZbPNsEjP4XAv',
  director: 'Christopher Nolan',
  directorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgYM5rgYURxIIRDM-E-Q1BRVV2J5VTiT-NteGxWCbFVYTCMXPrSHRN2t5buzKNVBNeJ257WAILOj9Yo_fll50rDGzusNdo8RAhwKwvLxSJBUp62IJFGxvGGhRvSSOR8j5Z9pI0EMOXEYMyTp-ESj1txXYnRQlJH_J_V6RqeyRBtguDag9JA18OHF3h8UfrkCSkdNlfzUHDwSqJ9UzgbiMCidjIuqvEnSzi94k3ZJ8wzTHi_w2qt21q',
  directorMovies: 'Inception, Dunkirk, Tenet',
  basedOn: 'The Martian',
  basedOnReason: 'documentales sobre el espacio profundo',
  cast: [
    { name: 'Matthew McConaughey', character: 'Cooper', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcn8sU-7OFRvTI1GknoXFMZwbl36sGbChERiPV_ozx63no07b2uKxx-TvrhuEtw6K3KnPfrhWJ_cna7TtRyNb9kPQr9NCa_Mi79NllD6F1zxfGuCvfqejbUmRTb6wB4rjA2XpZAhmh70oxoiyv-SNw4FtfaJL8IT4I1l9_UmfrzRmpWLOQmlz7gvBxLC90xd8Bu-QHo0tsJ6PjokNBOR1l9y9V3Vf0Ssv42GE9H8qpId5FtO_OZrIu' },
    { name: 'Anne Hathaway', character: 'Brand', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXcMj7cRQxv_6pIf6qH7MLQuPfS2dZD6jX05_ambynIOnCfnqiaNsfNSu8Sl_X-nuMMAffyLYLqZtlFH8BQYOa0ZuMgFHXtV0xznlSHgHAEKC10-7ph9W20AKsyPouQHnxDMmhtyhNUtXbZXfYlfTaZnhTzepkZSH3ybiA-BDJHcqVTJB_hjOXK1MlcP-mQ-oRb0SNEGrIYS1Yoqg38--Q04tdbub1S4MYjmx1WA9aaOCKp7MOtDm2' },
    { name: 'Michael Caine', character: 'Prof. Brand', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAlIjG9irVDD6LkbPkYK2qwlURzrMcjSSPMCx4JfIJ5l6_W2XutZqY1hkQ_BGn5YS3F-IRaURWagGMyRd255pAi5FZQOu_nvnBsNIWrAwiHa3EyD0I2OxW1x87WbmLmU7M4rQdC9BjTUy6asuQvAt87iTyfORwXsaSYc46ZrgDjxB7btB4V6Nq19nTZvx0n-jgkQRnuYlVeOIKHARuubezH644WgMQk2uu0q4doTZeKWfBDrPjh1z-' },
    { name: 'Jessica Chastain', character: 'Murph', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1RtXmRhL6XyGN6cEKApcZCbq8XLtOv4xLh6LJK-9r90jAmP9OeE7UNbxlr4twkOAnqrT-GFScYY0YeHhOwRcQ1EKhwKVdYyQBpBag_ReXqKwb6dDsyOf3SMjjOOmSYyitaKN2vpE-rG1e_HT9xrVh3MvTIfHcm-LH8-z9jIKrQqXljtBNfV0r5ZbqPpECzoEv6IyK6mddY7lwLJzz9OvrMz06JXFdlMPSxyHAfr1Elh8d2LaMivGQ' }
  ],
  similar: [
    { title: 'The Martian', genre: 'Aventura, Drama', rating: '8.0', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4mPBdU_nnNxn5sBsAGIO8eOjisz43cJYcUPFPtDkP9Ja9rPzoj613iQbWUbgqruG2e5fFChlntwXtt-Pg36TiYTNNKIBTkGsG2y_NTqpDB8D5AKPt85ExtlOkhWBek6--FTcvbPr-dDs62yenAvpC83bm0ZXBonJpJZSHMN0dKIZNmbRBM60uUQ-HsD556cUZINXOheKWmud-i6dl_2Z0DUTZxBL603AA7_VLfvNgBvKlk82-lPwY' },
    { title: 'Gravity', genre: 'Sci-Fi, Thriller', rating: '7.7', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdsP53oatjV8tRzN7bIBomfs5BSCmLTKN8_AT9unDxYoPHETx6ApqiI3A9w23ANZ-YmOAodUhI1WefAlumw_VYYnNeKvoea1lEfsnx5ixDPOvWoVL6A-y6s_lckhh13C0YpnaNOqbY1tHtcQFWgX0lqVuYz-FkbdcmJ4iTfD1Bplhj15jjqVRdVsxsCR-eJtmF7UTgT7t5ortqTmI3MhKbG9_p82JANGpDja503wCQ6t4wH2Cez6O2' },
    { title: 'Ad Astra', genre: 'Drama, Misterio', rating: '6.5', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVRnB6pDLA38QZJUYySWd3PyIgaMPq_NxYjGwmZt_7QMb5zdv_EVf3Jv0qGMm9xqMgCU1y2prbe6nxAIaQ5k_P0aFv8ZwoNOyfXwaVIkXRqkf3KTcl43wfzTNhiZ7yQbJnq011MSEMyApKF0xVkiAftR7QdruVmtywdc-FOtzip8HjIGA--UeGtzNVaNGUvEgcnRiy2wyENkV9xNvqU2bOq78XjjpgrELJ-yXm-HBp5EIQvJFpCwKX' }
  ]
})

// Methods
const setActiveLink = (name) => {
  navLinks.value.forEach(item => {
    item.active = item.name === name
  })
}

const setActiveMobile = (name) => {
  mobileNavItems.value.forEach(item => {
    item.active = item.name === name
  })
}

const handleTryAgain = () => {
  window.location.reload()
}

// Handle resize
const handleResize = () => {
  isDesktop.value = window.innerWidth >= 768
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  
  // Scroll Reveal Implementation
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el)
  })

  // Dynamic Header Styling on Scroll
  const handleScroll = () => {
    const header = document.querySelector('header')
    if (window.scrollY > 50) {
      header?.classList.add('shadow-xl')
      header?.classList.add('bg-white/95')
      header?.classList.remove('bg-surface/80')
    } else {
      header?.classList.remove('shadow-xl')
      header?.classList.remove('bg-white/95')
      header?.classList.add('bg-surface/80')
    }
  }

  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.hero-gradient {
  background: linear-gradient(to right, rgba(249, 249, 251, 1) 30%, rgba(249, 249, 251, 0.8) 50%, rgba(249, 249, 251, 0) 100%);
}

@media (max-width: 768px) {
  .hero-gradient {
    background: linear-gradient(to top, #f9f9fb 0%, rgba(249, 249, 251, 0.8) 40%, transparent 70%, rgba(249, 249, 251, 0.2) 100%);
  }
}

@keyframes ken-burns {
  0% { transform: scale(1.0); }
  100% { transform: scale(1.1); }
}

.ken-burns {
  animation: ken-burns 20s ease-in-out infinite alternate;
}

@keyframes soft-pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(184, 0, 11, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(184, 0, 11, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(184, 0, 11, 0); }
}

.animate-pulse-match {
  animation: soft-pulse 3s infinite;
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
</style>