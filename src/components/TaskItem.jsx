import { Check, Trash2 } from 'lucide-react'

export function TaskItem({ task, onToggle, onEdit, onDelete, deleting }) {
  const pending = !task.completed

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onEdit?.(task)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onEdit?.(task)
        }
      }}
      className="group flex cursor-pointer items-center gap-4 rounded-xl border border-slate-700/60 bg-[#1e293b]/90 p-4 transition-colors hover:border-indigo-500/30 hover:bg-slate-800/80"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onToggle(task.id)
        }}
        disabled={deleting}
        className={[
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors',
          task.completed
            ? 'border-indigo-500 bg-indigo-600 text-white'
            : 'border-slate-500 hover:border-indigo-400',
          deleting ? 'opacity-50' : '',
        ].join(' ')}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {task.completed && <Check className="h-4 w-4" strokeWidth={3} />}
      </button>

      <p
        className={[
          'min-w-0 flex-1 truncate text-left text-base font-medium',
          task.completed ? 'text-slate-400 line-through' : 'text-white',
        ].join(' ')}
      >
        {task.title}
      </p>

      <span
        className={[
          'shrink-0 rounded-full px-3 py-1 text-xs font-medium',
          pending
            ? 'bg-amber-500/15 text-amber-400'
            : 'bg-emerald-500/15 text-emerald-400',
        ].join(' ')}
      >
        {pending ? 'Pending' : 'Completed'}
      </span>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onDelete?.(task)
        }}
        disabled={deleting}
        className="shrink-0 rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={deleting ? 'Deleting task' : 'Delete task'}
        title="Delete task"
      >
        {deleting ? (
          <span className="block h-4 w-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}
