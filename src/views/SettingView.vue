<template>
  <div class="bg-surface text-on-surface min-h-screen overflow-x-hidden">

    <!-- Main Content -->
    <main class="pt-24 pb-32 px-4 md:px-16 max-w-2xl mx-auto">
      <!-- User Profile Section -->
      <section class="mb-10 text-center animate-fade-in-up">
        <div class="relative inline-block mb-4 group cursor-pointer">
          <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-surface-container-high p-1 transition-transform duration-300 group-hover:scale-105">
            <img 
              class="w-full h-full rounded-full object-cover" 
              alt="User profile" 
              :src="userData.avatar"
            />
          </div>
          <button class="absolute bottom-0 right-0 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform hover:scale-110">
            <span class="material-symbols-outlined text-[18px]">edit</span>
          </button>
        </div>
        <h2 class="font-headline-md text-on-surface font-bold">{{ userData.name }}</h2>
        <p class="font-body-md text-on-surface/80">{{ userData.level }} • {{ userData.memberSince }}</p>
      </section>

      <!-- Preferences: Genres -->
      <section class="mb-8 animate-fade-in-up delay-1">
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

      <!-- Preferences: Streaming Services -->
      <section class="mb-8 animate-fade-in-up delay-2">
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

      <!-- Account & Notifications -->
      <section class="space-y-3 animate-fade-in-up delay-3">
        <h3 class="font-headline-md text-headline-md text-on-surface mb-4 font-bold">Ajustes de Cuenta</h3>
        
        <!-- Item: Account -->
        <div 
          class="glass-panel p-4 rounded-2xl flex items-center justify-between group cursor-pointer card-hover"
          @click="handleAccountClick"
        >
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary transition-transform group-hover:scale-110">
              <span class="material-symbols-outlined">person</span>
            </div>
            <div>
              <p class="font-body-md text-on-surface font-bold">Detalles de Cuenta</p>
              <p class="text-label-sm font-label-sm text-on-surface/70">Correo, Contraseña, Región</p>
            </div>
          </div>
          <span class="material-symbols-outlined text-outline group-hover:text-primary transition-all group-hover:translate-x-1">
            chevron_right
          </span>
        </div>

        <!-- Item: Notifications -->
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

        <!-- Item: Privacy -->
        <div 
          class="glass-panel p-4 rounded-2xl flex items-center justify-between group cursor-pointer card-hover"
          @click="handlePrivacyClick"
        >
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary transition-transform group-hover:scale-110">
              <span class="material-symbols-outlined">lock</span>
            </div>
            <div>
              <p class="font-body-md text-on-surface font-bold">Privacidad</p>
              <p class="text-label-sm text-label-sm text-on-surface/70">Visibilidad de perfil, Amigos</p>
            </div>
          </div>
          <span class="material-symbols-outlined text-outline group-hover:text-primary transition-all group-hover:translate-x-1">
            chevron_right
          </span>
        </div>

        <!-- Item: Log Out -->
        <div class="p-4 flex items-center justify-center mt-6 animate-fade-in-up delay-4">
          <button 
            class="text-error font-headline-md flex items-center gap-2 hover:opacity-80 active:scale-95 transition-all hover-pulse"
            @click="handleLogout"
          >
            <span class="material-symbols-outlined">logout</span>
            Cerrar Sesión
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// User Data
const userData = ref({
  name: 'Gabriel Beningarcha',
  level: 'Cinéfilo Nivel 23',
  memberSince: 'Miembro desde 2026',
  avatar: '../../public/img/avatar.jpg'
})

// Genres
const genres = ref([
  { name: 'Sci-Fi', active: true },
  { name: 'Drama', active: false },
  { name: 'Thriller', active: true },
  { name: 'Acción', active: false },
  { name: 'Terror', active: true },
  { name: 'Comedia', active: false }
])

// Streaming Services
const streamingServices = ref([
  { name: 'Netflix', icon: 'N', color: '#E50914', active: true },
  { name: 'HBO Max', icon: 'H', color: '#002be7', active: false },
  { name: 'Disney+', icon: 'D+', color: '#0063e5', active: true },
  { name: 'Prime', icon: 'P', color: '#ff9900', active: false }
])

// Notifications toggle state
const notificationsEnabled = ref(true)

// Methods
const toggleGenre = (genre) => {
  genre.active = !genre.active
}

const toggleStreamingService = (service) => {
  service.active = !service.active
}

const toggleNotifications = () => {
  notificationsEnabled.value = !notificationsEnabled.value
}

const handleAccountClick = () => {
  console.log('Account details clicked')
  // Navegar a detalles de cuenta
}

const handlePrivacyClick = () => {
  console.log('Privacy clicked')
  // Navegar a privacidad
}

const handleLogout = () => {
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    console.log('Logout clicked')
    // Aquí iría la lógica de logout
    // router.push('/')
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

/* Entrance Animations */
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

/* Staggered Delays */
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }
.delay-5 { animation-delay: 0.5s; }

/* Pulse Animation for Logout */
@keyframes gentle-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.hover-pulse:hover {
  animation: gentle-pulse 2s infinite ease-in-out;
}

/* Respect Reduced Motion */
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
</style>