import { NavLink } from 'react-router-dom'
import { LayoutDashboard, CheckSquare, LogOut, Zap } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Tasks', to: '/tasks', icon: CheckSquare },
]

export function Sidebar({ onLogout, onNavigate, className = '' }) {
  return (
    <aside
      className={`flex h-screen w-64 shrink-0 flex-col border-r border-slate-800 bg-[#111827] ${className}`}
    >
      <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
          <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-lg font-semibold text-white">TaskFlow</span>
      </div>

      <div className="flex flex-1 flex-col">
        <nav className="space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-indigo-500/15 text-indigo-400'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-white',
                ].join(' ')
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-slate-800 p-3">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/80 hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}
