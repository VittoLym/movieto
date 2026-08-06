<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="border-b border-surface-variant pb-6">
      <h1 class="font-display-lg-mobile text-3xl md:text-4xl text-on-surface">Servicios de Streaming</h1>
      <p class="font-body-lg text-on-surface-variant text-[16px] mt-2">Gestiona tus plataformas conectadas y sincroniza tus listas.</p>
    </div>

    <!-- Connected Services Grid (Desktop) -->
    <div class="hidden md:block space-y-6">
      <div class="flex justify-between items-center">
        <h3 class="font-headline-md text-[20px] text-on-surface">Servicios Conectados</h3>
        <button class="px-5 py-2.5 bg-primary text-white rounded-lg font-medium text-[14px] hover:bg-primary/90 active:scale-95 transition-all duration-200">
          Agregar Servicio
        </button>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div 
          v-for="service in desktopServices" 
          :key="service.name"
          class="p-5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg flex items-center justify-between group hover:border-outline-variant hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
        >
          <div class="flex items-center gap-4">
            <div 
              class="w-12 h-12 flex items-center justify-center rounded-md border border-surface-variant p-2 shrink-0"
              :class="service.connected ? 'bg-white' : 'bg-surface-container-low opacity-70'"
            >
              <img 
                class="w-full h-full object-contain" 
                :class="!service.connected ? 'mix-blend-multiply' : ''"
                :alt="service.name" 
                :src="service.logo" 
              />
            </div>
            <div>
              <h4 class="font-semibold text-[16px] text-on-surface">{{ service.name }}</h4>
              <div class="flex items-center gap-2 mt-0.5">
                <span 
                  class="w-2 h-2 rounded-full"
                  :class="service.connected ? 'bg-green-500' : 'bg-surface-variant'"
                ></span>
                <span class="text-[13px] text-on-surface-variant">{{ service.status }}</span>
              </div>
            </div>
          </div>
          <button 
            class="px-4 py-1.5 text-[13px] font-semibold rounded-md transition-all duration-200"
            :class="service.connected 
              ? 'text-on-surface-variant border border-surface-variant hover:text-error hover:border-error/30 hover:bg-error/5 active:scale-95' 
              : 'text-on-surface bg-surface-container-low border border-surface-variant hover:bg-surface-variant active:scale-95'"
            @click="toggleDesktopService(service)"
          >
            {{ service.connected ? 'Desconectar' : 'Conectar' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile: Mis Servicios -->
    <div class="md:hidden">
      <h3 class="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2 font-bold">
        <span class="material-symbols-outlined text-primary">subscriptions</span>
        Mis Servicios
      </h3>
      <div class="grid grid-cols-4 gap-4">
        <div 
          v-for="service in mobileServices" 
          :key="service.name"
          class="aspect-square glass-panel rounded-2xl p-3 flex flex-col items-center justify-center gap-2 group cursor-pointer card-hover relative"
          :class="service.active ? 'border-primary/20 bg-primary/5' : 'hover:border-primary/30'"
          @click="toggleMobileService(service)"
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
    </div>

    <!-- Data & Syncing List -->
    <div class="space-y-4">
      <h3 class="font-headline-md text-[20px] text-on-surface">Datos y Sincronización</h3>
      <div class="border border-outline-variant/60 rounded-lg bg-surface-container-lowest overflow-hidden">
        <div 
          v-for="sync in syncPreferences" 
          :key="sync.title"
          class="p-5 flex items-center justify-between"
          :class="sync !== syncPreferences[syncPreferences.length - 1] ? 'border-b border-surface-variant' : ''"
        >
          <div class="flex items-start gap-4">
            <div class="mt-0.5 text-on-surface-variant">
              <span class="material-symbols-outlined text-[20px]">{{ sync.icon }}</span>
            </div>
            <div>
              <h5 class="font-semibold text-[15px] text-on-surface">{{ sync.title }}</h5>
              <p class="text-[14px] text-secondary mt-0.5">{{ sync.description }}</p>
            </div>
          </div>
          <div 
            class="w-11 h-6 rounded-full relative cursor-pointer shadow-inner shrink-0 transition-colors duration-300"
            :class="sync.enabled ? 'bg-primary' : 'bg-surface-container-highest'"
            @click="toggleSync(sync)"
          >
            <div 
              class="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              :class="sync.enabled ? 'right-1' : 'left-1'"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Warning Area -->
    <div class="p-4 bg-error-container/20 border-l-4 border-error rounded-r-lg flex items-start gap-3">
      <span class="material-symbols-outlined text-error text-[20px] mt-0.5">info</span>
      <div>
        <h6 class="font-semibold text-[14px] text-on-surface">Seguridad de la Cuenta</h6>
        <p class="text-[13px] text-on-surface-variant mt-1 leading-relaxed">
          Desconectar un servicio dejará de sincronizar tu actividad con esa plataforma. Esta acción se puede deshacer en cualquier momento.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Desktop Services
const desktopServices = ref([
  { 
    name: 'Netflix', 
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCkbVtcOtxncoDwttVj0NLq3u0kdX944jUaIy2cTYu8ZBcJWguUchkKJFneUDeLPz38lxicgRGfhGImi4beBrEnBUJdmOimleAkPaKdQb4K6s_ETCPAY6squQyuy8NsrxYnowbsGPo_NcIjqRBwgOMQwdr8AQneR-YS-4FQx9V1dr7TxyaRRGq3XGMGDOEBe7QLXPt3StjSC4f-FoY7S6-ldowH9g4deKf8wKLA4PxJPtZShM2xsl0',
    connected: true,
    status: 'Conectado · hace 2h'
  },
  { 
    name: 'HBO Max', 
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4z7ipgZP7VCIBzJ-VGrlgi3SN-a3Ps6xBpThonAjQNSTUCg0IUz9SD5R2k7TU-1gB1Zfm99mm0MUxnvPb4AP9eupKsE4BL6VZlt5HJOr5lHkgtIyOxRJYfqmTcG8y7DVSqjz5G9RQ2W_c9UCsVP_SvLUlSXHNqkp7rWAyPmsv3dKID77FYQUm8YouLSVizFqVUBvusNC0ExaoAOhORx9g_zeaae-smavDarPybaETjIF5L-BJQ2J2',
    connected: true,
    status: 'Conectado · ayer'
  },
  { 
    name: 'Prime Video', 
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJf05JsDjUcDxqoinuPrFB-4fkmWANpungpnaR2w_yMxGkf_h0JLSaxKQlAze1P0DLB-OJ0yjgeAJog-WTUvAifn1dRbgKR6EdolkO73X3FFGljmOgwQDH6c0T0MBhEKY4hc2gXBws6CiGV75xiti02vs_50lRb03qZqghrvRjRYF-BQHHU3Lap5Xl9tTI9jzVqaDrx6sYuLHzbqxnDh9OMdrJMAcQaxkcDZtdbtR_IiTZnTm90st4',
    connected: true,
    status: 'Conectado · hace 3 días'
  },
  { 
    name: 'Disney+', 
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgZPM5Mh--h9mMLNEHOigcuaT0WJhxnr1qLSCvnhksBFLD84bAfMu7W_hE4pin_iAbtg3z1TUSFHKVUDC0s5vcOcG5QwroLQfOgi-uHCx6AWI_YXDs5nVNolowPin-Jc7Kq9zXZDgUFgaPLySLebQzXdpjx_uN_Cp82bJ6abTo2bJVoZx9PrvSK1FCQ6_dtYPAdsGd92HMV5pbF2e3ehUaLG74USiOBTL961yAVfhRk4s-BV8ra30t',
    connected: false,
    status: 'No conectado'
  },
  { 
    name: 'Apple TV+', 
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWsgMJ-NkA46Vlx5c2450TLZFISkuAtY8onh_JSpoHgG1D9DJfle4rwKggzb2TNT9HTMwrSmpEewJ8YknaVQvA6ZdQYa_irNtLfM8c0jtXp1ajIRmblUhs5x_UL3kOTryEt0u0iEKIKykOiI31tRHTKrGk-lqKSCyV_Bap82RUPcw23ZwnPgudbINiGfcU1UMsTL_HrWrrUGV5XDwso8lwiQLdRvXCBjRvCz6HSKubr6FOsgdlgiTE',
    connected: false,
    status: 'No conectado'
  },
  { 
    name: 'Hulu', 
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFc8XWgl9hjHPGoA-9MYbr5cQ_zycl74kZWbpF2BzeKKi57nFZT8vMuzCdfXpIrZnl5FwCsI_gfqbU0FUGLJ0q5q40v1akhvRvB8HEobn6IgUkWgAystVP9ztMsq0ch8W1iUxD4uo_ahDmIYtGRVRm2c9zWJojpXdO6RhCmFPRCt8z4IyjyVg32Mst6vMFK3VhWkG2VcxlDGIrpNOggI-VAkbj_IYOr-gIxsHjDld--bLjHXh5XtK9',
    connected: false,
    status: 'No conectado'
  }
])

// Mobile Services
const mobileServices = ref([
  { name: 'Netflix', icon: 'N', color: '#E50914', active: true },
  { name: 'HBO Max', icon: 'H', color: '#002be7', active: false },
  { name: 'Disney+', icon: 'D+', color: '#0063e5', active: true },
  { name: 'Prime', icon: 'P', color: '#ff9900', active: false }
])

// Sync Preferences
const syncPreferences = ref([
  {
    title: 'Sincronización Automática de Biblioteca',
    icon: 'sync',
    description: 'Actualiza automáticamente tu biblioteca cuando agregues contenido a tus servicios conectados.',
    enabled: true
  },
  {
    title: 'Sincronización de Historial',
    icon: 'history',
    description: 'Mantén tu lista "Continuar viendo" actualizada en todos tus dispositivos.',
    enabled: false
  }
])

// Methods
const toggleDesktopService = (service) => {
  service.connected = !service.connected
  service.status = service.connected ? 'Conectado · ahora' : 'No conectado'
}

const toggleMobileService = (service) => {
  service.active = !service.active
}

const toggleSync = (sync) => {
  sync.enabled = !sync.enabled
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
</style>