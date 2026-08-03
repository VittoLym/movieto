<script setup>
import { ref, reactive } from 'vue'

/**
 * CineMatch - Biblioteca (Mobile)
 * Conversión de la maqueta HTML/Tailwind a Vue 3 <script setup>
 */

// --- Tabs ---
const tabs = [
  { id: 'guardados', label: 'Guardados' },
  { id: 'vistos', label: 'Vistos' },
  { id: 'listas', label: 'Listas' },
]
const activeTab = ref('guardados')

// key incremental para forzar el replay de la animación de entrada
// (equivalente a resetear `animation: none` + reflow en el JS original)
const gridAnimationKey = ref(0)

function switchTab(tabId) {
  activeTab.value = tabId
  gridAnimationKey.value++
  console.log(`Switched to library section: ${tabId}`)
}

// --- Búsqueda ---
const searchQuery = ref('')

// --- Datos de películas ---
// (en producción esto vendría de una API / store, filtrado por `activeTab`)
const movies = reactive([
  {
    id: 1,
    title: 'Beyond the Void',
    genre: 'Ciencia Ficción',
    year: 2024,
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6A-gKjMMG-x2ZGBeMOQP5D5scjyUUKaoaSquUrDLicBB4OMLr7vKgxGTEmBz4BZpreEJGm0W40W1C4LOGCVssMf5JecE0p_0T_2q6gKU4ZT4BOBTx5x4oPBd90GVB7BCmzGEvmA4nHMcl3D7yQrHXGBXvMYM6lQhAmI_mRal0gts3xcQMDh1f4lTeRaHgHyQ6gJQMU-lW2QvlKaQgCAINDd0PygAqp1MwR-jHPM5XE8tMsxUJO_d_',
    badge: '4K',
  },
  {
    id: 2,
    title: 'Shadow Protocol',
    genre: 'Acción',
    year: 2023,
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCjsDQmEEPECG3x18ZrEzO0NDoeXkcoETBf3M1sgvACqI789CnSbomwFjVlHqKkclu6LSc4nUwElB-0LU8Fs5JcLD0mhTLxiiaTbv0xnqKJanLpcd5x_e4fNFOsmGuKY2xR0BAFkLa28opSan7nnEWJ_kHWVEpW0t1IsGmZbWufZBSdIDUUtF-3UOkIqf50IH7_2LJ1k1YR7BNxwr8b1yh4FaZKtNd_vcVTMir26lcHngP0ZbjeC1n',
  },
  {
    id: 3,
    title: 'Echoes of Mind',
    genre: 'Drama',
    year: 2024,
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTCi_hQRJctMr4lr55Lez-H_wRBJX_bEfN0BVVb6paoBR63s9KgIxUg93LcjhFfesI798CxP36bY0LMqsBELzZWv7ukD5f2nnz3vYtMBBBQgQPJeJu4sXs9XHEGlxXbnpwxNMkCL8PQ-O8cSixqu-MywjwvxFZff-npOsSQ5DoWta77aVGrkU1bXUHPCOX9NExsWOJ9rtXd3dzGr10G4rD29eKigD19S9f6F-r5zSCSHsvM94HoJ30',
  },
  {
    id: 4,
    title: 'Neon Velocity',
    genre: 'Acción',
    year: 2023,
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZJGQFQjJYkw8J12UwJkYABh-KO6A416Gcj3k_sSvDdAxrbo-HOp23SMcDyJbVeALsq5U2C1M0gzJG0z0q4vu_1IBPdNKctDYYiWPYvug1Og7rZfBOiIkTHihf7Ai10EMkxuLGVqiALTuzQbbKJ1Jc0VNERjhZXFhZ_Jzyi2wWFgyaJT8q7pVEOSJB7stbjME17FlbLOLTcOG-ScItbSDkoHuXtyQI8pGwhK6fOi7SF9wd7zKStvHB',
    badge: 'NUEVO',
  },
  {
    id: 5,
    title: "Lumina's Quest",
    genre: 'Animación',
    year: 2024,
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDB3GCWK6sgmZJFaVhaonQ61LL9PkgKJDekRpV8jVQ-_lQa4Bus8PDIeuO2gli1XCIZnyk4vQmO5-6DokyWJ6Kn68waHarpQlkBkUoNY3e4KTpjDqa0xAF8S92xh6t1-mCerM-FIL0WDselBFIKE69fSlcPgnko6Jo7bEOTgGiqFjZh2vkZZ-xS92Rd1T11pben6cne4Zji0ANb0Mui0sJngnkLe-kOHkhWQX-vGkGlzpYrvU0m80pY',
  },
  {
    id: 6,
    title: 'The Whispering Fog',
    genre: 'Terror',
    year: 2022,
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCq7cVcJAdKTipZv709RBTBWXDQTZDtjV8wMIY5JErdKpZdj7fEJn_-T8w7Wy-SgwZs2zttdRvgQoQLKemd2yogLIUc5LE7Z5_vbzrt-Tq5vi5bcuDB8UlDHp2y4SWUdORwvorBp35Txh8U6xqiJc3JdzORyJSx5ROyP1wnCTBRlxktjiulRXxf9OZpiXWpyVekjzjSmMNw27aLC5UJ5H3WhJcukmYQzVrsBbDCBRkTgvOrptcyz78_',
  },
  {
    id: 7,
    title: 'Last Sunsets',
    genre: 'Romance',
    year: 2024,
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCPRz9R_Rd9aWhhOTy0WcCde7QrRYKIdYkCCn93dh3JyYdkNrqgY00ATuS1e9XeiVm_ADFGxlCXzRyh5-XvDLo7gGnybzMBpmaDXItWptqqQzzXXwMzvd1mQ04nWiI9HbTp0TMT8p1BqOyAkJqK1XAvMedPw_YV7lxm4ajSvo7gl48AxW-QIFzi8eoswBZcZNNW22NRTbypY4JRpTzwd4ZAGVEURmS3dNCuMxdQOfjN5tLlYDH0-aZ6',
  },
  {
    id: 8,
    title: 'Frozen Frontiers',
    genre: 'Documental',
    year: 2023,
    poster:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAAq55nMNWli0qIXhALP6O3T4G5XXlXjscc0ePx_QxETUiqNuQj-9IJkFEJ6dRlKpbAQVEj_C0b8vwPVncLMGEkwod8qrfEBbAJL9sXtdtnSCvgPYXbYEQXJPeCctgDLhfeN1iDyr1YC8X3xkcbUFbS39jDZnCRQ2_E438YXx74vDEE77xm9O5PANpQwq7UofgAgpbVD2E4cqB62CRbRK7FNn5SJ1W8B3ddtgbwf_xJqLjdElsiNqTN',
  },
])

// --- Interacción táctil en las cards (reemplaza los addEventListener del original) ---
const pressedCardId = ref(null)

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

function onTouchStart(id) {
  if (prefersReducedMotion()) {
    pressedCardId.value = id
  }
}

function onTouchEnd(id) {
  if (pressedCardId.value === id) {
    pressedCardId.value = null
  }
}

function onAddList() {
  console.log('Crear nueva lista')
}
</script>

<template>
  <div class="bg-surface text-on-surface">
    <!-- TopAppBar -->
    <main class="pt-24 pb-32 px-margin-mobile max-w-screen-xl mx-auto">
      <!-- Search & Library Header -->
      <div class="flex flex-col gap-6 mb-8">
        <h2
          class="font-display-lg-mobile text-display-lg-mobile text-on-background animate-entrance"
          style="animation-delay: 0.1s"
        >
          Tu Biblioteca
        </h2>

        <!-- Search bar within Library -->
        <div class="relative group animate-entrance" style="animation-delay: 0.2s">
          <span
            class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors"
            >search</span
          >
          <input
            v-model="searchQuery"
            class="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 pl-12 pr-4 text-body-md focus:ring-2 focus:ring-primary outline-none transition-all text-on-surface placeholder:text-secondary"
            placeholder="Buscar en tus guardados..."
            type="text"
          />
        </div>

        <!-- Library Tabs -->
        <div
          class="flex border-b border-surface-container-highest overflow-x-auto hide-scrollbar animate-entrance"
          style="animation-delay: 0.3s"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="px-6 py-3 font-label-md text-label-md whitespace-nowrap transition-all"
            :class="
              activeTab === tab.id
                ? 'active-tab text-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            "
            @click="switchTab(tab.id)"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Content Grid -->
      <div
        :key="gridAnimationKey"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        <div
          v-for="(movie, index) in movies"
          :key="movie.id"
          class="glass-card rounded-xl overflow-hidden flex flex-col group relative animate-entrance"
          :style="{
            animationDelay: `${0.4 + index * 0.05}s`,
            transform: pressedCardId === movie.id ? 'scale(0.98)' : '',
          }"
          @touchstart="onTouchStart(movie.id)"
          @touchend="onTouchEnd(movie.id)"
        >
          <div class="aspect-[2/3] w-full overflow-hidden bg-surface-container">
            <img
              :alt="`${movie.title} poster`"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              :src="movie.poster"
            />
          </div>
          <div class="p-3">
            <h3 class="font-label-md text-label-md truncate text-on-background">
              {{ movie.title }}
            </h3>
            <p class="font-label-sm text-label-sm text-on-surface-variant">
              {{ movie.genre }} • {{ movie.year }}
            </p>
          </div>
          <div v-if="movie.badge === '4K'" class="absolute top-2 right-2 flex gap-2">
            <span
              class="bg-surface/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-primary border border-primary/20"
              >4K</span
            >
          </div>
          <div v-else-if="movie.badge" class="absolute top-2 right-2">
            <div class="bg-primary px-2 py-1 rounded text-[10px] font-bold text-white shadow-lg">
              {{ movie.badge }}
            </div>
          </div>
        </div>

        <!-- Add New List Button -->
        <div
          class="pulse-button glass-card rounded-xl border-dashed border-2 border-outline-variant flex flex-col items-center justify-center p-6 gap-3 group cursor-pointer hover:border-primary bg-surface-container-low animate-entrance"
          style="animation-delay: 1.2s"
          @click="onAddList"
        >
          <div
            class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300"
          >
            <span
              class="material-symbols-outlined text-primary text-3xl group-hover:text-white group-hover:rotate-90 transition-all duration-300"
              >add</span
            >
          </div>
          <p class="font-label-md text-label-md text-primary font-bold">Nueva Lista</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
:root {
  --easing: cubic-bezier(0.4, 0, 0.2, 1);
}

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
    box-shadow:
      0 20px 25px -5px rgba(184, 0, 11, 0.1),
      0 8px 10px -6px rgba(184, 0, 11, 0.1);
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
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-soft {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(184, 0, 11, 0);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 0 15px 2px rgba(184, 0, 11, 0.1);
  }
}

.animate-entrance {
  animation: fadeInUp 0.6s var(--easing) both;
}

.pulse-button {
  animation: pulse-soft 3s infinite var(--easing);
}

@media (prefers-reduced-motion: reduce) {
  .animate-entrance,
  .pulse-button,
  .active-tab::after,
  .glass-card {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>