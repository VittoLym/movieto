<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="border-b border-surface-variant pb-6">
      <h1 class="font-display-lg-mobile text-3xl md:text-4xl text-on-surface">Cuenta</h1>
      <p class="font-body-lg text-on-surface-variant text-[16px] mt-2">Gestiona tu correo, contraseña y región.</p>
    </div>

    <div v-if="loading" class="text-on-surface-variant text-sm">Cargando...</div>

    <div v-else class="space-y-4 max-w-md">
      <!-- Email -->
      <div class="glass-panel p-4 rounded-2xl">
        <div v-if="editingField !== 'email'" class="flex items-center justify-between">
          <div>
            <label class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Correo electrónico</label>
            <p class="text-lg font-bold text-on-surface">{{ account.email }}</p>
          </div>
          <button class="text-primary text-sm font-bold hover:underline" @click="startEdit('email')">Cambiar</button>
        </div>
        <div v-else class="space-y-3">
          <label class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Nuevo correo</label>
          <input v-model="emailForm.newEmail" type="email" class="w-full px-3 py-2 rounded-xl bg-slate-100 outline-none" placeholder="nuevo@email.com" />
          <input v-model="emailForm.currentPassword" type="password" class="w-full px-3 py-2 rounded-xl bg-slate-100 outline-none" placeholder="Confirmá tu contraseña actual" />
          <p v-if="fieldError" class="text-error text-sm">{{ fieldError }}</p>
          <div class="flex gap-2">
            <button class="flex-1 bg-primary text-white py-2 rounded-xl font-bold disabled:opacity-60" :disabled="saving" @click="submitEmail">
              {{ saving ? 'Guardando...' : 'Guardar' }}
            </button>
            <button class="px-4 py-2 rounded-xl bg-surface-container-highest font-bold" @click="cancelEdit">Cancelar</button>
          </div>
        </div>
      </div>

      <!-- Password -->
      <div class="glass-panel p-4 rounded-2xl">
        <div v-if="editingField !== 'password'" class="flex items-center justify-between">
          <div>
            <label class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Contraseña</label>
            <p class="text-lg font-bold text-on-surface">••••••••</p>
          </div>
          <button class="text-primary text-sm font-bold hover:underline" @click="startEdit('password')">Cambiar</button>
        </div>
        <div v-else class="space-y-3">
          <input v-model="passwordForm.currentPassword" type="password" class="w-full px-3 py-2 rounded-xl bg-slate-100 outline-none" placeholder="Contraseña actual" />
          <input v-model="passwordForm.newPassword" type="password" class="w-full px-3 py-2 rounded-xl bg-slate-100 outline-none" placeholder="Nueva contraseña (mín. 8 caracteres)" />
          <input v-model="passwordForm.confirmPassword" type="password" class="w-full px-3 py-2 rounded-xl bg-slate-100 outline-none" placeholder="Repetí la nueva contraseña" />
          <p v-if="fieldError" class="text-error text-sm">{{ fieldError }}</p>
          <div class="flex gap-2">
            <button class="flex-1 bg-primary text-white py-2 rounded-xl font-bold disabled:opacity-60" :disabled="saving" @click="submitPassword">
              {{ saving ? 'Guardando...' : 'Guardar' }}
            </button>
            <button class="px-4 py-2 rounded-xl bg-surface-container-highest font-bold" @click="cancelEdit">Cancelar</button>
          </div>
        </div>
      </div>

      <!-- Región -->
      <div class="glass-panel p-4 rounded-2xl">
        <div v-if="editingField !== 'region'" class="flex items-center justify-between">
          <div>
            <label class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Región</label>
            <p class="text-lg font-bold text-on-surface">{{ account.region }}</p>
          </div>
          <button class="text-primary text-sm font-bold hover:underline" @click="startEdit('region')">Cambiar</button>
        </div>
        <div v-else class="space-y-3">
          <select v-model="regionForm.region" class="w-full px-3 py-2 rounded-xl bg-slate-100 outline-none">
            <option v-for="r in availableRegions" :key="r" :value="r">{{ r }}</option>
          </select>
          <p v-if="fieldError" class="text-error text-sm">{{ fieldError }}</p>
          <div class="flex gap-2">
            <button class="flex-1 bg-primary text-white py-2 rounded-xl font-bold disabled:opacity-60" :disabled="saving" @click="submitRegion">
              {{ saving ? 'Guardando...' : 'Guardar' }}
            </button>
            <button class="px-4 py-2 rounded-xl bg-surface-container-highest font-bold" @click="cancelEdit">Cancelar</button>
          </div>
        </div>
      </div>

      <!-- Delete account -->
      <div v-if="editingField !== 'delete'">
        <button class="w-full bg-error/10 text-error py-3 rounded-xl font-bold hover:bg-error/20 active:scale-95 transition-all" @click="startEdit('delete')">
          Eliminar Cuenta
        </button>
      </div>
      <div v-else class="glass-panel p-4 rounded-2xl border border-error/30 space-y-3">
        <p class="text-sm text-on-surface font-bold">Esto es permanente. Se van a borrar tus reseñas, preferencias y datos de la cuenta.</p>
        <input v-model="deleteForm.currentPassword" type="password" class="w-full px-3 py-2 rounded-xl bg-slate-100 outline-none" placeholder="Confirmá tu contraseña para continuar" />
        <p v-if="fieldError" class="text-error text-sm">{{ fieldError }}</p>
        <div class="flex gap-2">
          <button class="flex-1 bg-error text-white py-2 rounded-xl font-bold disabled:opacity-60" :disabled="saving" @click="submitDelete">
            {{ saving ? 'Eliminando...' : 'Sí, eliminar mi cuenta' }}
          </button>
          <button class="px-4 py-2 rounded-xl bg-surface-container-highest font-bold" @click="cancelEdit">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../../composable/useAuth'
import { getToken } from '../../services/api'

const { user, logout, updateUser } = useAuth()
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

const availableRegions = ['Argentina', 'México', 'España', 'Chile', 'Colombia', 'Estados Unidos', 'Otro']

const account = ref({ email: '', region: 'Argentina' })
const loading = ref(true)

const editingField = ref(null) // 'email' | 'password' | 'region' | 'delete' | null
const saving = ref(false)
const fieldError = ref(null)

const emailForm = ref({ newEmail: '', currentPassword: '' })
const passwordForm = ref({ currentPassword: '', newPassword: '', confirmPassword: '' })
const regionForm = ref({ region: 'Argentina' })
const deleteForm = ref({ currentPassword: '' })

function startEdit(field) {
  fieldError.value = null
  editingField.value = field
  if (field === 'email') emailForm.value = { newEmail: '', currentPassword: '' }
  if (field === 'password') passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
  if (field === 'region') regionForm.value = { region: account.value.region }
  if (field === 'delete') deleteForm.value = { currentPassword: '' }
}

function cancelEdit() {
  editingField.value = null
  fieldError.value = null
}

async function fetchAccount() {
  loading.value = true
  try {
    const token = getToken()
    const res = await fetch(`${API_BASE}/users/me`, { headers: { Authorization: `Bearer ${token}` } })
    if (!res.ok) throw new Error(`Error ${res.status}`)
    const data = await res.json()
    account.value = { email: data.email, region: data.region || 'Argentina' }
  } catch (err) {
    fieldError.value = err.message
  } finally {
    loading.value = false
  }
}

async function submitEmail() {
  fieldError.value = null
  if (!emailForm.value.newEmail || !emailForm.value.currentPassword) {
    fieldError.value = 'Completá ambos campos.'
    return
  }
  saving.value = true
  try {
    const token = getToken()
    const res = await fetch(`${API_BASE}/users/me/email`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(emailForm.value),
    })
    const body = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(body.error || `Error ${res.status}`)
    account.value.email = body.email
    updateUser({ email: body.email })
    editingField.value = null
  } catch (err) {
    fieldError.value = err.message
  } finally {
    saving.value = false
  }
}

async function submitPassword() {
  fieldError.value = null
  const { currentPassword, newPassword, confirmPassword } = passwordForm.value
  if (!currentPassword || !newPassword) {
    fieldError.value = 'Completá todos los campos.'
    return
  }
  if (newPassword !== confirmPassword) {
    fieldError.value = 'Las contraseñas nuevas no coinciden.'
    return
  }
  if (newPassword.length < 8) {
    fieldError.value = 'La nueva contraseña debe tener al menos 8 caracteres.'
    return
  }
  saving.value = true
  try {
    const token = getToken()
    const res = await fetch(`${API_BASE}/users/me/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ currentPassword, newPassword }),
    })
    const body = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(body.error || `Error ${res.status}`)
    editingField.value = null
  } catch (err) {
    fieldError.value = err.message
  } finally {
    saving.value = false
  }
}

async function submitRegion() {
  fieldError.value = null
  saving.value = true
  try {
    const token = getToken()
    const res = await fetch(`${API_BASE}/users/me`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ region: regionForm.value.region }),
    })
    const body = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(body.error || `Error ${res.status}`)
    account.value.region = body.region
    editingField.value = null
  } catch (err) {
    fieldError.value = err.message
  } finally {
    saving.value = false
  }
}

async function submitDelete() {
  fieldError.value = null
  if (!deleteForm.value.currentPassword) {
    fieldError.value = 'Ingresá tu contraseña para confirmar.'
    return
  }
  saving.value = true
  try {
    const token = getToken()
    const res = await fetch(`${API_BASE}/users/me`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(deleteForm.value),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || `Error ${res.status}`)
    }
    logout() // borra token/user local y redirige a /login
  } catch (err) {
    fieldError.value = err.message
  } finally {
    saving.value = false
  }
}

onMounted(fetchAccount)
</script>

<style scoped>
.glass-panel {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>