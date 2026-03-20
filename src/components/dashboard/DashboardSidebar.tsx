'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import type { User } from '@supabase/supabase-js'

interface Profile {
  full_name?: string
  avatar_url?: string
}

interface SidebarProps {
  locale: string
  user: User
  profile: Profile | null
}

const navItems = {
  es: [
    { href: 'dashboard', label: 'Inicio', icon: '🏠' },
    { href: 'dashboard/routines', label: 'Mis Rutinas', icon: '💪' },
    { href: 'dashboard/progress', label: 'Mi Progreso', icon: '📈' },
    { href: 'dashboard/messages', label: 'Mensajes', icon: '💬' },
  ],
  en: [
    { href: 'dashboard', label: 'Home', icon: '🏠' },
    { href: 'dashboard/routines', label: 'My Routines', icon: '💪' },
    { href: 'dashboard/progress', label: 'My Progress', icon: '📈' },
    { href: 'dashboard/messages', label: 'Messages', icon: '💬' },
  ],
  pt: [
    { href: 'dashboard', label: 'Início', icon: '🏠' },
    { href: 'dashboard/routines', label: 'Minhas Rotinas', icon: '💪' },
    { href: 'dashboard/progress', label: 'Meu Progresso', icon: '📈' },
    { href: 'dashboard/messages', label: 'Mensagens', icon: '💬' },
  ],
}

const logoutLabel = { es: 'Cerrar sesión', en: 'Sign out', pt: 'Sair' }

export default function DashboardSidebar({ locale, user, profile }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const items = navItems[locale as keyof typeof navItems] ?? navItems.es
  const signOut = logoutLabel[locale as keyof typeof logoutLabel] ?? logoutLabel.es

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push(`/${locale}/login`)
    router.refresh()
  }

  const displayName = profile?.full_name ?? user.email?.split('@')[0] ?? 'Cliente'

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link href={`/${locale}/v3`} className="flex items-center gap-3">
          <Image src="/images/icon-yellow.png" alt="Logo" width={32} height={32} className="object-contain" />
          <span
            className="text-xl text-white"
            style={{ fontFamily: 'var(--font-bebas), sans-serif', letterSpacing: '0.03em' }}
          >
            PMVM
          </span>
        </Link>
      </div>

      {/* User info */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#ffd11e] flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
            {displayName[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{displayName}</p>
            <p className="text-white/40 text-xs truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item) => {
          const href = `/${locale}/${item.href}`
          const isActive = pathname === href
          return (
            <Link
              key={item.href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-[#ffd11e]/10 text-[#ffd11e] font-medium'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-red-400 hover:bg-red-400/5 transition-colors"
        >
          <span>🚪</span>
          <span>{signOut}</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-[#111111] border-r border-white/10 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile: top bar + drawer */}
      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-[#111111] border-b border-white/10">
          <Link href={`/${locale}/v3`} className="flex items-center gap-2">
            <Image src="/images/icon-yellow.png" alt="Logo" width={28} height={28} className="object-contain" />
            <span
              className="text-lg text-white"
              style={{ fontFamily: 'var(--font-bebas), sans-serif' }}
            >
              PMVM
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white/60 hover:text-white p-1"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Drawer overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Drawer panel */}
        <aside
          className={`fixed top-0 left-0 z-40 w-64 h-full bg-[#111111] border-r border-white/10 transform transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <SidebarContent />
        </aside>

        {/* Spacer for fixed top bar */}
        <div className="h-14" />
      </div>
    </>
  )
}
