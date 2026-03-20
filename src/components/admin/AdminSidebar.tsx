'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

interface AdminSidebarProps {
  locale: string
  adminName: string
}

const navItems = [
  { href: 'admin',          label: 'Overview',   icon: '📊' },
  { href: 'admin/clients',  label: 'Clientes',   icon: '👥' },
  { href: 'admin/messages', label: 'Mensajes',   icon: '💬' },
]

export default function AdminSidebar({ locale, adminName }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push(`/${locale}/login`)
    router.refresh()
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link href={`/${locale}/v3`} className="flex items-center gap-3">
          <Image src="/images/icon-yellow.png" alt="Logo" width={32} height={32} className="object-contain" />
          <div>
            <span className="text-xl text-white block" style={{ fontFamily: 'var(--font-bebas), sans-serif', letterSpacing: '0.03em' }}>
              PMVM
            </span>
            <span className="text-[10px] text-[#ffd11e] tracking-widest uppercase -mt-1 block">Admin</span>
          </div>
        </Link>
      </div>

      {/* Admin info */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#ffd11e] flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
            {adminName[0].toUpperCase()}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{adminName}</p>
            <p className="text-[#ffd11e] text-xs">Entrenador</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const href = `/${locale}/${item.href}`
          const isActive = pathname === href || (item.href !== 'admin' && pathname.startsWith(href))
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

      {/* Links utiles */}
      <div className="px-3 pb-2 space-y-1">
        <Link
          href={`/${locale}/dashboard`}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
        >
          <span>👤</span>
          <span>Ver como cliente</span>
        </Link>
      </div>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-red-400 hover:bg-red-400/5 transition-colors"
        >
          <span>🚪</span>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden lg:flex w-64 flex-col bg-[#111111] border-r border-white/10 flex-shrink-0">
        <SidebarContent />
      </aside>

      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-[#111111] border-b border-white/10">
          <span className="text-white font-semibold">Panel Admin</span>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white/60 hover:text-white p-1">
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
        {mobileOpen && <div className="fixed inset-0 z-30 bg-black/60" onClick={() => setMobileOpen(false)} />}
        <aside className={`fixed top-0 left-0 z-40 w-64 h-full bg-[#111111] border-r border-white/10 transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <SidebarContent />
        </aside>
        <div className="h-14" />
      </div>
    </>
  )
}
