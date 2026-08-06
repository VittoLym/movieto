<template>
  <div class="max-h-min flex items-center justify-center bg-background px-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-primary tracking-tighter">MoVi(e)tto</h1>
        <p class="text-on-surface-variant mt-2">Crea tu cuenta gratis</p>
      </div>

      <!-- Formulario -->
      <div class="bg-surface-container-low rounded-2xl p-8 shadow-lg border border-outline-variant/20">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Nombre -->
          <div>
            <label class="block text-sm font-medium text-on-surface-variant mb-2">Nombre</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              placeholder="Tu nombre"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-on-surface-variant mb-2">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              placeholder="tu@email.com"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-on-surface-variant mb-2">Contraseña</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                minlength="6"
                class="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none pr-12"
                placeholder="Mínimo 6 caracteres"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                @click="showPassword = !showPassword"
              >
                <span class="material-symbols-outlined">
                  {{ showPassword ? 'visibility_off' : 'visibility' }}
                </span>
              </button>
            </div>
          </div>

          <!-- Password Strength (opcional) -->
          <div v-if="form.password.length > 0" class="space-y-1">
            <div class="flex gap-1">
              <div 
                v-for="i in 4" 
                :key="i"
                class="h-1 flex-1 rounded-full"
                :class="i <= passwordStrength ? 'bg-primary' : 'bg-surface-container-highest'"
              ></div>
            </div>
            <p class="text-xs text-on-surface-variant">
              {{ passwordStrengthText }}
            </p>
          </div>

          <!-- Error -->
          <div v-if="error" class="p-3 rounded-xl bg-error/10 border border-error/20 text-error text-sm">
            {{ error }}
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 px-4 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <span class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              Creando cuenta...
            </span>
            <span v-else>Crear Cuenta</span>
          </button>
        </form>

        <!-- Login -->
        <p class="text-center text-sm text-on-surface-variant mt-6">
          ¿Ya tienes cuenta?
          <router-link to="/login" class="text-primary font-bold hover:underline">
            Inicia Sesión
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composable/useAuth'

const router = useRouter()
const { register } = useAuth()

const form = ref({
  name: '',
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

// Password strength
const passwordStrength = computed(() => {
  const pwd = form.value.password
  if (!pwd) return 0
  let score = 0
  if (pwd.length >= 6) score++
  if (pwd.length >= 10) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  return Math.min(score, 4)
})

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  if (strength === 0) return 'Contraseña requerida'
  if (strength <= 1) return 'Débil'
  if (strength <= 2) return 'Media'
  if (strength <= 3) return 'Fuerte'
  return 'Muy fuerte'
})

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const result = await register(form.value)
    if (result.success) {
      router.push('/')
    } else {
      error.value = result.error || 'Error al crear la cuenta'
    }
  } catch (err) {
    error.value = err.message || 'Error al crear la cuenta'
  } finally {
    loading.value = false
  }
}
</script>