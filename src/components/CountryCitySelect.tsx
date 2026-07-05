'use client'

import { useState, useRef, useEffect } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { COUNTRIES, ARGENTINA_CITIES } from '@/data/countries'

interface CountryCitySelectProps {
  countryCode: string
  countryName: string
  onCountryChange: (iso: string, name: string) => void
  city: string
  onCityChange: (city: string) => void
}

export default function CountryCitySelect({
  countryCode,
  countryName,
  onCountryChange,
  city,
  onCityChange,
}: CountryCitySelectProps) {
  const [countryOpen, setCountryOpen] = useState(false)
  const [cityOpen, setCityOpen]       = useState(false)
  const [countrySearch, setCountrySearch] = useState('')
  const [citySearch, setCitySearch]       = useState('')
  const countrySearchRef = useRef<HTMLInputElement>(null)
  const citySearchRef    = useRef<HTMLInputElement>(null)

  const selectedCountry = COUNTRIES.find(c => c.iso === countryCode)
  const isArgentina     = countryCode === 'AR'

  const filteredCountries = countrySearch.trim()
    ? COUNTRIES.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase()))
    : COUNTRIES

  const filteredCities = citySearch.trim()
    ? ARGENTINA_CITIES.filter(c => c.toLowerCase().includes(citySearch.toLowerCase()))
    : ARGENTINA_CITIES

  useEffect(() => {
    if (countryOpen) {
      setCountrySearch('')
      requestAnimationFrame(() => countrySearchRef.current?.focus())
    }
  }, [countryOpen])

  useEffect(() => {
    if (cityOpen) {
      setCitySearch('')
      requestAnimationFrame(() => citySearchRef.current?.focus())
    }
  }, [cityOpen])

  const labelBase = 'block text-[10px] lg:text-xs font-black uppercase tracking-wider text-white/40 mb-0.5 lg:mb-1'
  const btnBase   = 'w-full flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg lg:rounded-xl px-3 py-1.5 lg:py-3 text-sm focus:outline-none focus:border-[#c1ed00]/50 transition-all hover:border-white/20'
  const inputBase = 'w-full bg-white/5 border border-white/10 rounded-lg lg:rounded-xl px-3 py-1.5 lg:py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#c1ed00]/50 transition-colors'
  const searchBase = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#c1ed00]/40'

  return (
    <div className="grid grid-cols-2 gap-2">

      {/* ── País ── */}
      <div>
        <label className={labelBase}>País</label>
        <DropdownMenu.Root open={countryOpen} onOpenChange={setCountryOpen}>
          <DropdownMenu.Trigger asChild>
            <button type="button" className={btnBase}>
              {selectedCountry ? (
                <>
                  <span className="text-base leading-none flex-shrink-0">{selectedCountry.flag}</span>
                  <span className="flex-1 text-xs truncate text-left text-white">{selectedCountry.name}</span>
                </>
              ) : (
                <span className="text-white/30 text-xs">Seleccioná</span>
              )}
              <span className="text-white/30 text-[9px] ml-auto flex-shrink-0">▾</span>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="z-50 w-64 bg-[#1a1a1a] border border-white/15 rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.7)] overflow-hidden"
              sideOffset={4}
              align="start"
            >
              <div className="p-2 border-b border-white/10" onKeyDown={e => e.stopPropagation()}>
                <input ref={countrySearchRef} value={countrySearch}
                  onChange={e => setCountrySearch(e.target.value)}
                  placeholder="Buscar país..."
                  className={searchBase} />
              </div>
              <div className="max-h-52 overflow-y-auto overscroll-contain">
                {filteredCountries.length === 0
                  ? <p className="px-4 py-3 text-white/30 text-xs">Sin resultados</p>
                  : filteredCountries.map(c => (
                    <DropdownMenu.Item
                      key={c.iso}
                      onSelect={() => {
                        onCountryChange(c.iso, c.name)
                        onCityChange('')
                        setCountryOpen(false)
                      }}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 cursor-pointer outline-none data-[highlighted]:bg-white/5"
                    >
                      <span className="text-base leading-none w-5 text-center flex-shrink-0">{c.flag}</span>
                      <span className="text-xs truncate">{c.name}</span>
                    </DropdownMenu.Item>
                  ))}
              </div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {/* ── Ciudad ── */}
      <div>
        <label className={labelBase}>Ciudad</label>
        {isArgentina ? (
          <DropdownMenu.Root open={cityOpen} onOpenChange={setCityOpen}>
            <DropdownMenu.Trigger asChild>
              <button type="button" className={btnBase}>
                <span className={`flex-1 text-xs text-left ${city ? 'text-white' : 'text-white/30'}`}>
                  {city || 'Seleccioná'}
                </span>
                <span className="text-white/30 text-[9px] flex-shrink-0">▾</span>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="z-50 w-56 bg-[#1a1a1a] border border-white/15 rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.7)] overflow-hidden"
                sideOffset={4}
                align="start"
              >
                <div className="p-2 border-b border-white/10" onKeyDown={e => e.stopPropagation()}>
                  <input ref={citySearchRef} value={citySearch}
                    onChange={e => setCitySearch(e.target.value)}
                    placeholder="Buscar ciudad..."
                    className={searchBase} />
                </div>
                <div className="max-h-52 overflow-y-auto overscroll-contain">
                  {filteredCities.length === 0
                    ? <p className="px-4 py-3 text-white/30 text-xs">Sin resultados</p>
                    : filteredCities.map(c => (
                      <DropdownMenu.Item
                        key={c}
                        onSelect={() => { onCityChange(c); setCityOpen(false) }}
                        className="px-4 py-2 text-xs text-white/80 cursor-pointer outline-none data-[highlighted]:bg-white/5"
                      >
                        {c}
                      </DropdownMenu.Item>
                    ))}
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        ) : (
          <input
            type="text"
            value={city}
            onChange={e => onCityChange(e.target.value)}
            placeholder="Tu ciudad"
            className={inputBase}
          />
        )}
      </div>

    </div>
  )
}
