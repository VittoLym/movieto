<template>
  <div class="bg-background text-on-surface font-body-md min-h-screen overflow-x-hidden selection:bg-primary/20">

    <!-- Loading / Error States -->
    <!-- Skeleton Loader State -->
    <div v-if="loading" class="min-h-screen pt-20 pb-12 md:py-24 px-4 md:px-12 max-w-7xl mx-auto space-y-12 animate-pulse">
      
      <!-- Hero Skeleton -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        <!-- Poster Skeleton -->
        <div class="col-span-1 md:col-span-4 lg:col-span-3 flex justify-center md:justify-start">
          <div class="w-48 sm:w-64 md:w-full aspect-[2/3] rounded-2xl bg-surface-container-highest/60 border border-outline-variant/20 shadow-lg"></div>
        </div>

        <!-- Info Skeleton -->
        <div class="col-span-1 md:col-span-8 lg:col-span-9 flex flex-col items-center md:items-start space-y-4 md:space-y-6 w-full">
          <!-- Badges -->
          <div class="flex gap-3">
            <div class="h-6 w-32 bg-surface-container-highest/60 rounded-full"></div>
            <div class="h-6 w-16 bg-surface-container-highest/60 rounded-full"></div>
          </div>

          <!-- Title Skeleton -->
          <div class="h-10 sm:h-14 w-3/4 bg-surface-container-highest/60 rounded-xl"></div>

          <!-- Metadata Pills -->
          <div class="flex gap-3">
            <div class="h-6 w-16 bg-surface-container-highest/60 rounded-md"></div>
            <div class="h-6 w-24 bg-surface-container-highest/60 rounded-md"></div>
            <div class="h-6 w-16 bg-surface-container-highest/60 rounded-md"></div>
          </div>

          <!-- Synopsis Lines -->
          <div class="space-y-2 w-full max-w-2xl">
            <div class="h-4 w-full bg-surface-container-highest/60 rounded"></div>
            <div class="h-4 w-11/12 bg-surface-container-highest/60 rounded"></div>
            <div class="h-4 w-4/5 bg-surface-container-highest/60 rounded"></div>
          </div>

          <!-- Buttons Skeleton -->
          <div class="pt-2 w-full flex flex-col sm:flex-row gap-3 max-w-md md:max-w-none">
            <div class="h-12 w-full sm:w-36 bg-surface-container-highest/60 rounded-xl"></div>
            <div class="h-12 w-full sm:w-44 bg-surface-container-highest/60 rounded-xl"></div>
          </div>
        </div>
      </div>

      <!-- Grid Inferior Skeleton (Desktop) -->
      <div class="hidden md:grid grid-cols-12 gap-8 pt-8">
        <!-- Left Column Skeleton -->
        <div class="col-span-8 space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div class="h-32 bg-surface-container-highest/40 rounded-2xl"></div>
            <div class="h-32 bg-surface-container-highest/40 rounded-2xl"></div>
          </div>
          <div class="h-44 bg-surface-container-highest/40 rounded-2xl"></div>
        </div>

        <!-- Right Column (Similares) Skeleton -->
        <div class="col-span-4">
          <div class="h-80 bg-surface-container-highest/40 rounded-2xl p-4 space-y-4">
            <div class="h-4 w-32 bg-surface-container-highest/60 rounded mb-6"></div>
            <div v-for="n in 3" :key="n" class="flex gap-3">
              <div class="w-16 h-20 bg-surface-container-highest/60 rounded-lg shrink-0"></div>
              <div class="flex-1 space-y-2 py-2">
                <div class="h-4 w-3/4 bg-surface-container-highest/60 rounded"></div>
                <div class="h-3 w-1/2 bg-surface-container-highest/60 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div v-else-if="error" class="min-h-screen flex items-center justify-center p-4">
      <div class="text-center p-8 bg-surface-container-low rounded-3xl border border-outline-variant max-w-md w-full shadow-2xl">
        <span class="material-symbols-outlined text-error text-6xl mb-4">error</span>
        <h3 class="text-error font-headline-md text-xl font-bold mb-2">No pudimos traer una recomendación</h3>
        <p class="text-on-surface-variant text-sm mb-6">{{ error }}</p>
        <button 
          class="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20 w-full"
          @click="fetchRecommendation"
        >
          Reintentar
        </button>
      </div>
    </div>

    <template v-else-if="movie">
      <!-- Hero Section Rediseñada -->
      <section class="relative min-h-[85vh] w-full pt-20 pb-12 md:py-24 flex items-center justify-center overflow-hidden">
        
        <!-- Background Backdrop con Overlay Progresivo -->
        <div class="absolute inset-0 z-0">
          <div 
            class="w-full h-full bg-cover bg-center transition-all duration-700 scale-105"
            :style="{ backgroundImage: `url('${movie.backdropPath || movie.backgroundImage}')` }"
          ></div>
          <!-- Dark Overlays para asegurar legibilidad -->
          <div class="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40 md:bg-gradient-to-r md:from-background md:via-background/90 md:to-transparent"></div>
          <div class="absolute inset-0 bg-black/40"></div>
        </div>

        <!-- Content Container -->
        <div class="relative z-10 max-w-7xl w-full px-4 md:px-12 mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <!-- Columna Póster (Integrada orgánicamente) -->
            <div class="col-span-1 md:col-span-4 lg:col-span-3 flex justify-center md:justify-start">
              <div class="relative group w-48 sm:w-64 md:w-full max-w-[280px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-black/20 bg-surface-container-dark">
                <img 
                  :src="movie.posterPath || movie.posterImage" 
                  :alt="movie.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  @error="handleImageError"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <!-- Columna Información Principal -->
            <div class="col-span-1 md:col-span-8 lg:col-span-9 flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:space-y-6">
              
              <!-- Match Badge & Meta Stats -->
              <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary font-bold text-xs uppercase tracking-wider backdrop-blur-md">
                  <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
                  {{ movie.badge || '98% Match para ti' }}
                </span>

                <div class="flex items-center gap-1.5 text-amber-400 font-bold text-sm bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                  <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
                  <span class="text-white">{{ movie.rating || '4.8' }}</span>
                </div>
              </div>

              <!-- Título -->
              <h1 class="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight drop-shadow-md">
                {{ movie.title }}
              </h1>

              <!-- Metadata Pills -->
              <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-4 text-xs sm:text-sm font-medium text-white/80">
                <span class="bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm">{{ movie.year || '2024' }}</span>
                <span class="w-1 h-1 bg-white/40 rounded-full"></span>
                <span class="bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm">{{ movie.genre || 'Ciencia Ficción' }}</span>
                <span class="w-1 h-1 bg-white/40 rounded-full"></span>
                <span class="bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm">{{ movie.duration || '2h 15m' }}</span>
              </div>

              <!-- Sinopsis -->
              <p class="font-body-lg text-sm sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed drop-shadow-sm line-clamp-4 md:line-clamp-none">
                {{ movie.synopsis }}
              </p>

              <!-- Botones de Acción -->
              <div class="pt-2 w-full flex flex-col sm:flex-row items-center gap-3 sm:gap-4 max-w-md md:max-w-none">
                <button 
                  class="w-full sm:w-auto flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-on-primary font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-95 text-base"
                  @click="handleWatchTrailer"
                >
                  <span class="material-symbols-outlined text-[22px]" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
                  Ver Trailer
                </button>

                <button 
                  class="w-full sm:w-auto flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold py-3.5 px-6 rounded-xl backdrop-blur-md border border-white/15 transition-all active:scale-95 text-base"
                  @click="handleAddToList"
                >
                  <span class="material-symbols-outlined text-[22px]">add</span>
                  Añadir a mi lista
                </button>

                <button 
                  class="w-full sm:w-auto flex items-center justify-center p-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl backdrop-blur-md transition-all active:scale-95 group"
                  title="Probar otra recomendación"
                  @click="handleTryAgain"
                >
                  <span class="material-symbols-outlined text-[22px] group-hover:rotate-180 transition-transform duration-500">casino</span>
                  <span class="sm:hidden ml-2 font-semibold">Probar otra</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      <!-- Main Content Grid -->
      <main class="px-4 md:px-12 py-10 max-w-7xl mx-auto space-y-8">
        
        <!-- Mobile Bento Cards (Optimizado) -->
        <div class="md:hidden grid grid-cols-2 gap-3">
          <div 
            v-for="(info, index) in mobileInfoCards" 
            :key="index"
            class="p-4 rounded-2xl flex flex-col justify-between border transition-all active:scale-95 cursor-pointer"
            :class="info.highlight 
              ? 'bg-primary/10 border-primary/30 text-primary' 
              : 'bg-surface-container-low border-outline-variant/30 text-on-surface'"
            @click="handleInfoClick(info)"
          >
            <span class="text-[10px] font-bold uppercase tracking-wider opacity-70 mb-1">
              {{ info.label }}
            </span>
            <span class="font-bold text-sm leading-snug">
              {{ info.value }}
            </span>
          </div>
        </div>

        <!-- Desktop Grid Completo -->
        <div class="hidden md:grid grid-cols-12 gap-8">
          
          <!-- Detalle de la película (Columna Izquierda) -->
          <div class="col-span-12 lg:col-span-8 space-y-6">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <!-- Disponible en -->
              <div class="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 shadow-sm">
                <h3 class="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Disponible en</h3>
                <div v-if="movie.providers && movie.providers.length" class="flex flex-wrap gap-2.5">
                  <div
                    v-for="p in movie.providers"
                    :key="p.name"
                    class="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-surface-container-highest border border-outline-variant/20"
                  >
                    <span
                      class="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-extrabold shadow-sm"
                      :style="{ backgroundColor: p.color }"
                    >
                      {{ p.icon }}
                    </span>
                    <span class="text-sm font-bold text-on-surface">{{ p.name }}</span>
                  </div>
                </div>
                <p v-else class="text-on-surface-variant text-sm italic">Sin plataformas confirmadas aún.</p>
              </div>

              <!-- Match Reason o Calificación -->
              <div
                v-if="movie.matchReasonText"
                class="bg-primary/5 p-6 rounded-2xl border border-primary/20 shadow-sm flex flex-col justify-center"
              >
                <h3 class="text-xs font-bold text-primary uppercase tracking-widest mb-2">¿Por qué esta recomendación?</h3>
                <p class="text-on-surface-variant text-sm leading-relaxed">{{ movie.matchReasonText }}</p>
              </div>
              
              <div
                v-else
                class="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-center"
              >
                <h3 class="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Calificación de la comunidad</h3>
                <p class="text-2xl font-black text-on-surface">
                  {{ movie.rating ? `${movie.rating} / 5` : 'Sin reseñas' }}
                </p>
              </div>
            </div>

            <!-- Director & Reparto -->
            <div class="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6">
              <div v-if="movie.director">
                <h3 class="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Dirección</h3>
                <p class="text-lg font-bold text-on-surface">{{ movie.director }}</p>
              </div>

              <div v-if="movie.cast && movie.cast.length">
                <h3 class="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Reparto Principal</h3>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div v-for="actor in movie.cast.slice(0, 4)" :key="actor.name" class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full overflow-hidden bg-surface-variant shrink-0 ring-1 ring-outline-variant">
                      <img v-if="actor.profilePath" :src="actor.profilePath" class="w-full h-full object-cover" :alt="actor.name" />
                      <div v-else class="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-xs font-bold">
                        {{ actor.name.charAt(0) }}
                      </div>
                    </div>
                    <div class="min-w-0">
                      <p class="font-bold text-xs text-on-surface truncate">{{ actor.name }}</p>
                      <p class="text-[11px] text-on-surface-variant truncate">{{ actor.character }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Películas Similares (Columna Derecha) -->
          <div class="col-span-12 lg:col-span-4">
            <div class="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 shadow-sm h-full">
              <h3 class="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-6">Títulos Similares</h3>

              <div v-if="similarLoading" class="flex items-center gap-2 text-on-surface-variant text-sm">
                <div class="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                Buscando similares...
              </div>
              <p v-else-if="similarMovies.length === 0" class="text-on-surface-variant text-sm italic">
                No encontramos títulos parecidos por ahora.
              </p>
              
              <div v-else class="space-y-4">
                <div
                  v-for="s in similarMovies"
                  :key="s.id"
                  class="flex gap-3 p-2 rounded-xl hover:bg-surface-container-highest transition-all cursor-pointer group"
                  @click="goToMovie(s.id)"
                >
                  <div class="w-16 h-24 rounded-lg overflow-hidden shrink-0 bg-surface-variant shadow-md">
                    <img v-if="s.poster_url" :src="s.poster_url" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" :alt="s.title" />
                    <div v-else class="w-full h-full flex items-center justify-center bg-primary/5 text-primary text-[10px] text-center p-1">
                      Sin póster
                    </div>
                  </div>
                  <div class="flex flex-col justify-center min-w-0">
                    <p class="font-bold text-sm text-on-surface group-hover:text-primary transition-colors truncate">{{ s.title }}</p>
                    <p class="text-xs text-on-surface-variant truncate mb-1">{{ Array.isArray(s.genres) ? s.genres.join(', ') : 'Sin género' }}</p>
                    <div v-if="s.reviewCount > 0" class="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
                      <span>{{ s.avgRating ? s.avgRating.toFixed(1) : 'N/A' }}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </template>

    <!-- Footer -->
    <footer class="bg-surface-container-low px-4 md:px-12 py-8 text-on-surface-variant border-t border-outline-variant/20 mt-12">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
        <div class="flex items-center gap-3">
          <span class="font-bold text-base text-primary tracking-tight">MoVi(e)to</span>
          <span>© 2026 MoVi(e)to.</span>
        </div>
        <div class="flex gap-6 uppercase tracking-wider">
          <a class="hover:text-primary transition-colors" href="#">Privacidad</a>
          <a class="hover:text-primary transition-colors" href="#">Términos</a>
          <a class="hover:text-primary transition-colors" href="#">Ayuda</a>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

const loading = ref(true)
const error = ref(null)
const movie = ref(null)

const similarLoading = ref(false)
const similarMovies = ref([])

const scrolled = ref(false)
const userAvatar = ref('img/avatar.jpg') // TODO: reemplazar por userData.avatar cuando conectemos /api/users/me acá

function formatDuration(minutes) {
  if (!minutes) return 'Duración no disponible'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h ${m}m`
}

function buildMatchReasonText(matchReasons) {
  if (!matchReasons) return null
  const parts = []
  if (matchReasons.genres.length) parts.push(`te gustan ${matchReasons.genres.join(', ')}`)
  if (matchReasons.providers.length) parts.push(`está en ${matchReasons.providers.join(', ')}, que ya tenés conectado`)
  if (parts.length === 0) return null
  return `Te la recomendamos porque ${parts.join(' y ')}.`
}

function mapMovie(raw) {
  return {
    id: raw.id,
    badge: raw.personalized ? 'RECOMENDACIÓN PARA VOS' : 'RECOMENDACIÓN DEL DÍA',
    title: raw.title,
    year: raw.release_year ? String(raw.release_year) : 'N/D',
    genre: raw.genres?.length ? raw.genres.join(' / ') : 'Sin categorizar',
    duration: formatDuration(raw.duration_min),
    rating: raw.avgRating,
    reviewCount: raw.reviewCount,
    synopsis: raw.overview || 'Sin sinopsis disponible.',
    backgroundImage: raw.backdrop_url || raw.poster_url || '',
    posterImage: raw.poster_url || null,
    providers: raw.providers || [],
    matchReasonText: buildMatchReasonText(raw.matchReasons),
    director: null, // TODO: viene de TMDB credits, todavía no lo importamos
  }
}

async function fetchRecommendation() {
  loading.value = true
  error.value = null
  try {
    const token = localStorage.getItem('token') ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMGE2ZDhkNi0wMjhlLTQwM2QtOTc0MC02YTRmMzdlOTZkNGUiLCJpYXQiOjE3ODU5NjE5NDksImV4cCI6MTc4NjU2Njc0OX0.opiEZ3cLud8fyBX7N-bRdL1vLRMP3dTZC7oZ9jbMV1M'
    const res = await fetch(`${API_BASE}/movies/random`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || `Error ${res.status}`)
    }
    const raw = await res.json()
    movie.value = mapMovie(raw)
    fetchSimilarMovies(raw.id)
  } catch (err) {
    console.error('Error obteniendo recomendación:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

async function fetchSimilarMovies(movieId) {
  similarLoading.value = true
  try {
    const res = await fetch(`${API_BASE}/movies/${movieId}/similar?limit=3`)
    if (!res.ok) throw new Error(`Error ${res.status}`)
    similarMovies.value = await res.json()
  } catch (err) {
    console.error('Error obteniendo similares:', err)
    similarMovies.value = []
  } finally {
    similarLoading.value = false
  }
}

function goToMovie(id) {
  router.push(`/movie/${id}`) // ajustá la ruta a como la hayas armado
}

function handleScroll() {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  fetchRecommendation()
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

// Navegación
const navItems = ref([
  { name: 'home', label: 'Home', path: '/', active: false },
  { name: 'discover', label: 'Discover', path: '/recommendation', active: true },
  { name: 'library', label: 'Library', path: '/library', active: false },
  { name: 'settings', label: 'Settings', path: '/settings', active: false },
])

// Handlers
const handleSearch = () => console.log('Search clicked')
const handleWatchTrailer = () => console.log('Watch trailer clicked')
const handleAddToList = () => console.log('Added to list', movie.value?.id) // TODO: endpoint de watchlist
const handleTryAgain = () => fetchRecommendation()
</script>

<style scoped>
/* Estilos Mobile */
.hero-gradient-mobile {
  background: linear-gradient(to top, #f9f9fb 0%, rgba(249, 249, 251, 0.8) 40%, transparent 70%, rgba(249, 249, 251, 0.2) 100%);
}

/* Estilos Desktop */
.hero-gradient-desktop {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0) 100%);
}

.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
}

.shimmer-badge {
  background: linear-gradient(90deg, rgba(184, 0, 11, 0.2) 25%, rgba(184, 0, 11, 0.4) 50%, rgba(184, 0, 11, 0.2) 75%);
  background-size: 200% 100%;
  animation: shimmer 3s infinite linear;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Animaciones */
@keyframes revealUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-reveal {
  opacity: 0;
  animation: revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes pulseSoft {
  0%, 100% { box-shadow: 0 10px 25px -5px rgba(184, 0, 11, 0.4); transform: scale(1); }
  50% { box-shadow: 0 15px 35px -5px rgba(184, 0, 11, 0.6); transform: scale(1.02); }
}

.animate-pulse-soft {
  animation: pulseSoft 3s ease-in-out infinite;
}

@keyframes soft-pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(184, 0, 11, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(184, 0, 11, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(184, 0, 11, 0); }
}

.animate-pulse-match {
  animation: soft-pulse 3s infinite;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .animate-reveal,
  .animate-slide-up,
  .animate-pulse-soft,
  .animate-pulse-match {
    animation: none !important;
    opacity: 1 !important;
  }
}
</style>