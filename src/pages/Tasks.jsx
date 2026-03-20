import { useCallback, useEffect, useMemo, useState } from 'react'
import { Plus, Filter } from 'lucide-react'
import { TaskList } from '../components/TaskList'
import { Modal } from '../components/Modal'
import {
  createTask,
  fetchTasks,
  updateTask,
} from '../services/taskService'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
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

  const filteredTasks = useMemo(() => {
    if (filter === 'pending') return tasks.filter((t) => !t.completed)
    if (filter === 'completed') return tasks.filter((t) => t.completed)
    return tasks
  }, [tasks, filter])

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ]

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
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">All Tasks</h1>
          <p className="mt-1 text-sm text-slate-400">
            View and manage all your tasks in one place
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

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 shrink-0 text-slate-500" />
        <div className="flex flex-wrap gap-1 rounded-lg border border-slate-700/80 bg-slate-800/40 p-1">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={[
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                filter === f.value
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span className="ml-auto text-sm text-slate-500">
          {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
        </span>
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
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onEdit={openEdit}
        />
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
