'use client'

import { useState, useRef, useEffect } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { COUNTRIES } from '@/data/countries'

interface PhonePrefixSelectProps {
  prefix: string
  onPrefixChange: (prefix: string) => void
  phoneNumber: string
  onPhoneNumberChange: (number: string) => void
  phonePlaceholder?: string
  inputClassName?: string
}

// Fuera del componente: función pura, no se recrea en cada render
function parseInternational(raw: string): { prefix: string; number: string } | null {
  if (!raw.startsWith('+')) return null
  // Ordenar de más largo a más corto para matchear "+1649" antes que "+1"
  const sorted = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length)
  const match = sorted.find(c => raw.startsWith(c.dialCode))
  if (!match) return null
  return { prefix: match.dialCode, number: raw.slice(match.dialCode.length).trimStart() }
}

export default function PhonePrefixSelect({
  prefix,
  onPrefixChange,
  phoneNumber,
  onPhoneNumberChange,
  phonePlaceholder = '9 11 1234-5678',
  inputClassName = '',
}: PhonePrefixSelectProps) {
  const [open, setOpen]     = useState(false)
  const [search, setSearch] = useState('')
  const searchRef  = useRef<HTMLInputElement>(null)
  const hiddenRef  = useRef<HTMLInputElement>(null)
  const phoneRef   = useRef<HTMLInputElement>(null)

  // Refs para callbacks — evitan que el useEffect se re-ejecute si el padre
  // recrea las funciones en cada render
  const onPrefixRef = useRef(onPrefixChange)
  const onNumberRef = useRef(onPhoneNumberChange)
  useEffect(() => { onPrefixRef.current = onPrefixChange }, [onPrefixChange])
  useEffect(() => { onNumberRef.current = onPhoneNumberChange }, [onPhoneNumberChange])

  // Listeners nativos: cubren autofill de Safari (dispara 'change', no 'input')
  // y cualquier browser que no propague 'input' en autofill a React
  useEffect(() => {
    const hidden = hiddenRef.current
    const phone  = phoneRef.current

    const onHiddenFill = () => {
      const val = (hiddenRef.current?.value ?? '').trim()
      const parsed = parseInternational(val)
      if (parsed) {
        onPrefixRef.current(parsed.prefix)
        if (parsed.number) onNumberRef.current(parsed.number)
      } else {
        const country = COUNTRIES.find(c => c.dialCode === val)
        if (country) onPrefixRef.current(country.dialCode)
      }
    }

    // El input de número puede recibir el número completo en autofill
    const onPhoneFill = () => {
      const val = phoneRef.current?.value ?? ''
      const parsed = parseInternational(val)
      if (parsed) {
        onPrefixRef.current(parsed.prefix)
        onNumberRef.current(parsed.number)
      }
    }

    hidden?.addEventListener('input',  onHiddenFill)
    hidden?.addEventListener('change', onHiddenFill)
    phone?.addEventListener('change',  onPhoneFill) // 'input' ya lo cubre React onChange

    return () => {
      hidden?.removeEventListener('input',  onHiddenFill)
      hidden?.removeEventListener('change', onHiddenFill)
      phone?.removeEventListener('change',  onPhoneFill)
    }
  }, []) // estable — usa refs internamente

  const selected = COUNTRIES.find(c => c.dialCode === prefix) ?? COUNTRIES[0]

  const filtered = search.trim()
    ? COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.dialCode.replace('+', '').startsWith(search.replace('+', '')) ||
        c.iso.toLowerCase() === search.toLowerCase()
      )
    : COUNTRIES

  useEffect(() => {
    if (open) {
      setSearch('')
      requestAnimationFrame(() => searchRef.current?.focus())
    }
  }, [open])

  const base = 'bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#c1ed00]/50 transition-all'

  const labelCls = 'block text-[10px] lg:text-xs font-black uppercase tracking-wider text-white/40 mb-0.5 lg:mb-1'

  return (
    <div className="flex gap-2">
      {/* Input sin value ni readOnly: el browser lo puede autocompletar libremente.
          Los listeners nativos de arriba leen hiddenRef.current.value cuando cambia. */}
      <input
        ref={hiddenRef}
        type="tel"
        autoComplete="tel-country-code"
        aria-hidden="true"
        className="sr-only"
        tabIndex={-1}
      />

      {/* Selector de código de país */}
      <div className="flex-shrink-0">
        <label className={labelCls}>Cod. País</label>
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className={`flex items-center gap-1.5 px-3 py-2 lg:py-3 ${base} min-w-[88px] hover:border-white/20`}
          >
            <span className="text-base leading-none">{selected.flag}</span>
            <span className="font-mono text-xs text-white/70 tabular-nums">{selected.dialCode}</span>
            <span className="text-white/30 text-[9px] ml-auto">▾</span>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="z-50 w-64 bg-[#1a1a1a] border border-white/15 rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.7)] overflow-hidden"
            sideOffset={4}
            align="start"
          >
            {/* stopPropagation para que Radix no capture las teclas del input */}
            <div className="p-2 border-b border-white/10" onKeyDown={e => e.stopPropagation()}>
              <input
                ref={searchRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="País o código..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#c1ed00]/40"
              />
            </div>
            <div className="max-h-52 overflow-y-auto overscroll-contain">
              {filtered.length === 0 ? (
                <p className="px-4 py-3 text-white/30 text-xs">Sin resultados</p>
              ) : (
                filtered.map(c => (
                  <DropdownMenu.Item
                    key={c.iso}
                    onSelect={() => { onPrefixChange(c.dialCode); setOpen(false) }}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/80 cursor-pointer outline-none data-[highlighted]:bg-white/5"
                  >
                    <span className="text-base leading-none w-5 text-center flex-shrink-0">{c.flag}</span>
                    <span className="flex-1 text-xs truncate">{c.name}</span>
                    <span className="font-mono text-xs text-white/40 tabular-nums flex-shrink-0">{c.dialCode}</span>
                  </DropdownMenu.Item>
                ))
              )}
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      </div>

      {/* Input de número — autocomplete="tel" para que el browser llene el número completo */}
      <div className="flex-1">
        <label className={labelCls}>WhatsApp / Teléfono</label>
      <input
        ref={phoneRef}
        type="tel"
        value={phoneNumber}
        onChange={e => {
          const raw = e.target.value
          // Si el browser autollenó un número internacional completo, parsearlo
          const parsed = parseInternational(raw)
          if (parsed) {
            onPrefixChange(parsed.prefix)
            onPhoneNumberChange(parsed.number)
          } else {
            onPhoneNumberChange(raw.replace(/[^\d\s\-]/g, ''))
          }
        }}
        placeholder={phonePlaceholder}
        autoComplete="tel"
        className={`w-full px-4 py-2 lg:py-3 text-sm ${base} ${inputClassName}`}
      />
      </div>
    </div>
  )
}
