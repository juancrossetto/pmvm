'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface Exercise {
  id: string
  name: string
  category: string
  muscle_group: string
  sets: string
  reps: string
  rest: string
}

const EMPTY_EXERCISE = (): Exercise => ({
  id: Math.random().toString(36).slice(2),
  name: '',
  category: 'Compound',
  muscle_group: '',
  sets: '3',
  reps: '10',
  rest: '90s',
})

const CATEGORIES = ['Hypertrophy Elite', 'Neuro-Priming', 'Metabolic Reset', 'Functional Power', 'Mobility & Recovery']

export default function RoutineArchitectPage() {
  const router = useRouter()
  const supabase = createClient()

  const [category, setCategory] = useState('Hypertrophy Elite')
  const [titleEn, setTitleEn] = useState('')
  const [titleEs, setTitleEs] = useState('')
  const [mindset, setMindset] = useState('')
  const [fuel, setFuel] = useState('')
  const [exercises, setExercises] = useState<Exercise[]>([EMPTY_EXERCISE()])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const addExercise = () => setExercises((prev) => [...prev, EMPTY_EXERCISE()])

  const removeExercise = (id: string) =>
    setExercises((prev) => prev.filter((e) => e.id !== id))

  const updateExercise = (id: string, field: keyof Exercise, value: string) =>
    setExercises((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    )

  const handlePublish = async () => {
    if (!titleEs && !titleEn) {
      setError('Ingresá al menos un título para la rutina.')
      return
    }
    setSaving(true)
    setError('')

    const { data: routine, error: routineError } = await supabase
      .from('routines')
      .insert({
        name: titleEs || titleEn,
        description: `${category}${mindset ? ` — ${mindset}` : ''}`,
      })
      .select()
      .single()

    if (routineError || !routine) {
      setError('Error al guardar la rutina. Intentá de nuevo.')
      setSaving(false)
      return
    }

    const exercisesToInsert = exercises
      .filter((e) => e.name.trim())
      .map((e, idx) => ({
        routine_id: routine.id,
        name: e.name,
        sets: parseInt(e.sets) || 3,
        reps: e.reps,
        rest_seconds: parseInt(e.rest) || 90,
        order_index: idx,
        notes: e.muscle_group || e.category,
      }))

    if (exercisesToInsert.length > 0) {
      const { error: exError } = await supabase
        .from('routine_exercises')
        .insert(exercisesToInsert)

      if (exError) {
        setError('Rutina guardada pero hubo un error con los ejercicios.')
        setSaving(false)
        return
      }
    }

    setSaved(true)
    setSaving(false)
    setTimeout(() => router.push('../admin/clients'), 1500)
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white relative">
      {/* Background glow */}
      <div className="fixed bottom-0 right-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <span className="text-[20rem] font-headline font-black text-[#c1ed00] tracking-tighter uppercase leading-none">R3</span>
      </div>

      <div className="relative z-10 px-6 lg:px-12 py-10 lg:py-12 max-w-7xl mx-auto">

        {/* Header */}
        <header className="mb-10 lg:mb-12 flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
          <div>
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">Admin Portal / Módulos</p>
            <h1 className="text-5xl lg:text-6xl font-headline font-bold text-white tracking-tighter uppercase leading-[0.9]">
              Routine<br />
              <span className="text-[#c1ed00] italic">Architect</span>
            </h1>
            <p className="mt-4 text-white/40 font-label text-xs tracking-widest uppercase">
              Diseñando protocolos de alto rendimiento para atletas de élite.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.back()}
              className="px-5 py-2.5 border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all text-xs font-headline uppercase tracking-widest"
            >
              Descartar
            </button>
            <button
              onClick={handlePublish}
              disabled={saving || saved}
              className="px-8 py-2.5 bg-white text-black font-headline font-bold uppercase tracking-widest text-xs hover:bg-[#c1ed00] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                  Guardando...
                </>
              ) : saved ? (
                <>
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Publicada ✓
                </>
              ) : (
                'Publicar Rutina'
              )}
            </button>
          </div>
        </header>

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 font-label text-xs uppercase tracking-widest">
            {error}
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left column */}
          <div className="lg:col-span-4 space-y-8">

            {/* 01 — Core Identity */}
            <section className="bg-surface-container-low p-7 lg:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#c1ed00]" />
              <div className="flex items-center gap-3 mb-7">
                <span className="text-xs font-label text-[#c1ed00] border border-[#c1ed00]/30 px-2 py-0.5">01</span>
                <h2 className="font-headline font-bold text-lg uppercase tracking-tighter text-white">Core Identity</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-label text-white/30 uppercase tracking-[0.2em] mb-2">
                    Categoría del Protocolo
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-surface-container-highest border-none text-white font-label text-sm focus:ring-1 focus:ring-[#c1ed00] py-3 px-4 uppercase"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-label text-white/30 uppercase tracking-[0.2em]">
                    Título de la Rutina (Multilingüe)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-[#c1ed00] font-bold">ES</span>
                    <input
                      type="text"
                      value={titleEs}
                      onChange={(e) => setTitleEs(e.target.value)}
                      placeholder="Fase de Velocidad Máxima"
                      className="w-full bg-surface-container-highest border-none text-white font-body text-sm focus:ring-1 focus:ring-[#c1ed00] py-3 pl-12 pr-4 placeholder:text-white/20"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-[#00e3fd] font-bold">EN</span>
                    <input
                      type="text"
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      placeholder="Maximum Velocity Phase"
                      className="w-full bg-surface-container-highest border-none text-white font-body text-sm focus:ring-1 focus:ring-[#00e3fd] py-3 pl-12 pr-4 placeholder:text-white/20"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 03 — Bio-Notes */}
            <section className="bg-surface-container-low p-7 lg:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#00e3fd]" />
              <div className="flex items-center gap-3 mb-7">
                <span className="text-xs font-label text-[#00e3fd] border border-[#00e3fd]/30 px-2 py-0.5">03</span>
                <h2 className="font-headline font-bold text-lg uppercase tracking-tighter text-white">Bio-Notes</h2>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-label text-white/30 uppercase tracking-[0.2em] mb-2">
                    <span className="material-symbols-outlined text-sm text-[#00e3fd]">psychology</span>
                    Foco Mental
                  </label>
                  <textarea
                    rows={3}
                    value={mindset}
                    onChange={(e) => setMindset(e.target.value)}
                    placeholder="Activar el SNP con intención explosiva. Foco en el control excéntrico..."
                    className="w-full bg-surface-container-highest border-none text-white font-body text-sm focus:ring-1 focus:ring-[#00e3fd] py-3 px-4 placeholder:text-white/20 resize-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-label text-white/30 uppercase tracking-[0.2em] mb-2">
                    <span className="material-symbols-outlined text-sm text-[#00e3fd]">restaurant</span>
                    Nutrición Intra-Entreno
                  </label>
                  <textarea
                    rows={2}
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                    placeholder="Electrolitos + 30g Dextrina Cíclica recomendados..."
                    className="w-full bg-surface-container-highest border-none text-white font-body text-sm focus:ring-1 focus:ring-[#00e3fd] py-3 px-4 placeholder:text-white/20 resize-none"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Right column — Technical Sequence */}
          <div className="lg:col-span-8">
            <section className="bg-surface-container-high p-7 lg:p-8 min-h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-label text-white border border-white/30 px-2 py-0.5 font-bold">02</span>
                  <h2 className="font-headline font-bold text-lg uppercase tracking-tighter text-white">Technical Sequence</h2>
                </div>
                <button
                  onClick={addExercise}
                  className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest text-[#c1ed00] font-headline text-xs uppercase tracking-widest font-bold hover:bg-white/5 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Exercise
                </button>
              </div>

              {/* Exercise list */}
              <div className="space-y-3">
                {exercises.map((ex, idx) => (
                  <div
                    key={ex.id}
                    className="group relative bg-[#000000] p-1 flex items-stretch gap-1 hover:bg-neutral-900 border-l border-[#c1ed00]/20 transition-all"
                  >
                    {/* Drag handle */}
                    <div className="w-10 flex items-center justify-center text-white/20 group-hover:text-[#c1ed00] cursor-grab">
                      <span className="material-symbols-outlined text-lg">drag_indicator</span>
                    </div>

                    {/* Exercise number */}
                    <div className="w-8 flex items-center justify-center">
                      <span className="text-[10px] font-label text-white/20 font-bold">{String(idx + 1).padStart(2, '0')}</span>
                    </div>

                    {/* Fields */}
                    <div className="flex-1 p-3 lg:p-4 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 items-start">
                      {/* Name + muscle group */}
                      <div className="col-span-2 lg:col-span-1">
                        <input
                          type="text"
                          value={ex.name}
                          onChange={(e) => updateExercise(ex.id, 'name', e.target.value)}
                          placeholder="Nombre del ejercicio"
                          className="bg-transparent border-b border-white/10 focus:border-[#c1ed00] text-white font-headline font-bold text-sm uppercase tracking-tight focus:outline-none w-full pb-1 placeholder:text-white/20 placeholder:normal-case"
                        />
                        <input
                          type="text"
                          value={ex.muscle_group}
                          onChange={(e) => updateExercise(ex.id, 'muscle_group', e.target.value)}
                          placeholder="Grupo muscular"
                          className="bg-transparent text-white/30 font-label text-[10px] uppercase tracking-widest focus:outline-none w-full mt-1.5 placeholder:text-white/15 placeholder:normal-case"
                        />
                      </div>

                      {/* Sets */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-label text-white/30 uppercase tracking-widest">Sets</span>
                        <input
                          type="number"
                          value={ex.sets}
                          onChange={(e) => updateExercise(ex.id, 'sets', e.target.value)}
                          className="bg-transparent border-none p-0 text-white font-label font-bold text-xl focus:ring-0 focus:outline-none w-full"
                        />
                      </div>

                      {/* Reps */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-label text-white/30 uppercase tracking-widest">Reps</span>
                        <input
                          type="text"
                          value={ex.reps}
                          onChange={(e) => updateExercise(ex.id, 'reps', e.target.value)}
                          className="bg-transparent border-none p-0 text-white font-label font-bold text-xl focus:ring-0 focus:outline-none w-full"
                        />
                      </div>

                      {/* Rest */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-label text-white/30 uppercase tracking-widest">Rest</span>
                        <input
                          type="text"
                          value={ex.rest}
                          onChange={(e) => updateExercise(ex.id, 'rest', e.target.value)}
                          className="bg-transparent border-none p-0 text-[#00e3fd] font-label font-bold text-xl focus:ring-0 focus:outline-none w-full"
                        />
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeExercise(ex.id)}
                      className="w-10 flex items-center justify-center text-white/20 hover:text-red-400 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                ))}

                {/* Add exercise CTA when empty-ish */}
                {exercises.length === 0 && (
                  <button
                    onClick={addExercise}
                    className="w-full py-12 border border-dashed border-white/10 text-white/20 hover:border-[#c1ed00]/30 hover:text-[#c1ed00]/50 transition-all flex flex-col items-center gap-3"
                  >
                    <span className="material-symbols-outlined text-4xl">add_circle</span>
                    <span className="font-label text-xs uppercase tracking-widest">Agregar primer ejercicio</span>
                  </button>
                )}
              </div>

              {/* Footer hint */}
              {exercises.length > 0 && (
                <button
                  onClick={addExercise}
                  className="mt-4 w-full py-4 border border-dashed border-white/5 text-white/20 hover:border-[#c1ed00]/20 hover:text-[#c1ed00]/40 transition-all flex items-center justify-center gap-2 font-label text-xs uppercase tracking-widest"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Agregar ejercicio
                </button>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
