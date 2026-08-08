<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="border-b border-surface-variant pb-6">
      <h1 class="font-display-lg-mobile text-3xl md:text-4xl text-on-surface">Géneros Favoritos</h1>
      <p class="font-body-lg text-on-surface-variant text-[16px] mt-2">Selecciona tus géneros preferidos para mejorar las recomendaciones.</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-on-surface-variant text-sm">Cargando tus géneros...</div>

    <!-- Error -->
    <div v-else-if="loadError" class="p-4 bg-error/5 rounded-2xl border border-error/20 text-error text-sm">
      No pudimos cargar tus géneros: {{ loadError }}
      <button class="ml-2 underline font-bold" @click="fetchGenres">Reintentar</button>
    </div>

    <!-- Content -->
    <template v-else>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="genre in genres"
          :key="genre.name"
          class="glass-panel px-4 py-2 rounded-full font-label-md transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          :class="genre.active ? 'text-primary border-primary bg-primary/5' : 'text-on-surface-variant hover:text-primary hover:border-primary'"
          :disabled="genre.saving"
          @click="toggleGenre(genre)"
        >
          {{ genre.name }}
        </button>
      </div>

      <p v-if="toggleError" class="text-error text-sm mt-3">{{ toggleError }}</p>

      <div
        class="mt-6 p-4 rounded-2xl border"
        :class="activeCount >= 3 ? 'bg-primary/5 border-primary/20' : 'bg-error/5 border-error/20'"
      >
        <p class="text-sm text-on-surface-variant">
          <span class="font-bold" :class="activeCount >= 3 ? 'text-primary' : 'text-error'">
            {{ activeCount >= 3 ? '¡Listo!' : 'Tip:' }}
          </span>
          {{
            activeCount >= 3
              ? `Tenés ${activeCount} géneros activos, suficientes para recomendaciones personalizadas.`
              : `Seleccioná al menos 3 géneros (tenés ${activeCount}) para obtener mejores recomendaciones personalizadas.`
          }}
        </p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getToken } from '../../services/api'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

const genres = ref([])
const loading = ref(true)
const loadError = ref(null)
const toggleError = ref(null)

const activeCount = computed(() => genres.value.filter((g) => g.active).length)

async function fetchGenres() {
  loading.value = true
  loadError.value = null
  try {
    const token = getToken()
    const res = await fetch(`${API_BASE}/users/me/genres`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || `Error ${res.status}`)
    }
    const data = await res.json() // [{ name, active }]
    genres.value = data.map((g) => ({ ...g, saving: false }))
  } catch (err) {
    loadError.value = err.message
  } finally {
    loading.value = false
  }
}

// Toggle optimista: cambia en pantalla al instante, y si el PUT falla,
// revierte solo ese género y muestra el error — no bloquea al usuario
// esperando la respuesta del server para ver el cambio.
async function toggleGenre(genre) {
  toggleError.value = null
  const previous = genre.active
  genre.active = !genre.active
  genre.saving = true

  try {
    const token = getToken()
    const res = await fetch(`${API_BASE}/users/me/genres/${encodeURIComponent(genre.name)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ active: genre.active }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || `Error ${res.status}`)
    }
  } catch (err) {
    genre.active = previous // rollback
    toggleError.value = `No se pudo actualizar "${genre.name}": ${err.message}`
  } finally {
    genre.saving = false
  }
}

onMounted(fetchGenres)
</script>

<style scoped>
.glass-panel {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>