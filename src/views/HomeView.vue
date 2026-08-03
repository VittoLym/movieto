<template>
  <div class="bg-surface overflow-x-hidden pb-24 md:pb-0 text-on-surface selection:bg-primary selection:text-white">
    
    <main class="mt-0">
      <!-- Hero Section (Compartido - Responsive) -->
      <HeroSection :hero-data="heroData" />

      <!-- Dynamic Content Sections -->
      <div class="px-margin-mobile md:px-16 space-y-12 -mt-8 md:mt-8 relative z-10">
        
        <!-- Tendencias Section -->
        <section>
          <div class="flex justify-between items-end mb-6">
            <h3 class="font-display text-headline-md text-on-surface">Tendencias</h3>
            <a class="text-primary font-label-md hover:underline transition-colors md:font-label-sm md:uppercase md:tracking-wider" href="#">
              Ver todo
            </a>
          </div>
          
          <!-- Mobile: Scroll horizontal -->
          <div class="flex overflow-x-auto gap-gutter pb-4 scroll-smooth md:hidden" id="trending-container">
            <MobileMovieCard 
              v-for="(movie, index) in trendingMovies" 
              :key="movie.title"
              :movie="movie"
              :delay="0.1 + (index * 0.1)"
              @click="handleMovieClick"
            />
          </div>

          <!-- Desktop: Grid -->
          <div class="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-gutter">
            <DesktopMovieCard 
              v-for="(movie, index) in trendingMovies" 
              :key="movie.title"
              :movie="movie"
              :delay="0.5 + (index * 0.05)"
              @click="handleMovieClick"
            />
          </div>
        </section>

        <!-- Géneros Populares Section -->
        <section class="reveal-on-scroll" id="genres-section">
          <div class="flex justify-between items-end mb-6">
            <h3 class="font-display text-headline-md text-on-surface">Géneros populares</h3>
          </div>
          
          <!-- Mobile: Bento Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:hidden">
            <div v-for="(genre, index) in mobileGenres" :key="genre.name" 
              class="animate-stagger-item h-32 rounded-2xl relative overflow-hidden group cursor-pointer transition-all hover:brightness-110 active:scale-95"
              :class="genre.bgClass"
              :style="{ animationDelay: `${0.1 + (index * 0.1)}s` }"
              @click="handleGenreClick(genre)"
            >
              <div v-if="genre.hasGradient" class="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent"></div>
              <div class="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span class="font-display text-xl font-bold tracking-widest uppercase" :class="genre.textClass">
                  {{ genre.name }}
                </span>
              </div>
            </div>
          </div>

          <!-- Desktop: Genre Cards con imágenes -->
          <div class="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            <DesktopGenreCard 
              v-for="(genre, index) in desktopGenres" 
              :key="genre.name"
              :genre="genre"
              :delay="0.9 + (index * 0.1)"
              @click="handleGenreClick"
            />
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MobileMovieCard from '../components/mobile/MobileMovieCard.vue'
import DesktopMovieCard from '../components/desktop/DesktopMovieCard.vue'
import DesktopGenreCard from '../components/desktop/DesktopGenreCard.vue'
import HeroSection from '../components/shared/HeroSection.vue'

// Hero Data
const router = useRouter()
const heroData = ref({
  badge: 'Destacado',
  title: 'Crónicas del Horizonte',
  genre: 'Sci-Fi',
  year: '2024',
  description: 'En un futuro donde el tiempo es la única moneda, un viajero busca el último oasis de libertad más allá de las fronteras de la realidad.',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM53HQ2bZh8JA-5yJune3kmIb_a89A8aGrbHazkDhPNEIEZzRUPP9RndnkPy3cAVbo-UlDwP5Sdcz2nch-zfNI-z6KPCZpzniElQUXakJnkR82F9F7l62pTAarTfZxgmopuBGVV06oBE6RSUN9AUOsM-J_diKLM02c4dZ2u7mUWMqRBUhf1lVc0GplA7oIwQ1Ya3MeAwXI8ZSdxRcY5LrSn7WWvFIj3EZ9kFseDWoBvXEhwGF_6INW'
})

// Trending Movies (Compartidos entre mobile y desktop)
const trendingMovies = ref([
  {
    title: 'Sombras de Neón',
    genre: 'Thriller',
    rating: '8.9',
    duration: '2h 15m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU3EVmHwccLqnLhXlbsJb_HTfzI6tIW41zyRhGaso9UiWvANAiHl6IIWm1-U1DtcBc6T_OYXYsHAjD8NvNrCrn5uoPSS5Xg7H8nx9ap-kLKzdVrXA7q6CwTob0uZ-lEZELUldmFSQ6ywd5ISbRo2QtkCPl1peqK-PqVb_gToVab3dCNz3qoIBjwZKnrQE5QD9MCHAo9BK8BTKsYk3f5Zlbcu0Q9omYZ7cNUFA5rZ1eihf1emC7g7Xd'
  },
  {
    title: 'El Eco del Bosque',
    genre: 'Fantasía',
    rating: '8.4',
    duration: '1h 48m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHebV2Vhg-wrbL3dyK8ZqLVs4_NfyZ9tqk80gdU9N03xdNefLRru57P-GmUX_S-ybP03jTKuovjS-1vX-2Nzt1WkQidwdCGR2up9bxIxh0__dMtBKrCjl554zBeUiPMZFUjQ5aFTOZCwnNkkSRonrlsM-Sj6bvSNWkiGz_yJPEwZlNpFV8X1puc5eF7-2pez5BUxbNOrhL_BdT4wPCHVV4uD4MZIMR9_WnwHyk7Ku7hKoK5079tTRD'
  },
  {
    title: 'Velocidad Terminal',
    genre: 'Acción',
    rating: '7.9',
    duration: '2h 04m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB53JvHm9yELFep9imnXGEWTXxelUba69qJ-3zu20nfEb1g20Dsn0wBaDgEN_W47Nk3xL9_0I-4xAW_LWcU9J3Ui12qLmrmaXxa1EzqIZ4gle8rzcOXMSn2s9Vt25miGmr9EKSylGxAkKUZROs1_zP8itLiDEsR9IOv9cOOBvt-JFHxT7MuvCGXbPL9vqN5xWW5jymqCZ9zvNxJ1CICWiudy-bvnTvjreljEK2iqhK4XiHeMlkOred2'
  },
  {
    title: 'Último Atardecer',
    genre: 'Drama',
    rating: '9.1',
    duration: '1h 22m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDGGpTzsJMzgqCBkxXr_flTZhoTVtYvCVAHoOQpB58N-GATg1KUsob18CHGB_UgiL_cOKrcbnwf8IJ-1eWJuI-deaMab5SRp2SPPJ6liXIGBZd__0nhe8qvsWpKhmfw3_VzDM58w5uQRNDqJUfmv2o4Tnydsn9-b_aXaDOvcQQ1rPzHdN034RYCOU9_zboJdC-_e472L9CqkfpAMP_LCYDgV-keTusNcYgtnIiu3oH66tZ-6xqcGtm'
  },
  {
    title: 'Echoes of Silence',
    genre: 'Sci-Fi',
    rating: '8.7',
    duration: '1h 10m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZZp9Irvc6uC055-CadWrIEKWz5YB1LnYBC864Vj_LqzO3vImyDIkjlestbvurKG1Yjw5EE7PMx1UMovGHVY5b62yuSGN5SbtVCP4XEvC0xNUQ1xtO83Z9OHNCX8dUXrFzr_lfFAN4O5WDEWo291nr_fKvki2Kly4FeM5imcGB6DAlTQns_ZiIXbOTS6HfzIMEXoW2AaJHfwO3PGFmP_QrefUn0VJBaYPclVYFyLG_MtGysSbFQFZd'
  }
])

// Mobile Genres (versión simple del Bento Grid)
const mobileGenres = ref([
  { name: 'Terror', bgClass: 'bg-surface-container border border-outline/5', textClass: 'text-on-surface', hasGradient: false },
  { name: 'Sci-Fi', bgClass: 'bg-primary-container border-primary/20 border', textClass: 'text-on-primary-container drop-shadow-sm', hasGradient: true },
  { name: 'Drama', bgClass: 'bg-tertiary-container', textClass: 'text-on-tertiary-container', hasGradient: false },
  { name: 'Comedia', bgClass: 'bg-secondary-container', textClass: 'text-on-secondary-container', hasGradient: false }
])

// Desktop Genres (versión con imágenes)
const desktopGenres = ref([
  {
    name: 'Sci-Fi',
    subtitle: 'Explore',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj25yY5jQv12y3uZSsN-m0n7ESsHFiJsN3JNfrtDNir0fhz-6Gg4P8Wu1TwqemFUVfExIX6Kjcnh1TsR0ZXqE-Fz0Il0QLCXOYNcbAPO657O_Fbr6kjz_kH8FJXqcCMXxga5kxwi4Dbg4_50cbjLju8sGZmkIO417kd6eiLDsYasSEmcpBb7HTscXehxMIjWrHB46QKhCPF6r3MB2loUOTHobQ6cyG_Lp9pXR4znzqeIAwsZtNsAKD'
  },
  {
    name: 'Drama',
    subtitle: 'Discover',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApD2mNvjX9g2iqC9dGywnPcs_YPzyA73MTQ3zucJ7uuG39vBUy1Xi4MwVIgjfPovbcKJbzDLo-EfwWO2Wl_QPSsJKhRqAmm8pLx5_AoKxpM4E-cqKfafXCauxxzIhS9iHkSbc4YZoqcivf5FcD0sbms1Zk39vviNltY1lECKXdrDFGwAB2tXwvz9v86-qmXIDMsGO_42T4F17AIhFnCUybBfV2858G_7xRsyV_zwyTb207S2nfFO4U'
  },
  {
    name: 'Action',
    subtitle: 'Feel the',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOJ_-iZ3CvTmX51mvLEl6oci5Y4zUcP2n_ktZ84fMTjW9MtjMlHsGgSxMx5caQdDZNEnv9ktOBANAMm_Zi0gt3xQAUfDFSLnopdRcuxR22At5JiZ7ZyDwRrjUbPCc2CNEzgJseOJo53V80WERAdyoJWxkCurF9XF-e-_4ixnnIh8XAx0u9gAlMZ_rKjv7X4Rd_JSmbZOSfmdjNOzFNVIAxi-qJMfiH1eMxMHm7vt24EKu7b3q9uh-t'
  },
  {
    name: 'Animation',
    subtitle: 'Pure',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKudtI82MNz0xx_P5cFCMlGvigYyGEW_UbUSy0dPkczbm465zDdGZTHLUKePElHv6M4X9z9ImCgzgPQYffxEYsIPimD1dHvOub5yAekg2sfZGhOr8Y-yQ2zYmBJOVAzX7Ub_0VKZKX_Lq-nx5oWqdhCM3uHG9zux40gBQdDYBbVOvXNIs5KNtRAlLCjYVvSZrsmm0vNGXXqx6HLLaRnS1UFxgbOLsDyg2W0xM2MUOD9CZn-QmQmxR9'
  }
])

// Event handlers
const handleMovieClick = (movie) => {
  router.push(`/movie/${movie.id || '1'}`)
}

const handleGenreClick = (genre) => {
  console.log('Genre clicked:', genre)
}

// Scroll Reveal implementation for mobile
onMounted(() => {
  const observerOptions = {
    threshold: 0.1
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        
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