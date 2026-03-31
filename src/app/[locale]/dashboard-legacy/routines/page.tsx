import { createClient } from '@/lib/supabase/server'

const texts = {
  es: {
    title: 'Mis Rutinas',
    subtitle: 'Tus planes de entrenamiento asignados.',
    empty: 'Todavía no tenés rutinas asignadas. Tu entrenador las configurará pronto.',
    daysLabel: 'días / semana',
    exercises: 'ejercicios',
    active: 'Activa',
    inactive: 'Inactiva',
  },
  en: {
    title: 'My Routines',
    subtitle: 'Your assigned training plans.',
    empty: 'You have no routines assigned yet. Your trainer will set them up soon.',
    daysLabel: 'days / week',
    exercises: 'exercises',
    active: 'Active',
    inactive: 'Inactive',
  },
  pt: {
    title: 'Minhas Rotinas',
    subtitle: 'Seus planos de treino atribuídos.',
    empty: 'Você ainda não tem rotinas atribuídas. Seu treinador as configurará em breve.',
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
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-4xl text-white"
          style={{ fontFamily: 'var(--font-bebas), sans-serif', letterSpacing: '0.03em' }}
        >
          {t.title}
        </h1>
        <p className="text-white/50 mt-1">{t.subtitle}</p>
      </div>

      {!routines || routines.length === 0 ? (
        <div className="bg-[#141414] border border-white/10 rounded-xl p-8 text-center">
          <p className="text-4xl mb-3">💪</p>
          <p className="text-white/40">{t.empty}</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {routines.map((routine) => (
            <div
              key={routine.id}
              className="bg-[#141414] border border-white/10 rounded-xl p-6 hover:border-[#ffd11e]/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold text-lg">{routine.name}</h3>
                  {routine.description && (
                    <p className="text-white/50 text-sm mt-1">{routine.description}</p>
                  )}
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    routine.active
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-white/5 text-white/40 border border-white/10'
                  }`}
                >
                  {routine.active ? t.active : t.inactive}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-white/40">
                <span>📅 {routine.days_per_week} {t.daysLabel}</span>
                <span>🏋️ {routine.routine_exercises?.length ?? 0} {t.exercises}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
