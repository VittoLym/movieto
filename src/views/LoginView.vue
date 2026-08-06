<template>
  <div class="overflow-hidden flex items-center justify-center bg-background px-4">
    <div class="max-h-min w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-primary tracking-tighter">MoVi(e)tto</h1>
        <p class="text-on-surface-variant mt-2">Inicia sesión para continuar</p>
      </div>

      <!-- Formulario -->
      <div class="bg-surface-container-low rounded-2xl p-8 shadow-lg border border-outline-variant/20">
        <form @submit.prevent="handleLogin" class="space-y-6">
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
                class="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none pr-12"
                placeholder="••••••••"
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

          <!-- Remember Me -->
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer">
              <input
                v-model="form.rememberMe"
                type="checkbox"
                class="w-4 h-4 rounded border-outline-variant/30 text-primary focus:ring-primary/20"
              />
              Recordarme
            </label>
            <a href="#" class="text-sm text-primary hover:underline">¿Olvidaste tu contraseña?</a>
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
              Cargando...
            </span>
            <span v-else>Iniciar Sesión</span>
          </button>
        </form>

        <!-- Registro -->
        <p class="text-center text-sm text-on-surface-variant mt-6">
          ¿No tienes cuenta?
          <router-link to="/register" class="text-primary font-bold hover:underline">
            Regístrate
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composable/useAuth'

const router = useRouter()
const { login } = useAuth()

const form = ref({
  email: '',
  password: '',
  rememberMe: false
})

const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const result = await login(form.value)
    if (result.success) {
      router.push('/')
    } else {
      error.value = result.error || 'Error al iniciar sesión'
    }
  } catch (err) {
    error.value = err.message || 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}
</script>