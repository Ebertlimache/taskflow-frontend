import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useAuth } from '../hooks/useAuth'

export function DashboardLayout() {
  const navigate = useNavigate()
  const { user, logoutUser } = useAuth()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const handleLogout = () => {
    logoutUser()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-[#0b0e14] text-white">
      {mobileNavOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          aria-label="Close menu"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <Sidebar
        onLogout={handleLogout}
        onNavigate={() => setMobileNavOpen(false)}
        className={[
          'fixed inset-y-0 left-0 z-50 md:static md:z-0',
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          'transition-transform duration-200 ease-out',
        ].join(' ')}
      />

      <div className="flex min-h-screen flex-1 flex-col md:pl-0">
        <Header
          user={user}
          onMenuClick={() => setMobileNavOpen((o) => !o)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
