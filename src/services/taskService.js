import axios from 'axios'
import { getToken, logout } from './authService'

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      logout()
      if (typeof window !== 'undefined') {
        window.location.assign('/login')
      }
    }
    return Promise.reject(err)
  }
)

function normalizeTask(raw) {
  if (!raw) return null
  const id = raw.id ?? raw._id
  return {
    id: String(id),
    title: raw.title ?? '',
    completed: Boolean(raw.completed ?? raw.done),
    createdAt: raw.createdAt,
  }
}

export async function fetchTasks() {
  const { data } = await api.get('/tasks')
  const list = Array.isArray(data) ? data : data.tasks ?? data.data ?? []
  return list.map(normalizeTask).filter(Boolean)
}

export async function createTask(title) {
  const { data } = await api.post('/tasks', { title })
  return normalizeTask(data)
}

export async function updateTask(id, payload) {
  const { data } = await api.put(`/tasks/${id}`, payload)
  return normalizeTask(data)
}

export async function deleteTask(id) {
  await api.delete(`/tasks/${id}`)
}
