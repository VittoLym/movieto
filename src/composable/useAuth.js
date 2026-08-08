import { ref, computed } from 'vue'
import { auth, getToken, setToken, removeToken } from '../services/api'
import { useRouter } from 'vue-router'

const user = ref(null)
const isAuthenticated = computed(() => !!user.value)

export function useAuth() {
  const router = useRouter()

  // Cargar usuario desde el token guardado
  const loadUserFromToken = async () => {
    const token = getToken()
    if (!token) return null
    
    try {
      // Aquí podrías hacer un fetch a /users/me
      // Por ahora usamos el usuario guardado en localStorage
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        user.value = JSON.parse(savedUser)
        return user.value
      }
    } catch (error) {
      console.error('Error loading user:', error)
      removeToken()
      localStorage.removeItem('user')
    }
    return null
  }

  // Registrar
  const register = async (userData) => {
    try {
      const response = await auth.register(userData)
      const { token, user: userDataResponse } = response
      
      setToken(token, userData.rememberMe || false)
      user.value = userDataResponse
      localStorage.setItem('user', JSON.stringify(userDataResponse))
      
      return { success: true, user: userDataResponse }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Iniciar sesión
  const login = async (credentials) => {
    try {
      const response = await auth.login(credentials)
      const { token, user: userDataResponse } = response
      
      setToken(token, credentials.rememberMe || false)
      user.value = userDataResponse
      console.log(user.value)
      localStorage.setItem('user', JSON.stringify(userDataResponse))
      
      return { success: true, user: userDataResponse }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Cerrar sesión
  const logout = () => {
    removeToken()
    localStorage.removeItem('user')
    user.value = null
    router.push('/login')
  }

  // Actualizar usuario
  const updateUser = (updatedData) => {
    user.value = { ...user.value, ...updatedData }
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  // Cargar usuario al iniciar
  loadUserFromToken()

  return {
    user,
    isAuthenticated,
    register,
    login,
    logout,
    updateUser,
    loadUserFromToken
  }
}