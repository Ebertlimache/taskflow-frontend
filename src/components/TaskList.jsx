import { TaskItem } from './TaskItem'

export function TaskList({ tasks, onToggle, onEdit }) {
  if (!tasks?.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 bg-slate-800/30 py-16 text-center text-slate-500">
        No tasks yet. Add one to get started.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
