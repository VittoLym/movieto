<template>
  <div class="bg-surface overflow-x-hidden pb-24 text-on-surface">
    <TopAppBar />
    
    <main class="mt-0">
      <!-- Hero Section -->
      <section class="relative w-full h-[751px] overflow-hidden">
        <div class="absolute inset-0">
          <div class="w-full h-full bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDM53HQ2bZh8JA-5yJune3kmIb_a89A8aGrbHazkDhPNEIEZzRUPP9RndnkPy3cAVbo-UlDwP5Sdcz2nch-zfNI-z6KPCZpzniElQUXakJnkR82F9F7l62pTAarTfZxgmopuBGVV06oBE6RSUN9AUOsM-J_diKLM02c4dZ2u7mUWMqRBUhf1lVc0GplA7oIwQ1Ya3MeAwXI8ZSdxRcY5LrSn7WWvFIj3EZ9kFseDWoBvXEhwGF_6INW')"></div>
          <div class="absolute inset-0 hero-gradient"></div>
        </div>
        
        <!-- Hero Content -->
        <div class="absolute bottom-0 left-0 w-full p-margin-mobile mb-12 flex flex-col items-start space-y-4">
          <div class="flex gap-2">
            <span class="shimmer-badge px-3 py-1 rounded-full border border-primary/30 font-label-md text-label-md text-primary uppercase tracking-wider">Destacado</span>
            <span class="bg-black/10 backdrop-blur-md px-3 py-1 rounded-full border border-black/10 font-label-md text-label-md text-on-surface uppercase tracking-wider">Sci-Fi • 2024</span>
          </div>
          <h2 class="font-display text-display-lg-mobile md:text-display-lg text-on-surface max-w-2xl leading-tight">Crónicas del Horizonte</h2>
          <p class="font-body-lg text-on-surface-variant max-w-xl line-clamp-2">En un futuro donde el tiempo es la única moneda, un viajero busca el último oasis de libertad más allá de las fronteras de la realidad.</p>
          
          <!-- Central Action Button -->
          <div class="pt-6 w-full flex justify-center md:justify-start">
            <button class="pulse-interaction group flex items-center gap-3 bg-primary text-on-primary font-headline-md py-4 px-8 rounded-full transition-all duration-300 transform active:scale-95 shadow-xl">
              <span class="material-symbols-outlined text-3xl animate-pulse">auto_awesome</span>
              <span>¡Recomiéndame algo!</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Dynamic Content Sections -->
      <div class="px-margin-mobile space-y-12 -mt-8 relative z-10">
        <!-- Trending Section -->
        <section>
          <div class="flex justify-between items-end mb-6">
            <h3 class="font-display text-headline-md text-on-surface">Tendencias</h3>
            <a class="text-primary font-label-md hover:underline transition-colors" href="#">Ver todo</a>
          </div>
          <div class="flex overflow-x-auto gap-gutter pb-4 scroll-smooth" id="trending-container">
            <MovieCard 
              v-for="(movie, index) in trendingMovies" 
              :key="movie.title"
              :movie="movie"
              :delay="0.1 + (index * 0.1)"
            />
          </div>
        </section>

        <!-- Popular Genres (Bento Grid Style) -->
        <section class="reveal-on-scroll" id="genres-section">
          <div class="flex justify-between items-end mb-6">
            <h3 class="font-display text-headline-md text-on-surface">Géneros populares</h3>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GenreCard 
              v-for="(genre, index) in genres" 
              :key="genre.name"
              :genre="genre.name"
              :variant="genre.variant"
              :delay="0.1 + (index * 0.1)"
            />
          </div>
        </section>
      </div>
    </main>

    <BottomNavBar />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TopAppBar from '../components/TopAppBar.vue'
import MovieCard from '../components/MovieCard.vue'
import GenreCard from '../components/GenreCard.vue'
import BottomNavBar from '../components/BottomNavBar.vue'

const trendingMovies = ref([
  {
    title: 'Sombras de Neón',
    genre: 'Thriller',
    rating: '8.9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU3EVmHwccLqnLhXlbsJb_HTfzI6tIW41zyRhGaso9UiWvANAiHl6IIWm1-U1DtcBc6T_OYXYsHAjD8NvNrCrn5uoPSS5Xg7H8nx9ap-kLKzdVrXA7q6CwTob0uZ-lEZELUldmFSQ6ywd5ISbRo2QtkCPl1peqK-PqVb_gToVab3dCNz3qoIBjwZKnrQE5QD9MCHAo9BK8BTKsYk3f5Zlbcu0Q9omYZ7cNUFA5rZ1eihf1emC7g7Xd'
  },
  {
    title: 'El Eco del Bosque',
    genre: 'Fantasía',
    rating: '8.4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHebV2Vhg-wrbL3dyK8ZqLVs4_NfyZ9tqk80gdU9N03xdNefLRru57P-GmUX_S-ybP03jTKuovjS-1vX-2Nzt1WkQidwdCGR2up9bxIxh0__dMtBKrCjl554zBeUiPMZFUjQ5aFTOZCwnNkkSRonrlsM-Sj6bvSNWkiGz_yJPEwZlNpFV8X1puc5eF7-2pez5BUxbNOrhL_BdT4wPCHVV4uD4MZIMR9_WnwHyk7Ku7hKoK5079tTRD'
  },
  {
    title: 'Velocidad Terminal',
    genre: 'Acción',
    rating: '7.9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB53JvHm9yELFep9imnXGEWTXxelUba69qJ-3zu20nfEb1g20Dsn0wBaDgEN_W47Nk3xL9_0I-4xAW_LWcU9J3Ui12qLmrmaXxa1EzqIZ4gle8rzcOXMSn2s9Vt25miGmr9EKSylGxAkKUZROs1_zP8itLiDEsR9IOv9cOOBvt-JFHxT7MuvCGXbPL9vqN5xWW5jymqCZ9zvNxJ1CICWiudy-bvnTvjreljEK2iqhK4XiHeMlkOred2'
  },
  {
    title: 'Último Atardecer',
    genre: 'Drama',
    rating: '9.1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDGGpTzsJMzgqCBkxXr_flTZhoTVtYvCVAHoOQpB58N-GATg1KUsob18CHGB_UgiL_cOKrcbnwf8IJ-1eWJuI-deaMab5SRp2SPPJ6liXIGBZd__0nhe8qvsWpKhmfw3_VzDM58w5uQRNDqJUfmv2o4Tnydsn9-b_aXaDOvcQQ1rPzHdN034RYCOU9_zboJdC-_e472L9CqkfpAMP_LCYDgV-keTusNcYgtnIiu3oH66tZ-6xqcGtm'
  }
])

const genres = ref([
  { name: 'Terror', variant: 'default' },
  { name: 'Sci-Fi', variant: 'primary' },
  { name: 'Drama', variant: 'tertiary' },
  { name: 'Comedia', variant: 'secondary' }
])

// Scroll Reveal implementation
onMounted(() => {
  const observerOptions = {
    threshold: 0.1
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        
        // Trigger children stagger inside if they exist
        const items = entry.target.querySelectorAll('.animate-stagger-item')
        items.forEach((item, index) => {
          item.style.animationDelay = `${(index + 1) * 0.1}s`
          item.style.opacity = '1'
        })
      }
    })
  }, observerOptions)

  document.querySelectorAll('.reveal-on-scroll').forEach(section => {
    revealObserver.observe(section)
  })
})
</script>