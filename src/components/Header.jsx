import { Menu } from 'lucide-react'

function initialsFromEmail(email) {
  if (!email) return '??'
  const local = email.split('@')[0] || ''
  const parts = local.split(/[._-]/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return local.slice(0, 2).toUpperCase() || '??'
}

export function Header({ user, onMenuClick }) {
  const email = user?.email ?? ''
  const initials = user?.initials ?? initialsFromEmail(email)

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-800/80 bg-[#0b0e14]/90 px-4 backdrop-blur-md md:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden md:block" />

      <div className="flex items-center gap-3">
        <span className="hidden max-w-[220px] truncate text-sm text-slate-400 sm:block">
          {email}
        </span>
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white ring-2 ring-slate-800"
          title={email}
        >
          {initials}
        </div>
      </div>
    </header>
  )
}
