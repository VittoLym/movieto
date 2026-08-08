<template>
  <div class="space-y-8">
    <!-- Header Desktop -->
    <div class="hidden md:block border-b border-surface-variant pb-6">
      <h1 class="font-display-lg-mobile text-3xl md:text-4xl text-on-surface">Perfil</h1>
      <p class="font-body-lg text-on-surface-variant text-[16px] mt-2">Tu información personal y preferencias de cuenta.</p>
    </div>

    <!-- Content -->
    <div class="flex flex-col items-center md:items-start">
      <!-- Avatar -->
      <div class="relative inline-block mb-6 group cursor-pointer">
        <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-high p-1 transition-transform duration-300">
          <img
            class="w-full h-full rounded-full object-cover"
            alt="User profile"
            :src="avatarPreview || fallbackAvatarUrl"
          />
        </div>
        <button
          v-if="isEditing"
          class="absolute bottom-0 right-0 bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform hover:scale-110 disabled:opacity-60"
          :disabled="uploadingAvatar"
          @click="fileInput.click()"
        >
          <span class="material-symbols-outlined text-[20px]">
            {{ uploadingAvatar ? 'hourglass_empty' : 'edit' }}
          </span>
        </button>
        <input
          ref="fileInput"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          class="hidden"
          @change="onAvatarSelected"
        />
      </div>
      <p v-if="avatarError" class="text-error text-xs mb-4 -mt-4">{{ avatarError }}</p>

      <!-- Información -->
      <div class="w-full max-w-md space-y-4">
        <div class="glass-panel p-4 rounded-2xl">
          <label class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Nombre</label>
          <input
            v-if="isEditing"
            v-model="draft.name"
            class="min-w-full text-lg font-bold text-on-surface block px-1 rounded-2xl bg-slate-200 focus-visible:bg-slate-50 outline-none"
            type="text"
          />
          <p v-else class="text-lg font-bold text-on-surface">{{ userData.name }}</p>
        </div>

        <div class="glass-panel p-4 rounded-2xl">
          <label class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Email</label>
          <p class="text-lg font-bold text-on-surface">{{ userData.email }}</p>
        </div>

        <!-- Nivel: calculado por el sistema, no editable -->
        <div class="glass-panel p-4 rounded-2xl">
          <label class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Nivel</label>
          <p class="text-lg font-bold text-on-surface">{{ userData.level || 'Cinéfilo Nivel 1' }}</p>
        </div>

        <!-- Miembro desde: fecha real de alta, no editable -->
        <div class="glass-panel p-4 rounded-2xl">
          <label class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Miembro desde</label>
          <p class="text-lg font-bold text-on-surface">{{ userData.memberSince || '2026' }}</p>
        </div>

        <p v-if="editError" class="text-error text-sm">{{ editError }}</p>
        <div class="flex gap-3">
          <button
            class="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-60"
            :disabled="saving || (isEditing && !draft.name.trim())"
            @click="handleEditProfile"
          >
            {{ saving ? 'Guardando...' : isEditing ? 'Guardar' : 'Editar Perfil' }}
          </button>
          <button
            v-if="isEditing"
            class="px-6 py-3 rounded-xl font-bold bg-surface-container-highest text-on-surface-variant hover:bg-surface-variant transition-all"
            :disabled="saving"
            @click="cancelEdit"
          >
            Cancelar
          </button>
        </div>
        <button
          class="w-full bg-error/10 text-error py-3 rounded-xl font-bold hover:bg-error/20 active:scale-95 transition-all"
          @click="handleLogout"
        >
          <span class="material-symbols-outlined text-[18px] align-middle mr-2">logout</span>
          Cerrar Sesión
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composable/useAuth'
import { getToken, user as userApi } from '../../services/api'

const { user, logout, updateUser } = useAuth()
const router = useRouter()

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'
const BACKEND_ORIGIN = API_BASE.replace(/\/api\/?$/, '')
const userData = ref({
  name: '',
  email: '',
  level: '',
  memberSince: '',
})

// Preview local (blob) mientras se sube, o la URL absoluta real una vez que
// el backend confirma. Separado de userData para no pisar nada si falla el upload.
const avatarPreview = ref(null)
const fileInput = ref(null)
const uploadingAvatar = ref(false)
const avatarError = ref(null)
const isEditing = ref(false)
const saving = ref(false)
const editError = ref(null)
const draft = ref({ name: '' })

// Fallback: avatar real del usuario (absoluto) o un avatar generado con sus iniciales
const fallbackAvatarUrl = computed(() => {
  if (user.value?.avatar_url) {
    return user.value.avatar_url.startsWith('http') ? user.value.avatar : `${BACKEND_ORIGIN}${user.value.avatar_url}`
  }
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.value?.name || 'U')}&background=b8000b&color=fff&size=128`
})

async function onAvatarSelected(e) {
  const file = e.target.files[0]
  if (!file) return

  avatarError.value = null
  avatarPreview.value = URL.createObjectURL(file)

  uploadingAvatar.value = true
  try {
    const token = getToken()
    const formData = new FormData()
    formData.append('avatar', file)

    const res = await fetch(`${API_BASE}/users/me/avatar`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || `Error ${res.status}`)
    }

    const data = await res.json() // { avatar: "/uploads/avatars/xxx.png" }
    updateUser({ avatar_url: data.avatar }) // se propaga solo a toda la app + localStorage
  } catch (err) {
    avatarError.value = err.message
    avatarPreview.value = null
  } finally {
    uploadingAvatar.value = false
  }
}

function startEdit() {
  draft.value = { name: userData.value.name } // copia aparte, no toca userData hasta confirmar
  editError.value = null
  isEditing.value = true
}

function cancelEdit() {
  isEditing.value = false
  editError.value = null
}

async function saveProfile() {
  editError.value = null
  saving.value = true
  try {
    const token = getToken()
    const res = await fetch(`${API_BASE}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: draft.value.name.trim() }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || `Error ${res.status}`)
    }

    const updated = await res.json() // { name, avatar, level }
    userData.value.name = updated.name
    updateUser({ name: updated.name }) // se propaga a toda la app (header, sidebar, etc.)
    isEditing.value = false
  } catch (err) {
    editError.value = err.message
  } finally {
    saving.value = false
  }
}

const handleEditProfile = () => {
  if (isEditing.value) {
    saveProfile()
  } else {
    startEdit()
  }
}

const formatDate = (date) => {
  if (!date) return null
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

const handleLogout = () => {
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    logout()
  }
}

onMounted(async () => {
  if (user.value === null) {
    router.push('/login')
    return
  }
  else{
    userData.value = {
      name: user.value.name || 'Usuario',
      email: user.value.email || '',
      level: user.value.level || 'Cinéfilo Nivel 1',
      memberSince: formatDate(user.value.member_since) || '2026',
    }
  }
})
</script>

<style scoped>
.glass-panel {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>