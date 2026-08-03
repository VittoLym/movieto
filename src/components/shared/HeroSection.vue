<template>
  <section class="relative w-full h-[751px] md:h-[819px] min-h-[600px] flex items-center overflow-hidden">
    <!-- Hero Image Background -->
    <div class="absolute inset-0 z-0">
      <!-- Mobile: Gradient desde abajo -->
      <div class="absolute inset-0 md:hidden hero-gradient z-10"></div>
      <!-- Desktop: Gradient desde la izquierda -->
      <div class="absolute inset-0 hidden md:block" style="background: linear-gradient(to right, #f9f9fb 0%, rgba(249, 249, 251, 0.4) 40%, rgba(249, 249, 251, 0) 100%); z-index: 10;"></div>
      <img 
        class="w-full h-full object-cover md:animate-ken-burns" 
        alt="Cinematic landscape" 
        :src="heroData.image"
      />
    </div>
    
    <!-- Contenido Mobile -->
    <div class="absolute bottom-0 left-0 w-full p-margin-mobile mb-12 flex flex-col items-start space-y-4 md:hidden z-20">
      <div class="flex gap-2">
        <span class="shimmer-badge px-3 py-1 rounded-full border border-primary/30 font-label-md text-label-md text-primary uppercase tracking-wider">
          {{ heroData.badge }}
        </span>
        <span class="bg-black/10 backdrop-blur-md px-3 py-1 rounded-full border border-black/10 font-label-md text-label-md text-on-surface uppercase tracking-wider">
          {{ heroData.genre }} • {{ heroData.year }}
        </span>
      </div>
      <h2 class="font-display text-display-lg-mobile text-on-surface max-w-2xl leading-tight">
        {{ heroData.title }}
      </h2>
      <p class="font-body-lg text-on-surface-variant max-w-xl line-clamp-2">
        {{ heroData.description }}
      </p>
      <div class="pt-6 w-full flex justify-center md:justify-start">
        <button @click="goToRecommendation" class="pulse-interaction group flex items-center gap-3 bg-primary text-on-primary font-headline-md py-4 px-8 rounded-full transition-all duration-300 transform active:scale-95 shadow-xl">
          <span class="material-symbols-outlined text-3xl animate-pulse">auto_awesome</span>
          <span>¡Recomiéndame algo!</span>
        </button>
      </div>
    </div>

    <!-- Contenido Desktop -->
    <div class="relative z-20 px-16 max-w-4xl hidden md:block stagger-in" style="animation-delay: 0.2s;">
      <span class="inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm uppercase tracking-widest">
        {{ heroData.badge }}
      </span>
      <h2 class="font-display-lg text-display-lg mb-4 text-on-surface">
        {{ heroData.title }}
      </h2>
      <p class="font-body-lg text-body-lg text-secondary mb-10 max-w-xl">
        {{ heroData.description }}
      </p>
      <div class="flex items-center gap-4">
        <button class="bg-primary text-on-primary px-8 py-4 rounded-xl font-headline-md text-body-md flex items-center gap-2 hover:bg-primary/90 active:scale-95 transition-all shadow-lg shadow-primary/20">
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
          Watch Now
        </button>
        <button class="bg-surface-container-highest/80 backdrop-blur-md text-on-surface px-8 py-4 rounded-xl font-headline-md text-body-md border border-white/20 hover:bg-surface-container-highest active:scale-95 transition-all">
          View Details
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps({
  heroData: {
    type: Object,
    required: true,
    default: () => ({
      badge: 'Destacado',
      title: 'Crónicas del Horizonte',
      genre: 'Sci-Fi',
      year: '2024',
      description: 'En un futuro donde el tiempo es la única moneda, un viajero busca el último oasis de libertad más allá de las fronteras de la realidad.',
      image: ''
    })
  }
})
function goToRecommendation() {
  router.push('/recommendation')
}
</script>