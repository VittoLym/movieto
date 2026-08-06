<template>
  <div class="bg-background text-on-surface min-h-screen">
    <!-- Mobile Header con menú hamburguesa -->
    <header class="md:hidden fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button 
          class="p-2 rounded-lg hover:bg-surface-container transition-colors"
          @click="isValidate"
        >
          <span class="material-symbols-outlined text-2xl">
            {{ mobileMenuOpen ? 'close' : 'menu' }}
          </span>
        </button>
        <h1 class="font-bold text-lg text-primary">Ajustes</h1>
      </div>
      <div class="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
        <img class="w-full h-full object-cover" alt="Profile" :src="userAvatar" />
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <Transition name="slide-down">
      <div 
        v-if="mobileMenuOpen"
        class="md:hidden fixed top-16 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-b border-outline-variant/30 max-h-[calc(100vh-4rem)] overflow-y-auto"
      >
        <nav class="p-4 space-y-1">
          <RouterLink
            v-for="item in menuItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200"
            active-class="bg-primary/10 text-primary font-semibold"
            @click="mobileMenuOpen = false"
          >
            <span class="material-symbols-outlined text-[22px]">
              {{ item.icon }}
            </span>
            <span class="font-medium text-[15px]">
              {{ item.label }}
            </span>
            <span class="ml-auto text-on-surface-variant/40">
              <span class="material-symbols-outlined text-[20px]">chevron_right</span>
            </span>
          </RouterLink>
        </nav>

        <!-- Profile Summary en mobile -->
        <div class="p-4 border-t border-outline-variant/20 mt-2">
          <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low">
            <div class="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
              <img class="w-full h-full object-cover" alt="Profile" :src="userAvatar" />
            </div>
            <div>
              <p class="font-semibold text-sm text-on-surface">{{ userName }}</p>
              <p class="text-xs text-secondary">Premium Member</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <main class="pt-16 md:pt-28 pb-16 px-4 md:px-16 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 min-h-screen">
      
      <!-- Left Sidebar (Desktop) -->
      <aside class="hidden md:block col-span-3">
        <div class="sticky top-28 space-y-8">
          <div>
            <h2 class="text-[14px] font-semibold tracking-wider uppercase text-on-surface-variant mb-4 px-2">
              Settings
            </h2>
            <nav class="space-y-1">
              <RouterLink
                v-for="item in menuItems"
                :key="item.to"
                :to="item.to"
                class="flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all duration-200 group"
                active-class="bg-primary/10 text-primary font-semibold"
                exact-active-class="bg-primary/10 text-primary font-semibold"
                v-if="isUser"
              >
                <span 
                  class="material-symbols-outlined text-[20px]"
                  :class="{
                    'group-hover:text-on-surface transition-colors': $route.path !== item.to
                  }"
                >
                  {{ item.icon }}
                </span>
                <span 
                  class="font-body-md text-[15px] font-medium"
                  :class="{
                    'group-hover:translate-x-1 transition-transform': $route.path !== item.to
                  }"
                >
                  {{ item.label }}
                </span>
              </RouterLink>
            </nav>
          </div>

          <!-- Profile Summary Card (Desktop) -->
          <div class="p-5 rounded-lg bg-surface-container-lowest border border-outline-variant/50 flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
                <img class="w-full h-full object-cover" alt="Profile" :src="userAvatar" />
              </div>
              <div>
                <p class="font-semibold text-[15px] text-on-surface leading-tight">{{ userName }}</p>
                <p class="text-[13px] text-secondary">Premium Member</p>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-[12px] font-medium text-secondary">Profile completion</span>
                <span class="text-[12px] font-semibold text-primary">75%</span>
              </div>
              <div class="h-1.5 bg-surface-container-high rounded-full w-full overflow-hidden">
                <div class="h-full bg-primary rounded-full w-3/4 shimmer-effect"></div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Content Area -->
      <section class="col-span-12 md:col-span-9 mt-10 ">
        <!-- Mobile: Título de la sección actual -->
        <div class="md:hidden mb-4 pt-2">
          <h2 class="text-xl font-bold text-on-surface">
            {{ currentSectionTitle }}
          </h2>
          <p class="text-sm text-on-surface-variant mt-1">{{ currentSectionDescription }}</p>
        </div>

        <RouterView />
      </section>
    </main>

    <!-- Mobile Bottom Navigation (opcional, si quieres mantener la navegación inferior) -->
    <nav class="md:hidden fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-2xl border-t border-outline-variant/30 flex justify-around items-center h-16 px-4">
      <RouterLink
        v-for="item in bottomNavItems"
        :key="item.to"
        :to="item.to"
        class="flex flex-col items-center justify-center transition-all active:scale-90"
        active-class="text-primary font-bold"
      >
        <span class="material-symbols-outlined text-[22px]">
          {{ item.icon }}
        </span>
        <span class="text-[9px] font-medium mt-0.5">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../../composable/useAuth'
const { user, logout } = useAuth()
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const mobileMenuOpen = ref(false)
const isUser = computed(() => {
    return user.value !== null
})
const isValidate =()=> {
    if(user.value!== null){mobileMenuOpen.value = !mobileMenuOpen.value}
}
// Datos del usuario
const userName = ref('No user')
const userAvatar = ref('/img/avatar.jpg')
// Items del menú
const menuItems = ref([
  {
    label: 'Perfil',
    icon: 'person',
    to: '/settings/profile',
    description: 'Tu información personal'
  },
  {
    label: 'Géneros',
    icon: 'movie_filter',
    to: '/settings/genres',
    description: 'Tus géneros favoritos'
  },
  {
    label: 'Streaming',
    icon: 'subscriptions',
    to: '/settings/streaming',
    description: 'Servicios conectados'
  },
  {
    label: 'Notificaciones',
    icon: 'notifications',
    to: '/settings/notifications',
    description: 'Alertas y preferencias'
  },
  {
    label: 'Cuenta',
    icon: 'manage_accounts',
    to: '/settings/account',
    description: 'Correo y contraseña'
  },
  {
    label: 'Privacidad',
    icon: 'lock',
    to: '/settings/privacy',
    description: 'Seguridad y visibilidad'
  }
])

// Bottom nav items (mobile)
const bottomNavItems = ref([
  { label: 'Home', icon: 'home', to: '/' },
  { label: 'Discover', icon: 'auto_awesome', to: '/recommendation' },
  { label: 'Settings', icon: 'settings', to: '/settings' }
])

// Obtener título y descripción de la sección actual
const currentSectionTitle = computed(() => {
  const current = menuItems.value.find(item => item.to === route.path)
  return current?.label || 'Ajustes'
})

const currentSectionDescription = computed(() => {
  const current = menuItems.value.find(item => item.to === route.path)
  return current?.description || ''
})

// Cerrar menú al cambiar de ruta
const closeMenu = () => {
  mobileMenuOpen.value = false
}
onMounted(()=>{
    if(user.value == null){
        router.push('/login')
    }
    if(user.value){
        userName.value = user.value.name ?? 'No user'
    }
})
</script>

<style scoped>
/* Shimmer Effect */
.shimmer-effect {
  position: relative;
  overflow: hidden;
}

.shimmer-effect::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: translateX(-100%);
  animation: shimmer 2s infinite;
}
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Mobile Menu Animations */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Scrollbar para el menú mobile */
.mobile-menu-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
}

.mobile-menu-scroll::-webkit-scrollbar {
  width: 4px;
}

.mobile-menu-scroll::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>