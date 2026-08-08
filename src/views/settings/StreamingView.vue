<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="border-b border-surface-variant pb-6">
      <h1 class="font-display-lg-mobile text-3xl md:text-4xl text-on-surface">Servicios de Streaming</h1>
      <p class="font-body-lg text-on-surface-variant text-[16px] mt-2">Gestiona tus plataformas conectadas y sincroniza tus listas.</p>
    </div>

    <!-- Loading / error de servicios -->
    <div v-if="servicesLoading" class="text-on-surface-variant text-sm">Cargando tus servicios...</div>
    <div v-else-if="servicesError" class="p-4 bg-error/5 rounded-2xl border border-error/20 text-error text-sm">
      No pudimos cargar tus servicios: {{ servicesError }}
      <button class="ml-2 underline font-bold" @click="fetchServices">Reintentar</button>
    </div>

    <template v-else>
      <!-- Connected Services Grid (Desktop) -->
      <div class="hidden md:block space-y-6">
        <div class="flex justify-between items-center">
          <h3 class="font-headline-md text-[20px] text-on-surface">Servicios Conectados</h3>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div
            v-for="service in services"
            :key="service.name"
            class="p-5 bg-surface-container-lowest border border-outline-variant/60 rounded-lg flex items-center justify-between group hover:border-outline-variant hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            :class="service.saving && 'opacity-50 pointer-events-none'"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 flex items-center justify-center rounded-md border border-surface-variant p-2 shrink-0"
                :class="service.active ? 'bg-white' : 'bg-surface-container-low opacity-70'"
              >
                <img
                  v-if="service.logo"
                  class="w-full h-full object-contain"
                  :class="!service.active && 'mix-blend-multiply'"
                  :alt="service.name"
                  :src="service.logo"
                />
                <div
                  v-else
                  class="w-full h-full rounded flex items-center justify-center font-bold text-white text-sm"
                  :style="{ backgroundColor: service.color }"
                >
                  {{ service.icon }}
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-[16px] text-on-surface">{{ service.name }}</h4>
                <div class="flex items-center gap-2 mt-0.5">
                  <span class="w-2 h-2 rounded-full" :class="service.active ? 'bg-green-500' : 'bg-surface-variant'"></span>
                  <span class="text-[13px] text-on-surface-variant">{{ statusLabel(service) }}</span>
                </div>
              </div>
            </div>
            <button
              class="px-4 py-1.5 text-[13px] font-semibold rounded-md transition-all duration-200"
              :class="service.active
                ? 'text-on-surface-variant border border-surface-variant hover:text-error hover:border-error/30 hover:bg-error/5 active:scale-95'
                : 'text-on-surface bg-surface-container-low border border-surface-variant hover:bg-surface-variant active:scale-95'"
              @click="toggleService(service)"
            >
              {{ service.active ? 'Desconectar' : 'Conectar' }}
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
            v-for="service in services"
            :key="service.name"
            class="aspect-square glass-panel rounded-2xl p-3 flex flex-col items-center justify-center gap-2 group cursor-pointer card-hover relative"
            :class="[service.active ? 'border-primary/20 bg-primary/5' : 'hover:border-primary/30', service.saving && 'opacity-50 pointer-events-none']"
            @click="toggleService(service)"
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

      <p v-if="toggleError" class="text-error text-sm">{{ toggleError }}</p>
    </template>

    <!-- Data & Syncing List -->
    <div class="space-y-4">
      <h3 class="font-headline-md text-[20px] text-on-surface">Datos y Sincronización</h3>

      <div v-if="prefsLoading" class="text-on-surface-variant text-sm">Cargando preferencias...</div>
      <div v-else class="border border-outline-variant/60 rounded-lg bg-surface-container-lowest overflow-hidden">
        <div
          v-for="(sync, idx) in syncPreferences"
          :key="sync.key"
          class="p-5 flex items-center justify-between"
          :class="idx < syncPreferences.length - 1 && 'border-b border-surface-variant'"
        >
          <div class="flex items-start gap-4">
            <div class="mt-0.5 text-on-surface-variant">
              <span class="material-symbols-outlined text-[20px]">{{ sync.icon }}</span>
            </div>
            <div>
            <div class="flex items-center gap-2">
                <h5 class="font-semibold text-[15px] text-on-surface">{{ sync.title }}</h5>
                <span
                  v-if="sync.comingSoon"
                  class="text-[10px] font-bold uppercase tracking-wide text-primary bg-primary/10 px-2 py-0.5 rounded-full"
                >
                  Próximamente
                </span>
              </div>
              <p class="text-[14px] text-secondary mt-0.5">{{ sync.description }}</p>
            </div>
          </div>
          <div
            class="w-11 h-6 rounded-full relative cursor-pointer shadow-inner shrink-0 transition-colors duration-300"
            :class="[sync.enabled ? 'bg-primary' : 'bg-surface-container-highest', sync.saving && 'opacity-50 pointer-events-none']"
            @click="toggleSync(sync)"
          >
            <div
              class="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              :class="sync.enabled ? 'right-1' : 'left-1'"
            ></div>
          </div>
        </div>
      </div>
      <p v-if="prefsError" class="text-error text-sm">{{ prefsError }}</p>
    </div>

    <!-- Warning Area -->
    <div class="p-4 bg-error-container/20 border-l-4 border-error rounded-r-lg flex items-start gap-3">
      <span class="material-symbols-outlined text-error text-[20px] mt-0.5">info</span>
      <div>
        <h6 class="font-semibold text-[14px] text-on-surface">Seguridad de la Cuenta</h6>
        <p class="text-[13px] text-on-surface-variant mt-1 leading-relaxed">
          Desconectar un servicio dejará de tenerlo en cuenta para tus recomendaciones. Esta acción se puede deshacer en cualquier momento.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getToken } from '../../services/api'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

// ---------- Servicios (fuente única, ya no dos arrays separados) ----------
const services = ref([])
const servicesLoading = ref(true)
const servicesError = ref(null)
const toggleError = ref(null)

function statusLabel(service) {
  if (!service.active) return 'No conectado'
  if (!service.connected_at) return 'Conectado'
  const days = Math.floor((Date.now() - new Date(service.connected_at)) / 86400000)
  if (days === 0) return 'Conectado hoy'
  if (days === 1) return 'Conectado ayer'
  return `Conectado hace ${days} días`
}

async function fetchServices() {
  servicesLoading.value = true
  servicesError.value = null
  try {
    const token = getToken()
    const res = await fetch(`${API_BASE}/users/me/streaming-services`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || `Error ${res.status}`)
    }
    const data = await res.json() // [{ name, icon, color, logo, active, connected_at, last_synced_at }]
    services.value = data.map((s) => ({ ...s, saving: false }))
  } catch (err) {
    servicesError.value = err.message
  } finally {
    servicesLoading.value = false
  }
}

async function toggleService(service) {
  toggleError.value = null
  const previous = { active: service.active, connected_at: service.connected_at }
  service.active = !service.active
  service.saving = true

  try {
    const token = getToken()
    const res = await fetch(`${API_BASE}/users/me/streaming-services/${encodeURIComponent(service.name)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ active: service.active }),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || `Error ${res.status}`)
    }
    if (service.active && !service.connected_at) {
      service.connected_at = new Date().toISOString()
    }
  } catch (err) {
    service.active = previous.active
    service.connected_at = previous.connected_at
    toggleError.value = `No se pudo actualizar "${service.name}": ${err.message}`
  } finally {
    service.saving = false
  }
}

// ---------- Preferencias de sincronización (users.autoSyncLibrary / watchHistorySync) ----------
const syncPreferences = ref([
  {
    key: 'autoSyncLibrary',
    title: 'Sincronización Automática de Biblioteca',
    icon: 'sync',
    description: 'Cuando esté disponible, actualizará tu biblioteca automáticamente al agregar contenido en tus servicios conectados.',
    enabled: true,
    saving: false,
    comingSoon: true,
  },
  {
    key: 'watchHistorySync',
    title: 'Sincronización de Historial',
    icon: 'history',
    description: 'Cuando esté disponible, mantendrá tu lista "Continuar viendo" actualizada en todos tus dispositivos.',
    enabled: false,
    saving: false,
    comingSoon: true,
  },
])
const prefsLoading = ref(true)
const prefsError = ref(null)

async function fetchSyncPreferences() {
  prefsLoading.value = true
  prefsError.value = null
  try {
    const token = getToken()
    const res = await fetch(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error(`Error ${res.status}`)
    const data = await res.json() // { ..., autoSyncLibrary, watchHistorySync }
    syncPreferences.value[0].enabled = data.autoSyncLibrary
    syncPreferences.value[1].enabled = data.watchHistorySync
  } catch (err) {
    prefsError.value = err.message
  } finally {
    prefsLoading.value = false
  }
}

async function toggleSync(sync) {
  prefsError.value = null
  const previous = sync.enabled
  sync.enabled = !sync.enabled
  sync.saving = true

  try {
    const token = getToken()
    const res = await fetch(`${API_BASE}/users/me`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ [sync.key]: sync.enabled }),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || `Error ${res.status}`)
    }
  } catch (err) {
    sync.enabled = previous
    prefsError.value = `No se pudo actualizar "${sync.title}": ${err.message}`
  } finally {
    sync.saving = false
  }
}

onMounted(() => {
  fetchServices()
  fetchSyncPreferences()
})
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