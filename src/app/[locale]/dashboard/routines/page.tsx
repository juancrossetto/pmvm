import { createClient } from '@/lib/supabase/server'
import { Calendar, Dumbbell, ChevronRight, Zap } from 'lucide-react'

const texts = {
  es: {
    title: 'MIS',
    titleAccent: 'RUTINAS.',
    subtitle: 'Tus planes de entrenamiento asignados.',
    empty: 'Todavía no tenés rutinas asignadas.',
    emptyHint: 'Tu coach las va a cargar pronto. ¡Ya estás dentro!',
    daysLabel: 'días / semana',
    exercises: 'ejercicios',
    active: 'Activa',
    inactive: 'Inactiva',
  },
  en: {
    title: 'MY',
    titleAccent: 'ROUTINES.',
    subtitle: 'Your assigned training plans.',
    empty: 'No routines assigned yet.',
    emptyHint: 'Your coach will set them up soon. You\'re already in!',
    daysLabel: 'days / week',
    exercises: 'exercises',
    active: 'Active',
    inactive: 'Inactive',
  },
  pt: {
    title: 'MINHAS',
    titleAccent: 'ROTINAS.',
    subtitle: 'Seus planos de treino atribuídos.',
    empty: 'Nenhuma rotina atribuída ainda.',
    emptyHint: 'Seu coach as configurará em breve. Você já está dentro!',
    daysLabel: 'dias / semana',
    exercises: 'exercícios',
    active: 'Ativa',
    inactive: 'Inativa',
  },
}

export default async function RoutinesPage({ params }: { params: { locale: string } }) {
  const t = texts[params.locale as keyof typeof texts] ?? texts.es
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: routines } = await supabase
    .from('routines')
    .select('*, routine_exercises(id)')
    .eq('client_id', user!.id)
    .order('active', { ascending: false })
    .order('created_at', { ascending: false })

  const activeCount = routines?.filter(r => r.active).length ?? 0

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white relative overflow-hidden">
      {/* Ambient glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#c1ed00]/5 blur-[140px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-[#00e3fd]/4 blur-[140px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 px-6 lg:px-10 py-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-black tracking-tighter leading-none mb-2">
            {t.title}{' '}
            <span className="text-[#c1ed00] italic">{t.titleAccent}</span>
          </h1>
          <p className="text-white/40 text-sm">{t.subtitle}</p>
        </div>

        {/* Stats strip (only when there are routines) */}
        {routines && routines.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-8 sm:grid-cols-3 sm:max-w-sm">
            <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
              <p className="text-2xl font-black text-[#c1ed00]">{activeCount}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{t.active}</p>
            </div>
            <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
              <p className="text-2xl font-black text-white">{routines.reduce((acc, r) => acc + (r.routine_exercises?.length ?? 0), 0)}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{t.exercises}</p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!routines || routines.length === 0 ? (
          <div className="border border-white/8 rounded-2xl p-12 text-center bg-white/[0.02]">
            <div className="w-16 h-16 rounded-2xl bg-[#c1ed00]/10 flex items-center justify-center mx-auto mb-5">
              <Dumbbell className="w-7 h-7 text-[#c1ed00]" />
            </div>
            <p className="text-white font-bold text-lg mb-2">{t.empty}</p>
            <p className="text-white/35 text-sm">{t.emptyHint}</p>
          </div>
        ) : (
          /* Routine cards */
          <div className="grid gap-4">
            {routines.map((routine) => {
              const exCount = routine.routine_exercises?.length ?? 0
              return (
                <div
                  key={routine.id}
                  className={`group relative bg-white/[0.03] border rounded-2xl p-6 transition-all duration-200 hover:bg-white/[0.05] ${
                    routine.active
                      ? 'border-[#c1ed00]/20 hover:border-[#c1ed00]/40'
                      : 'border-white/8 hover:border-white/15'
                  }`}
                >
                  {/* Active glow */}
                  {routine.active && (
                    <div className="absolute inset-0 rounded-2xl bg-[#c1ed00]/[0.02] pointer-events-none" />
                  )}

                  <div className="relative flex items-start justify-between gap-4">
                    {/* Icon + info */}
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        routine.active ? 'bg-[#c1ed00]/10' : 'bg-white/5'
                      }`}>
                        <Zap className={`w-5 h-5 ${routine.active ? 'text-[#c1ed00]' : 'text-white/30'}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-bold text-base">{routine.name}</h3>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            routine.active
                              ? 'bg-[#c1ed00]/10 text-[#c1ed00] border border-[#c1ed00]/20'
                              : 'bg-white/5 text-white/30 border border-white/10'
                          }`}>
                            {routine.active ? t.active : t.inactive}
                          </span>
                        </div>
                        {routine.description && (
                          <p className="text-white/40 text-sm leading-relaxed mb-3">{routine.description}</p>
                        )}
                        {/* Meta chips */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-xs text-white/40">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{routine.days_per_week} {t.daysLabel}</span>
                          </div>
                          <div className="w-px h-3 bg-white/10" />
                          <div className="flex items-center gap-1.5 text-xs text-white/40">
                            <Dumbbell className="w-3.5 h-3.5" />
                            <span>{exCount} {t.exercises}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="w-4 h-4 text-white/20 flex-shrink-0 mt-1 group-hover:text-white/40 transition-colors" />
                  </div>

                  {/* Progress bar (days indicator) */}
                  {routine.active && (
                    <div className="relative mt-5 pt-4 border-t border-white/5">
                      <div className="flex justify-between text-[10px] text-white/25 uppercase tracking-widest mb-2">
                        <span>Frecuencia semanal</span>
                        <span>{routine.days_per_week}/7 días</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#c1ed00] rounded-full"
                          style={{ width: `${(routine.days_per_week / 7) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
