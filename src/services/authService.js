import axios from 'axios'

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
const TOKEN_KEY = 'taskflow_token'
const USER_KEY = 'taskflow_user'

const authClient = axios.create({
  baseURL: BASE_URL,
})

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setStoredUser(user) {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
  else localStorage.removeItem(USER_KEY)
}

export async function login({ email, password }) {
  const { data } = await authClient.post('/auth/login', { email, password })
  const token = data.token ?? data.accessToken
  if (!token) {
    throw new Error('No token received from server')
  }
  const user =
    data.user ?? { email: data.email ?? email, name: data.name }
  return { token, user }
}

export async function register({ name, email, password }) {
  const { data } = await authClient.post('/auth/register', {
    name,
    email,
    password,
  })
  const token = data.token ?? data.accessToken
  if (!token) {
    throw new Error('No token received from server')
  }
  const user =
    data.user ?? { email: data.email ?? email, name: data.name ?? name }
  return { token, user }
}

export function logout() {
  setToken(null)
  setStoredUser(null)
}
