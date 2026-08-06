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
        <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-high p-1 transition-transform duration-300 group-hover:scale-105">
          <img 
            class="w-full h-full rounded-full object-cover" 
            alt="User profile" 
            :src="userData.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userData.name) + '&background=b8000b&color=fff&size=128'" 
          />
        </div>
        <button class="absolute bottom-0 right-0 bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform hover:scale-110">
          <span class="material-symbols-outlined text-[20px]">edit</span>
        </button>
      </div>

      <!-- Información -->
      <div class="w-full max-w-md space-y-4">
        <div class="glass-panel p-4 rounded-2xl">
          <label class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Nombre</label>
          <p class="text-lg font-bold text-on-surface">{{ userData.name }}</p>
        </div>

        <div class="glass-panel p-4 rounded-2xl">
          <label class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Email</label>
          <p class="text-lg font-bold text-on-surface">{{ userData.email }}</p>
        </div>

        <div class="glass-panel p-4 rounded-2xl">
          <label class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Nivel</label>
          <p class="text-lg font-bold text-on-surface">{{ userData.level || 'Cinéfilo Nivel 1' }}</p>
        </div>

        <div class="glass-panel p-4 rounded-2xl">
          <label class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Miembro desde</label>
          <p class="text-lg font-bold text-on-surface">{{ userData.memberSince || '2026' }}</p>
        </div>

        <button 
          class="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 active:scale-95 transition-all"
          @click="handleEditProfile"
        >
          Editar Perfil
        </button>

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
import { ref, onMounted } from 'vue'
import { useAuth } from '../../composable/useAuth'

const { user, logout } = useAuth()

const userData = ref({
  name: '',
  email: '',
  level: '',
  memberSince: '',
  avatar: ''
})

const handleEditProfile = () => {
  console.log('Editar perfil')
}

const handleLogout = () => {
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    logout()
  }
}

onMounted(() => {
  if (user.value) {
    userData.value = {
      name: user.value.name || 'Usuario',
      email: user.value.email || '',
      level: user.value.level_label || 'Cinéfilo Nivel 1',
      memberSince: user.value.member_since || '2026',
      avatar: user.value.avatar_url || null
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