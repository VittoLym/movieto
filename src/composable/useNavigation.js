import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Items de navegación (compartidos entre desktop y mobile)
const navItems = ref([
  { name: 'home', label: 'Home', icon: 'home', url: '/', active: false },
  { name: 'discover', label: 'Discover', icon: 'auto_awesome', url: '/recommendation', active: false },
  { name: 'library', label: 'Library', icon: 'layers', url: '/library', active: false },
  { name: 'settings', label: 'Settings', icon: 'settings', url: '/settings', active: false }
])

export function useNavigation() {
  const route = useRoute()
  const router = useRouter()

  // Función para actualizar el item activo basado en la URL actual
  const updateActiveFromRoute = () => {
    const currentPath = route.path
    navItems.value.forEach(item => {
      item.active = item.url === currentPath
    })
  }

  // Función para setear activo manualmente
  const setActive = (name) => {
    navItems.value.forEach(item => {
      item.active = item.name === name
    })
  }

  // Función para navegar
  const navigateTo = (url, name) => {
    setActive(name)
    router.push(url)
  }

  // Computed para obtener el item activo
  const activeItem = computed(() => {
    return navItems.value.find(item => item.active) || navItems.value[0]
  })

  // Inicializar basado en la ruta actual
  updateActiveFromRoute()

  // Watcher para cambios de ruta
  watch(() => route.path, () => {
    updateActiveFromRoute()
  })

  return {
    navItems,
    activeItem,
    setActive,
    navigateTo,
    updateActiveFromRoute
  }
}