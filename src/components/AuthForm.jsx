import { Zap } from 'lucide-react'

export function AuthForm({ title, subtitle, children, footer }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0c1a] p-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-indigo-600/20 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-violet-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25">
            <Zap className="h-7 w-7 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-3xl font-bold tracking-tight text-white">
            TaskFlow
          </span>
        </div>

        <div className="rounded-2xl border border-flow-card-border bg-flow-card p-10 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-semibold text-white">{title}</h1>
            <p className="text-sm text-slate-400">{subtitle}</p>
          </div>

          {children}

          {footer}
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
