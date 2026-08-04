<template>
  <div class="bg-background text-on-surface min-h-screen overflow-x-hidden">
    <!-- Main Content Layout -->
    <main class="pt-24 pb-32 px-4 md:px-16 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 min-h-screen">
      
      <!-- Left Sidebar: Categories (Solo Desktop) -->
      <aside class="hidden md:block col-span-3">
        <div class="sticky top-24 space-y-6">
          <div>
            <h2 class="font-headline-md text-headline-md text-on-surface mb-6">Settings</h2>
            <nav class="space-y-1">
              <a 
                v-for="item in sidebarItems" 
                :key="item.name"
                class="flex items-center gap-3 py-3 px-4 rounded-lg transition-all group cursor-pointer"
                :class="item.active ? 'sidebar-active text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container'"
                @click="setActiveSidebar(item.name)"
              >
                <span class="material-symbols-outlined" :class="item.active ? '' : 'group-hover:text-primary'">
                  {{ item.icon }}
                </span>
                <span class="font-body-md text-body-md">{{ item.label }}</span>
              </a>
            </nav>
          </div>

          <!-- Profile Summary Card -->
          <div class="p-6 rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-container">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-full overflow-hidden">
                <img class="w-full h-full object-cover" alt="Profile" :src="userData.avatar" />
              </div>
              <div>
                <p class="font-headline-md text-[16px] text-on-surface">{{ userData.name }}</p>
                <p class="font-label-sm text-secondary">Premium Member</p>
              </div>
            </div>
            <div class="h-[2px] bg-surface-container w-full mb-4">
              <div class="h-full bg-primary w-3/4"></div>
            </div>
            <p class="font-label-sm text-secondary">Profile completion: 75%</p>
          </div>
        </div>
      </aside>

      <!-- Right Side: Details Canvas -->
      <section class="col-span-12 md:col-span-9 space-y-8 md:space-y-10">
        
        <!-- Hero Header for Active Section (Solo Desktop) -->
        <div class="hidden md:block relative h-48 w-full rounded-2xl overflow-hidden bg-primary-container group">
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div class="absolute bottom-6 left-8">
            <h1 class="text-white font-display-lg text-display-lg">Streaming Services</h1>
            <p class="text-white/80 font-body-md">Manage your linked accounts and sync watchlists.</p>
          </div>
        </div>

        <!-- Mobile: User Profile Section -->
        <section class="md:hidden mb-10 text-center animate-fade-in-up">
          <div class="relative inline-block mb-4 group cursor-pointer">
            <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-surface-container-high p-1 transition-transform duration-300 group-hover:scale-105">
              <img class="w-full h-full rounded-full object-cover" alt="User profile" :src="userData.avatar" />
            </div>
            <button class="absolute bottom-0 right-0 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform hover:scale-110">
              <span class="material-symbols-outlined text-[18px]">edit</span>
            </button>
          </div>
          <h2 class="font-headline-md text-on-surface font-bold">{{ userData.name }}</h2>
          <p class="font-body-md text-on-surface/80">{{ userData.level }} • {{ userData.memberSince }}</p>
        </section>

        <!-- Mobile: Géneros Favoritos -->
        <section class="md:hidden mb-8 animate-fade-in-up delay-1">
          <h3 class="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2 font-bold">
            <span class="material-symbols-outlined text-primary">movie_filter</span>
            Géneros Favoritos
          </h3>
          <div class="flex flex-wrap gap-3">
            <button 
              v-for="genre in genres" 
              :key="genre.name"
              class="glass-panel px-4 py-2 rounded-full font-label-md transition-all hover:scale-105 active:scale-95"
              :class="genre.active ? 'text-primary border-primary bg-primary/5' : 'text-on-surface-variant hover:text-primary hover:border-primary'"
              @click="toggleGenre(genre)"
            >
              {{ genre.name }}
            </button>
            <button class="w-10 h-10 flex items-center justify-center rounded-full glass-panel text-on-surface-variant hover:text-primary hover:scale-110 active:scale-90 transition-all">
              <span class="material-symbols-outlined">add</span>
            </button>
          </div>
        </section>

        <!-- Mobile: Mis Servicios -->
        <section class="md:hidden mb-8 animate-fade-in-up delay-2">
          <h3 class="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2 font-bold">
            <span class="material-symbols-outlined text-primary">subscriptions</span>
            Mis Servicios
          </h3>
          <div class="grid grid-cols-4 gap-4">
            <div 
              v-for="service in streamingServices" 
              :key="service.name"
              class="aspect-square glass-panel rounded-2xl p-3 flex flex-col items-center justify-center gap-2 group cursor-pointer card-hover relative"
              :class="service.active ? 'border-primary/20 bg-primary/5' : 'hover:border-primary/30'"
              @click="toggleStreamingService(service)"
            >
              <div 
                class="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-md transition-transform group-hover:rotate-3"
                :style="{ backgroundColor: service.color }"
              >
                {{ service.icon }}
              </div>
              <span class="text-label-sm font-label-sm" :class="service.active ? 'text-on-surface' : 'text-on-surface-variant'">
                {{ service.name }}
              </span>
              <span 
                v-if="service.active"
                class="material-symbols-outlined absolute top-2 right-2 text-primary text-[16px]"
                style="font-variation-settings: 'FILL' 1;"
              >
                check_circle
              </span>
            </div>
          </div>
        </section>

        <!-- Mobile: Ajustes de Cuenta -->
        <section class="md:hidden space-y-3 animate-fade-in-up delay-3">
          <h3 class="font-headline-md text-headline-md text-on-surface mb-4 font-bold">Ajustes de Cuenta</h3>
          
          <div class="glass-panel p-4 rounded-2xl flex items-center justify-between group cursor-pointer card-hover" @click="handleAccountClick">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                <span class="material-symbols-outlined">person</span>
              </div>
              <div>
                <p class="font-body-md text-on-surface font-bold">Detalles de Cuenta</p>
                <p class="text-label-sm font-label-sm text-on-surface/70">Correo, Contraseña, Región</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-outline group-hover:text-primary transition-all group-hover:translate-x-1">chevron_right</span>
          </div>

          <div class="glass-panel p-4 rounded-2xl flex items-center justify-between group card-hover">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                <span class="material-symbols-outlined">notifications</span>
              </div>
              <div>
                <p class="font-body-md text-on-surface font-bold">Notificaciones</p>
                <p class="text-label-sm font-label-sm text-on-surface/70">Estrenos, Alertas, Reseñas</p>
              </div>
            </div>
            <div 
              class="w-12 h-6 rounded-full relative flex items-center px-1 transition-all duration-300 cursor-pointer shadow-sm active:scale-90"
              :class="notificationsEnabled ? 'bg-primary' : 'bg-surface-container-highest'"
              @click="toggleNotifications"
            >
              <div 
                class="w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm"
                :class="notificationsEnabled ? 'translate-x-6' : 'translate-x-0'"
              ></div>
            </div>
          </div>

          <div class="glass-panel p-4 rounded-2xl flex items-center justify-between group cursor-pointer card-hover" @click="handlePrivacyClick">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                <span class="material-symbols-outlined">lock</span>
              </div>
              <div>
                <p class="font-body-md text-on-surface font-bold">Privacidad</p>
                <p class="text-label-sm text-label-sm text-on-surface/70">Visibilidad de perfil, Amigos</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-outline group-hover:text-primary transition-all group-hover:translate-x-1">chevron_right</span>
          </div>

          <div class="p-4 flex items-center justify-center mt-6 animate-fade-in-up delay-4">
            <button class="text-error font-headline-md flex items-center gap-2 hover:opacity-80 active:scale-95 transition-all hover-pulse" @click="handleLogout">
              <span class="material-symbols-outlined">logout</span>
              Cerrar Sesión
            </button>
          </div>
        </section>

        <!-- Desktop: Connected Services Grid -->
        <div class="hidden md:block space-y-6">
          <div class="flex justify-between items-end">
            <div>
              <h3 class="font-headline-md text-headline-md text-on-surface">Connected Services</h3>
              <p class="font-body-md text-secondary">CineMatch aggregates content from these platforms.</p>
            </div>
            <button class="px-6 py-2 bg-primary text-white rounded-full font-label-sm hover:opacity-90 active:scale-95 transition-all">
              Add Service
            </button>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="service in desktopServices" 
              :key="service.name"
              class="service-card p-6 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex flex-col items-center text-center transition-all cursor-pointer"
              @click="toggleDesktopService(service)"
            >
              <div class="w-16 h-16 flex items-center justify-center mb-4">
                <img class="w-full h-full object-contain" :alt="service.name" :src="service.logo" />
              </div>
              <h4 class="font-headline-md text-[18px] text-on-surface mb-1">{{ service.name }}</h4>
              <span 
                class="px-3 py-1 rounded-full font-label-sm mb-4"
                :class="service.connected ? 'bg-green-100 text-green-700' : 'bg-surface-container text-secondary'"
              >
                {{ service.connected ? 'Connected' : 'Not Linked' }}
              </span>
              <p class="font-body-md text-secondary text-sm px-4">{{ service.description }}</p>
              <button 
                class="mt-6 font-label-sm transition-colors"
                :class="service.connected ? 'text-primary hover:underline' : 'bg-surface-container-high px-6 py-2 rounded-full hover:bg-surface-variant'"
              >
                {{ service.connected ? 'Disconnect' : 'Connect' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Desktop: Sync Preferences -->
        <div class="hidden md:block space-y-6">
          <h3 class="font-headline-md text-headline-md text-on-surface">Data &amp; Syncing</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="sync in syncPreferences" :key="sync.title" class="p-8 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] space-y-4">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="sync.iconBg">
                  <span class="material-symbols-outlined" :class="sync.iconColor">{{ sync.icon }}</span>
                </div>
                <h5 class="font-headline-md text-[18px] text-on-surface">{{ sync.title }}</h5>
              </div>
              <p class="font-body-md text-secondary">{{ sync.description }}</p>
              <div class="flex items-center justify-between pt-4">
                <span class="font-label-sm text-on-surface">{{ sync.enabled ? 'Enabled' : 'Disabled' }}</span>
                <div 
                  class="w-12 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors"
                  :class="sync.enabled ? 'bg-primary' : 'bg-surface-container-highest'"
                  @click="toggleSync(sync)"
                >
                  <div 
                    class="absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300"
                    :class="sync.enabled ? 'right-1' : 'left-1'"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop: Warning Area -->
        <div class="hidden md:block p-6 bg-error-container/30 rounded-xl border border-error-container/50 flex items-start gap-4">
          <span class="material-symbols-outlined text-error">info</span>
          <div>
            <h6 class="font-headline-md text-[16px] text-on-error-container">Account Security</h6>
            <p class="font-body-md text-on-error-container text-sm opacity-80">
              Disconnecting a service will stop CineMatch from suggesting personalized content based on your activity on that platform. This action can be undone at any time.
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Importar avatar
import avatarImage from '/img/avatar.jpg'

const router = useRouter()

// User Data
const userData = ref({
  name: 'Gabriel Beningarcha',
  level: 'Cinéfilo Nivel 23',
  memberSince: 'Miembro desde 2026',
  avatar: avatarImage
})

// Sidebar Items (Desktop)
const sidebarItems = ref([
  { name: 'account', label: 'Account', icon: 'person', active: false },
  { name: 'preferences', label: 'Preferences', icon: 'tune', active: false },
  { name: 'streaming', label: 'Streaming Services', icon: 'tv_gen', active: true },
  { name: 'notifications', label: 'Notifications', icon: 'notifications', active: false },
  { name: 'privacy', label: 'Privacy & Safety', icon: 'security', active: false },
  { name: 'help', label: 'Help Center', icon: 'help', active: false }
])

// Genres (Mobile)
const genres = ref([
  { name: 'Sci-Fi', active: true },
  { name: 'Drama', active: false },
  { name: 'Thriller', active: true },
  { name: 'Acción', active: false },
  { name: 'Terror', active: true },
  { name: 'Comedia', active: false }
])

// Streaming Services (Mobile)
const streamingServices = ref([
  { name: 'Netflix', icon: 'N', color: '#E50914', active: true },
  { name: 'HBO Max', icon: 'H', color: '#002be7', active: false },
  { name: 'Disney+', icon: 'D+', color: '#0063e5', active: true },
  { name: 'Prime', icon: 'P', color: '#ff9900', active: false }
])

// Desktop Services
const desktopServices = ref([
  { 
    name: 'Netflix', 
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCkbVtcOtxncoDwttVj0NLq3u0kdX944jUaIy2cTYu8ZBcJWguUchkKJFneUDeLPz38lxicgRGfhGImi4beBrEnBUJdmOimleAkPaKdQb4K6s_ETCPAY6squQyuy8NsrxYnowbsGPo_NcIjqRBwgOMQwdr8AQneR-YS-4FQx9V1dr7TxyaRRGq3XGMGDOEBe7QLXPt3StjSC4f-FoY7S6-ldowH9g4deKf8wKLA4PxJPtZShM2xsl0',
    connected: true,
    description: 'Last synced: 2 hours ago'
  },
  { 
    name: 'HBO Max', 
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4z7ipgZP7VCIBzJ-VGrlgi3SN-a3Ps6xBpThonAjQNSTUCg0IUz9SD5R2k7TU-1gB1Zfm99mm0MUxnvPb4AP9eupKsE4BL6VZlt5HJOr5lHkgtIyOxRJYfqmTcG8y7DVSqjz5G9RQ2W_c9UCsVP_SvLUlSXHNqkp7rWAyPmsv3dKID77FYQUm8YouLSVizFqVUBvusNC0ExaoAOhORx9g_zeaae-smavDarPybaETjIF5L-BJQ2J2',
    connected: true,
    description: 'Last synced: Yesterday'
  },
  { 
    name: 'Disney+', 
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgZPM5Mh--h9mMLNEHOigcuaT0WJhxnr1qLSCvnhksBFLD84bAfMu7W_hE4pin_iAbtg3z1TUSFHKVUDC0s5vcOcG5QwroLQfOgi-uHCx6AWI_YXDs5nVNolowPin-Jc7Kq9zXZDgUFgaPLySLebQzXdpjx_uN_Cp82bJ6abTo2bJVoZx9PrvSK1FCQ6_dtYPAdsGd92HMV5pbF2e3ehUaLG74USiOBTL961yAVfhRk4s-BV8ra30t',
    connected: false,
    description: 'Access Marvel, Star Wars & Pixar.'
  },
  { 
    name: 'Prime Video', 
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJf05JsDjUcDxqoinuPrFB-4fkmWANpungpnaR2w_yMxGkf_h0JLSaxKQlAze1P0DLB-OJ0yjgeAJog-WTUvAifn1dRbgKR6EdolkO73X3FFGljmOgwQDH6c0T0MBhEKY4hc2gXBws6CiGV75xiti02vs_50lRb03qZqghrvRjRYF-BQHHU3Lap5Xl9tTI9jzVqaDrx6sYuLHzbqxnDh9OMdrJMAcQaxkcDZtdbtR_IiTZnTm90st4',
    connected: true,
    description: 'Last synced: 3 days ago'
  },
  { 
    name: 'Apple TV+', 
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWsgMJ-NkA46Vlx5c2450TLZFISkuAtY8onh_JSpoHgG1D9DJfle4rwKggzb2TNT9HTMwrSmpEewJ8YknaVQvA6ZdQYa_irNtLfM8c0jtXp1ajIRmblUhs5x_UL3kOTryEt0u0iEKIKykOiI31tRHTKrGk-lqKSCyV_Bap82RUPcw23ZwnPgudbINiGfcU1UMsTL_HrWrrUGV5XDwso8lwiQLdRvXCBjRvCz6HSKubr6FOsgdlgiTE',
    connected: false,
    description: 'Watch high-end original content.'
  },
  { 
    name: 'Hulu', 
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFc8XWgl9hjHPGoA-9MYbr5cQ_zycl74kZWbpF2BzeKKi57nFZT8vMuzCdfXpIrZnl5FwCsI_gfqbU0FUGLJ0q5q40v1akhvRvB8HEobn6IgUkWgAystVP9ztMsq0ch8W1iUxD4uo_ahDmIYtGRVRm2c9zWJojpXdO6RhCmFPRCt8z4IyjyVg32Mst6vMFK3VhWkG2VcxlDGIrpNOggI-VAkbj_IYOr-gIxsHjDld--bLjHXh5XtK9',
    connected: false,
    description: 'Live TV and original series.'
  }
])

// Sync Preferences (Desktop)
const syncPreferences = ref([
  {
    title: 'Auto-Sync Library',
    icon: 'sync',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    description: 'Automatically update your CineMatch library when you add items to your connected services.',
    enabled: true
  },
  {
    title: 'Watch History Sync',
    icon: 'history',
    iconBg: 'bg-on-tertiary-fixed-variant/10',
    iconColor: 'text-on-tertiary-fixed-variant',
    description: 'Keep your "Continue Watching" row updated across all devices and platforms seamlessly.',
    enabled: false
  }
])

// Notifications toggle state (Mobile)
const notificationsEnabled = ref(true)

// Methods
const setActiveSidebar = (name) => {
  sidebarItems.value.forEach(item => {
    item.active = item.name === name
  })
}

const toggleGenre = (genre) => {
  genre.active = !genre.active
}

const toggleStreamingService = (service) => {
  service.active = !service.active
}

const toggleDesktopService = (service) => {
  service.connected = !service.connected
}

const toggleSync = (sync) => {
  sync.enabled = !sync.enabled
}

const toggleNotifications = () => {
  notificationsEnabled.value = !notificationsEnabled.value
}

const handleAccountClick = () => {
  console.log('Account details clicked')
}

const handlePrivacyClick = () => {
  console.log('Privacy clicked')
}

const handleLogout = () => {
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    console.log('Logout clicked')
  }
}
</script>

<style scoped>
.glass-panel {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

.card-hover:active {
  transform: translateY(-2px) scale(0.98);
}

/* Desktop Styles */
.sidebar-active {
  border-right: 3px solid #e50914;
  background: linear-gradient(90deg, rgba(229, 9, 20, 0.05) 0%, rgba(255, 255, 255, 0) 100%);
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.08);
}

/* Animations */
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

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }

@keyframes gentle-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.hover-pulse:hover {
  animation: gentle-pulse 2s infinite ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up, 
  .hover-pulse, 
  .card-hover,
  .transition-all {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e2e2e4;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #936e69;
}
</style>