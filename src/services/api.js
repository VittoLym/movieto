const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

// Helper para manejar respuestas
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || error.message || `Error ${response.status}`)
  }
  return response.json()
}

// ============================================
// AUTH
// ============================================

export const auth = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    return handleResponse(response)
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    return handleResponse(response)
  }
}

// ============================================
// TOKEN HELPERS
// ============================================

export const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token') || null
}

export const setToken = (token, remember = false) => {
  if (remember) {
    localStorage.setItem('token', token)
  } else {
    sessionStorage.setItem('token', token)
  }
}

export const removeToken = () => {
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
}

export const getAuthHeaders = () => {
  const token = getToken()
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

// ============================================
// USER
// ============================================

export const user = {
  getCurrent: async () => {
    const response = await fetch(`${API_BASE}/users/me`, {
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },

  update: async (data) => {
    const response = await fetch(`${API_BASE}/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(data)
    })
    return handleResponse(response)
  }
}