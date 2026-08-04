<script setup>
import { ref, reactive, computed } from 'vue'

/**
 * CineMatch | Biblioteca
 * Componente único responsive: fusiona las maquetas mobile y desktop
 * en un mismo <script setup>, un mismo estado y un mismo dataset.
 * El layout cambia con breakpoints de Tailwind (md:):
 *  - < md  → tabs superiores + grilla estilo "glass-card" (mobile)
 *  - >= md → sidebar + filtros + grilla con overlay al hover (desktop)
 */

const emit = defineEmits(['open-search'])

// --- Secciones principales (tabs en mobile / sidebar en desktop) ---
const sections = [
  { id: 'guardados', label: 'Guardados', icon: 'bookmarks' },
  { id: 'vistos', label: 'Vistos', desktopLabel: 'Watch History', icon: 'history' },
  { id: 'favoritos', label: 'Favoritos', desktopLabel: 'Favorites', icon: 'favorite' },
]
const activeSection = ref('guardados')

// key incremental para forzar el replay de la animación de entrada en mobile
const gridAnimationKey = ref(0)

function switchSection(id) {
  activeSection.value = id
  gridAnimationKey.value++
  console.log(`Switched to library section: ${id}`)
}

// --- Mis listas (solo se editan/crean desde el sidebar de desktop) ---
const myLists = reactive([
  { id: 1, name: 'Sunday Night Chill' },
  { id: 2, name: 'Action Masterpieces' },
])

function addList() {
  console.log('Crear nueva lista')
}

// --- Filtro de tipo de media (desktop) ---
const mediaFilters = [
  { id: 'all', label: 'All Media' },
  { id: 'movies', label: 'Movies' },
  { id: 'tv', label: 'TV Shows' },
]
const activeMediaFilter = ref('all')

// --- Orden (desktop) ---
const sortOptions = ['Date Added', 'Release Year', 'A-Z', 'Rating']
const sortBy = ref(sortOptions[0])

// --- Búsqueda (mobile: input inline / desktop: icono en el header) ---
const searchQuery = ref('')
function onSearchClick() {
  emit('open-search')
}

// --- Dataset único de películas ---
// `badge`: '4K' | 'NUEVO' | 'HD' (chip visible en ambos layouts)
// `actionsSingle`: en desktop, si es true el hover solo muestra "Watch Now"
const movies = reactive([
  {
    id: 1,
    title: 'The Void Above',
    year: 2024,
    genre: 'Sci-Fi',
    badge: 'HD',
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuATnJQ929ttKVwLQ3zbG2DYzZcWlfsim8NtTY8WnIQtIX87SOZCddhp6BBTVSnjqiDfj-7P9cO-becN0J3Vl4_ooZ697Ip-yYH6uI9-BIqi6eJZsbEpKebSyNvTsAPbcH2rbGvkoYm4x8ITxb1JnpPFueGVHMWWSbV2Z_uaYq-4P8HHg9k-eAgOwZ8LUAPq5njejcLZY9LmRbK94W0UJXqg4PaqU0y-RVnmKEnE6htjkF1HpKgi2JKQ',
  },
  {
    id: 2,
    title: 'Midnight Drive',
    year: 2023,
    genre: 'Action',
    actionsSingle: true,
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDgrmXQlN1Sariz6kKmUiVVXLwjp_s5bMKdHaP0x7OPeuixtiDuNtp57uNKT-mWmqW6EZx5Hwer6x5XwgpS_vDZbExml7tOm9tuDvp3ud7BPQYx9DVirtsVPEHsH-SJVb0w0cJXoWr1CRCErLBaapdWt6fTRs2KT-Yz_VnxShNbfMv8Gt4sgm-7H_ZTen2rjMMHMd1vAtwxrv8eFR8CdgVGDjH9R57zyOO34FGpEeW-rmVuUDaoBAif',
  },
  {
    id: 3,
    title: 'The Waiting Room',
    year: 2022,
    genre: 'Drama',
    actionsSingle: true,
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCcRs067cIG0OTqsNUN9efZNdSQDQoIH0vMxWpBVkST0Lxo2pBLTqMVNTlgDUC-m_JEV_1xBCPN9uANMaqAIunJy3XXcpmTZec-3ymJKAb8T3y5DjXDUBJTjG1l7-m_5NIW_-h_iXOdBiEFOXR_DFcm3OTKWh2gq0Ckb2clTqqiuP4xsk6B9b6zdGj1yHavrWIkEUAsiuA1ImsXygDn_eaVXUijv8alSkuPNNqMA2M4DIQh-ymFkoWr',
  },
  {
    id: 4,
    title: 'Creature Quest',
    year: 2024,
    genre: 'Animated',
    badge: 'NUEVO',
    actionsSingle: true,
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAvOEqkOwICStY0owBck7ZRkmChk9HBLRmhZnpm2rfRBFtMbqMtQ4oyZAyEl8xpUebzMfqu9W-LBdpnTQe6kkVeOKlLVapBZdrwHC1v2ZV8HOnRH38m3jok0QVRgUHNf1HCkG5rCf_3ZJJrqYU7aCqnphQhy3mmnuR5af4Ptvy3wVnYtvmFjp_QGvL6-MouFSGmyLqiUtqHxbMkdNQVMk978sb-I2BCLI3CUxDG9AYDqHYCEwNuG6aW',
  },
  {
    id: 5,
    title: 'Silicon Souls',
    year: 2023,
    genre: 'Documentary',
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBlPywm-60IMnzJxAki4x-XC7xlPodL-mawJi3Uue59iR60kXZx9N4O9GI7gZLOZxqK2RlPQttN3il3_yjoGC6xvn9CfBPDWik0A9ppltB1NUXMjua4j72lnL4Vgo7maXfAxacmoI9B28cKd0CYHzZIzd0DSwZC5Ftqb7zZLQL1ryt1bm931dmq4zvBCtrjzPDBDIhkUjdPOO7SvhM9jc2WQPYCgL9M1YpVi1YbagMMkhx2ztG8l4Ay',
  },
  {
    id: 6,
    title: 'The Cold Path',
    year: 2024,
    genre: 'Thriller',
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAfTo-N1OX_S5fyD_mFBBPum8qiwRy8OBcXs099Z8hJaOvWEUgbg_-KQsKp_yKQTlHRP4n_wV3UpoVDPbRhSsWySFvkVWzHgZ39jC580txdmVR5KltwcpMLK59TNUAnYUnl_GEH_wm0CM0K1tV1iJT-Smv2_20S3wb2BrlSvCtlkryWTYtE9lUQG1WzZVQ3kAFmrXgoBwqm6z5UfzjnlkOh9K1caeoipOUogDz5HsFBN8uj-4hk09dR',
  },
  {
    id: 7,
    title: 'Imperial Dawn',
    year: 2023,
    genre: 'Romance',
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCzVi_UnTTz6ylxPkRxSDLDr3IZ7jPuIaoGiomLrjKzR5o5SHW1dSdENFLviRHVVVRmWNClxzah3ipmwiW5kl95YGjW1CsSA3DvbXS0ktMEVqhQCLYtMok8P8ffOoP1344i0xCCsntW_93DNrQEvL4lSfK5wawKp0jNqjnc4mIMnOIA_HVj1GF7VPv2QWVd3AWuWREK9z4g56QQEM9Tqi6N1u_Um7h5snvlkdnaoQ94B-RcFsh-FUe',
  },
  {
    id: 8,
    title: 'Drift',
    year: 2021,
    genre: 'Indie',
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjqLggogJBaZsP_IxOt4gBWHzhypWKM2GaC6GKS_WiuF8EqefodUzqENexu9A331SXf5zNoJMtgNj4vzmRJ5rU7NcZL4NIHEU9_tNm1Kx-A_71dGY2HO0eLVO3xP4gpYkWiRbtj1XrS5_TFvkt_IYz4xzAAQzOlaMPLxEyio6zrEXVolIlPQgHM-UbmEGGAROhtAekIIuL0uvyD0-CbANjM-jxv4fmc5j7MInF93kvhCQyW14jgJ-d',
  },
  {
    id: 9,
    title: 'Morning Mess',
    year: 2024,
    genre: 'Comedy',
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfZM31vOgdgewH5Gtii8HQz7v8K3qRO3tOZWncnqrzdQumaMYP6UGbRJ3YLtPA-AgpuCz6UnfFKjtquOvTPII4aBugz_aR2Na9aroSL7IUlR3TjgJMzvbIH3mSfCwScPD__YEBC718QkGJaY8v0mZ7vejk7bW6yVQRDul6Fjax-bpsa7ivnS-tEXl-Boc4EqwVLb0y1-w8BPIcc_tmEQurTfgiPyX3NVshkPAsf7Dp8Kxv-CKV8vC4',
  },
  {
    id: 10,
    title: 'Shattered Crowns',
    year: 2024,
    genre: 'Fantasy',
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuABYLLGUMBqcsOjGYp2KRhRPqhEj1f-tevuLuYV2SiFzFbxz8wYIK25UuCXsyLL5MkI8TsYMab8dSM5w5e8vz_D2ovZiUsFvSab5EeBEPsVx7vLKFLUGqluhAPcyP9mvfgn3V9tmmaxzO_kHqJcPMIHvDKQP_jAinFWzqCiU2ZU62FJuVmhk-g4lxxhdajW9N5hHzmUoFFxzeaj9dbCnvBAXazxb-8EMBfAzqF0jQu5fmxDi11rF4Hr',
  },
])

// Filtro por búsqueda (aplica tanto en mobile como desktop)
const filteredMovies = computed(() => {
  if (!searchQuery.value.trim()) return movies
  const q = searchQuery.value.trim().toLowerCase()
  return movies.filter(
    (m) => m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q)
  )
})

// Orden (solo aplica visualmente en desktop, pero se calcula sobre la misma lista filtrada)
const sortedMovies = computed(() => {
  const list = [...filteredMovies.value]
  switch (sortBy.value) {
    case 'Release Year':
      return list.sort((a, b) => b.year - a.year)
    case 'A-Z':
      return list.sort((a, b) => a.title.localeCompare(b.title))
    case 'Date Added':
    case 'Rating':
    default:
      return list
  }
})

// --- Acciones de card (desktop hover) ---
function onWatchNow(movie) {
  console.log('Watch now:', movie.title)
}
function onDetails(movie) {
  console.log('Details:', movie.title)
}

// --- Feedback táctil en cards (mobile) ---
const pressedCardId = ref(null)
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}
function onTouchStart(id) {
  if (prefersReducedMotion()) pressedCardId.value = id
}
function onTouchEnd(id) {
  if (pressedCardId.value === id) pressedCardId.value = null
}

// --- Bottom nav (fallback mobile, oculto en desktop) ---
const mobileNavItems = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'discover', label: 'Discover', icon: 'auto_awesome' },
  { id: 'library', label: 'Library', icon: 'layers', active: true },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]
</script>

<template>
  <div class="bg-background min-h-screen text-on-surface">
    <main
      class="pt-24 pb-32 md:pb-12 px-margin-mobile md:px-16 lg:px-24 max-w-screen-xl md:max-w-none mx-auto flex flex-col md:flex-row gap-8 md:gap-12"
    >
      <!-- ============== MOBILE ONLY: header de sección + búsqueda + tabs ============== -->
      <div class="md:hidden flex flex-col gap-6">
        <h2 class="font-display-lg-mobile text-display-lg-mobile text-on-background animate-entrance" style="animation-delay: 0.1s">
          Tu Biblioteca
        </h2>

        <div class="relative group animate-entrance" style="animation-delay: 0.2s">
          <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
          <input
            v-model="searchQuery"
            class="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 pl-12 pr-4 text-body-md focus:ring-2 focus:ring-primary outline-none transition-all text-on-surface placeholder:text-secondary"
            placeholder="Buscar en tus guardados..."
            type="text"
          />
        </div>

        <div class="flex border-b border-surface-container-highest overflow-x-auto hide-scrollbar animate-entrance" style="animation-delay: 0.3s">
          <button
            v-for="section in sections"
            :key="section.id"
            class="px-6 py-3 font-label-md text-label-md whitespace-nowrap transition-all"
            :class="
              activeSection === section.id
                ? 'active-tab text-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            "
            @click="switchSection(section.id)"
          >
            {{ section.label }}
          </button>
        </div>
      </div>

      <!-- ============== DESKTOP ONLY: Sidebar ============== -->
      <aside class="hidden md:flex md:flex-col md:justify-between w-64 flex-shrink-0 sticky top-24 h-[calc(100vh-120px)]">
        <div>
          <h2 class="font-headline-md text-on-surface mb-8">My Library</h2>
          <ul class="space-y-4">
            <li v-for="section in sections" :key="section.id">
              <button
                class="flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all"
                :class="
                  activeSection === section.id
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-secondary hover:bg-surface-container'
                "
                @click="switchSection(section.id)"
              >
                <span class="material-symbols-outlined" :data-icon="section.icon">{{ section.icon }}</span>
                <span class="font-body-md">{{ section.desktopLabel || section.label }}</span>
              </button>
            </li>
          </ul>

          <div class="mt-12">
            <div class="flex items-center justify-between mb-4">
              <span class="text-label-sm text-secondary uppercase tracking-widest">My Lists</span>
              <button
                class="material-symbols-outlined text-primary text-sm hover:scale-110 transition-transform"
                data-icon="add_circle"
                @click="addList"
              >
                add_circle
              </button>
            </div>
            <ul class="space-y-2">
              <li v-for="list in myLists" :key="list.id">
                <button class="flex items-center gap-3 w-full px-4 py-2 text-secondary hover:text-on-surface transition-all">
                  <span class="material-symbols-outlined text-sm" data-icon="list">list</span>
                  <span class="font-body-md">{{ list.name }}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <button
          class="w-full py-4 bg-primary text-white rounded-2xl flex items-center justify-center gap-3 font-bold shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all"
          @click="addList"
        >
          <span class="material-symbols-outlined" data-icon="playlist_add">playlist_add</span>
          Nueva Lista
        </button>
      </aside>

      <!-- ============== Contenido principal (grilla) ============== -->
      <section class="flex-grow">
        <!-- Filter bar: solo desktop -->
        <div class="hidden md:flex items-center justify-between mb-10">
          <div class="flex items-center gap-4">
            <button
              v-for="filter in mediaFilters"
              :key="filter.id"
              class="px-6 py-2 rounded-full font-label-sm transition-colors"
              :class="
                activeMediaFilter === filter.id
                  ? 'bg-on-surface text-white shadow-md'
                  : 'bg-surface-container text-secondary hover:bg-surface-container-high'
              "
              @click="activeMediaFilter = filter.id"
            >
              {{ filter.label }}
            </button>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-label-sm text-secondary">Sort by:</span>
            <select v-model="sortBy" class="bg-transparent border-none font-label-sm text-on-surface focus:ring-0 cursor-pointer">
              <option v-for="option in sortOptions" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
        </div>

        <!-- Grilla unificada -->
        <div
          :key="gridAnimationKey"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-x-gutter md:gap-y-10"
        >
          <div
            v-for="(movie, index) in sortedMovies"
            :key="movie.id"
            class="group cursor-pointer md:animate-none animate-entrance glass-card md:!bg-transparent md:!border-0 md:!shadow-none rounded-xl overflow-hidden md:overflow-visible flex flex-col relative"
            :style="{
              animationDelay: `${0.4 + index * 0.05}s`,
              transform: pressedCardId === movie.id ? 'scale(0.98)' : '',
            }"
            @touchstart="onTouchStart(movie.id)"
            @touchend="onTouchEnd(movie.id)"
          >
            <div
              class="relative aspect-[2/3] w-full overflow-hidden bg-surface-container rounded-xl md:movie-card-shadow mb-0 md:mb-4 md:group-hover:-translate-y-2 transition-transform duration-300"
            >
              <img
                class="w-full h-full object-cover md:transition-transform md:duration-700 md:group-hover:scale-110"
                :alt="`${movie.title} poster`"
                :src="movie.poster"
              />

              <!-- Overlay de acciones: solo desktop -->
              <div
                class="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex-col justify-end p-4"
              >
                <button
                  class="w-full py-2 bg-white text-black font-bold rounded-lg text-sm"
                  :class="{ 'mb-2': !movie.actionsSingle }"
                  @click="onWatchNow(movie)"
                >
                  Watch Now
                </button>
                <button
                  v-if="!movie.actionsSingle"
                  class="w-full py-2 bg-white/20 backdrop-blur-md text-white font-bold rounded-lg text-sm"
                  @click="onDetails(movie)"
                >
                  Details
                </button>
              </div>

              <!-- Badge: estilo mobile (chip esquina) -->
              <span
                v-if="movie.badge"
                class="md:hidden absolute top-2 right-2 bg-surface/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-primary border border-primary/20"
              >
                {{ movie.badge }}
              </span>
              <!-- Badge: estilo desktop -->
              <span
                v-if="movie.badge"
                class="hidden md:block absolute top-2 right-2 px-2 py-1 bg-primary text-white text-[10px] font-bold rounded"
              >
                {{ movie.badge }}
              </span>
            </div>

            <div class="p-3 md:p-0">
              <h3 class="font-label-md text-label-md md:font-headline-md md:text-lg md:leading-tight truncate md:whitespace-normal text-on-background md:group-hover:text-primary transition-colors">
                {{ movie.title }}
              </h3>
              <p class="font-label-sm text-label-sm md:text-label-sm text-on-surface-variant md:text-secondary">
                <span class="md:hidden">{{ movie.genre }} • {{ movie.year }}</span>
                <span class="hidden md:inline">{{ movie.year }} • {{ movie.genre }}</span>
              </p>
            </div>
          </div>

          <!-- Add New List: solo mobile (en desktop el botón vive en el sidebar) -->
          <div
            class="md:hidden pulse-button glass-card rounded-xl border-dashed border-2 border-outline-variant flex flex-col items-center justify-center p-6 gap-3 group cursor-pointer hover:border-primary bg-surface-container-low animate-entrance"
            style="animation-delay: 1.2s"
            @click="addList"
          >
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <span class="material-symbols-outlined text-primary text-3xl group-hover:text-white group-hover:rotate-90 transition-all duration-300">add</span>
            </div>
            <p class="font-label-md text-label-md text-primary font-bold">Nueva Lista</p>
          </div>
        </div>
      </section>
    </main>

    <!-- BottomNavBar: solo mobile -->
    <nav class="md:hidden fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-2xl border-t border-surface-container-highest shadow-[0_-1px_10px_rgba(0,0,0,0.05)] flex justify-around items-center h-20 pb-safe px-4">
      <div
        v-for="item in mobileNavItems"
        :key="item.id"
        class="flex flex-col items-center justify-center transition-all active:scale-90 duration-300 px-4"
        :class="item.active ? 'text-primary font-bold bg-primary/10 rounded-xl py-1' : 'text-secondary hover:text-primary'"
      >
        <span class="material-symbols-outlined" :data-icon="item.icon">{{ item.icon }}</span>
        <span class="font-label-md text-label-md">{{ item.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style scoped>
:root {
  --easing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* ---- Compartido ---- */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-entrance {
  animation: fadeInUp 0.6s var(--easing) both;
}
@media (prefers-reduced-motion: reduce) {
  .animate-entrance, .pulse-button, .active-tab::after, .glass-card {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}

/* ---- Mobile ---- */
.glass-card {
  background: #ffffff;
  border: 1px solid #e2e2e4;
  transition: all 0.4s var(--easing);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
@media (hover: hover) {
  .glass-card:hover {
    transform: translateY(-8px) scale(1.04);
    border-color: rgba(229, 9, 20, 0.4);
    box-shadow: 0 20px 25px -5px rgba(184, 0, 11, 0.1), 0 8px 10px -6px rgba(184, 0, 11, 0.1);
  }
}
.active-tab {
  position: relative;
  transition: color 0.3s var(--easing);
}
.active-tab::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 3px;
  background: #b8000b;
  border-radius: 99px;
  box-shadow: 0 0 10px rgba(184, 0, 11, 0.3);
  animation: slideIn 0.4s var(--easing);
}
@keyframes slideIn {
  from { transform: scaleX(0); opacity: 0; }
  to { transform: scaleX(1); opacity: 1; }
}
@keyframes pulse-soft {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(184, 0, 11, 0); }
  50% { transform: scale(1.02); box-shadow: 0 0 15px 2px rgba(184, 0, 11, 0.1); }
}
.pulse-button {
  animation: pulse-soft 3s infinite var(--easing);
}
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* ---- Desktop ---- */
.glass-nav {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
.movie-card-shadow {
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
}
.active-nav-indicator {
  position: relative;
}
.active-nav-indicator::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #e50914;
}
</style>