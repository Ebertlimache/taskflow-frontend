import { useCallback, useEffect, useState } from 'react'
import { Plus, CheckCircle2, Clock, ListTodo } from 'lucide-react'
import { TaskList } from '../components/TaskList'
import { Modal } from '../components/Modal'
import {
  createTask,
  fetchTasks,
  updateTask,
} from '../services/taskService'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const loadTasks = useCallback(async () => {
    setError('')
    setLoading(true)
    try {
      const data = await fetchTasks()
      setTasks(data)
    } catch (err) {
      setTasks([])
      setError(
        err.response?.data?.message ||
          err.message ||
          'Could not load tasks. Is the API running?'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  const completedCount = tasks.filter((t) => t.completed).length
  const pendingCount = tasks.filter((t) => !t.completed).length

  const openAdd = () => {
    setEditingTask(null)
    setModalOpen(true)
  }

  const openEdit = (task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingTask(null)
  }

  const handleSaveTitle = async (title) => {
    try {
      if (editingTask) {
        const updated = await updateTask(editingTask.id, { title })
        setTasks((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t))
        )
      } else {
        const created = await createTask(title)
        setTasks((prev) => [created, ...prev])
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Could not save task'
      )
    }
  }

  const handleToggle = async (id) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return
    try {
      const updated = await updateTask(id, { completed: !task.completed })
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Could not update task'
      )
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-700/80 bg-slate-800/50 p-6">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/15">
            <ListTodo className="h-5 w-5 text-indigo-400" />
          </div>
          <p className="text-2xl font-semibold text-white">{tasks.length}</p>
          <p className="text-sm text-slate-400">Total Tasks</p>
        </div>
        <div className="rounded-xl border border-slate-700/80 bg-slate-800/50 p-6">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-semibold text-white">{completedCount}</p>
          <p className="text-sm text-slate-400">Completed</p>
        </div>
        <div className="rounded-xl border border-slate-700/80 bg-slate-800/50 p-6">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15">
            <Clock className="h-5 w-5 text-amber-400" />
          </div>
          <p className="text-2xl font-semibold text-white">{pendingCount}</p>
          <p className="text-sm text-slate-400">Pending</p>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">My Tasks</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage and organize your daily tasks
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          {error}
          <button
            type="button"
            onClick={loadTasks}
            className="ml-3 underline hover:text-white"
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-slate-500">Loading tasks…</div>
      ) : (
        <TaskList tasks={tasks} onToggle={handleToggle} onEdit={openEdit} />
      )}

      {modalOpen && (
        <Modal
          task={editingTask}
          onClose={closeModal}
          onSave={handleSaveTitle}
        />
      )}
    </div>
  )
}
