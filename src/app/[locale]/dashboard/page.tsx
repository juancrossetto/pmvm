import { createClient } from '@/lib/supabase/server'

const texts = {
  es: {
    greeting: 'Hola',
    subtitle: 'Bienvenido a tu área personal.',
    cards: [
      { label: 'Rutinas activas', icon: '💪', key: 'routines' },
      { label: 'Días entrenados', icon: '📅', key: 'days' },
      { label: 'Mensajes nuevos', icon: '💬', key: 'messages' },
    ],
    nextWorkout: 'Próximo entrenamiento',
    noWorkout: 'No hay rutinas asignadas aún.',
    recentActivity: 'Actividad reciente',
    noActivity: 'Todavía no hay actividad registrada.',
  },
  en: {
    greeting: 'Hello',
    subtitle: 'Welcome to your personal area.',
    cards: [
      { label: 'Active routines', icon: '💪', key: 'routines' },
      { label: 'Days trained', icon: '📅', key: 'days' },
      { label: 'New messages', icon: '💬', key: 'messages' },
    ],
    nextWorkout: 'Next workout',
    noWorkout: 'No routines assigned yet.',
    recentActivity: 'Recent activity',
    noActivity: 'No activity recorded yet.',
  },
  pt: {
    greeting: 'Olá',
    subtitle: 'Bem-vindo à sua área pessoal.',
    cards: [
      { label: 'Rotinas ativas', icon: '💪', key: 'routines' },
      { label: 'Dias treinados', icon: '📅', key: 'days' },
      { label: 'Novas mensagens', icon: '💬', key: 'messages' },
    ],
    nextWorkout: 'Próximo treino',
    noWorkout: 'Nenhuma rotina atribuída ainda.',
    recentActivity: 'Atividade recente',
    noActivity: 'Nenhuma atividade registrada ainda.',
  },
}

export default async function DashboardPage({ params }: { params: { locale: string } }) {
  const t = texts[params.locale as keyof typeof texts] ?? texts.es
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user!.id)
    .single()

  const { data: routines } = await supabase
    .from('routines')
    .select('id, name, days_per_week')
    .eq('client_id', user!.id)
    .eq('active', true)

  const { data: messages } = await supabase
    .from('messages')
    .select('id')
    .eq('client_id', user!.id)
    .eq('read', false)

  const { data: progress } = await supabase
    .from('progress')
    .select('id, created_at')
    .eq('client_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const displayName = profile?.full_name ?? user!.email?.split('@')[0] ?? 'Cliente'

  const stats = [
    { label: t.cards[0].label, icon: t.cards[0].icon, value: routines?.length ?? 0 },
    { label: t.cards[1].label, icon: t.cards[1].icon, value: progress?.length ?? 0 },
    { label: t.cards[2].label, icon: t.cards[2].icon, value: messages?.length ?? 0 },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-4xl text-white"
          style={{ fontFamily: 'var(--font-bebas), sans-serif', letterSpacing: '0.03em' }}
        >
          {t.greeting}, {displayName} 👋
        </h1>
        <p className="text-white/50 mt-1">{t.subtitle}</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#141414] border border-white/10 rounded-xl p-5 flex items-center gap-4"
          >
            <div className="text-3xl">{stat.icon}</div>
            <div>
              <p className="text-3xl font-bold text-[#ffd11e]">{stat.value}</p>
              <p className="text-white/50 text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Next workout */}
      <div className="bg-[#141414] border border-white/10 rounded-xl p-6">
        <h2
          className="text-2xl text-white mb-4"
          style={{ fontFamily: 'var(--font-bebas), sans-serif', letterSpacing: '0.03em' }}
        >
          {t.nextWorkout}
        </h2>
        {routines && routines.length > 0 ? (
          <div className="space-y-3">
            {routines.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#ffd11e]">💪</span>
                  <span className="text-white font-medium">{r.name}</span>
                </div>
                <span className="text-white/40 text-sm">{r.days_per_week}x / semana</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/40 text-sm">{t.noWorkout}</p>
        )}
      </div>

      {/* Recent activity */}
      <div className="bg-[#141414] border border-white/10 rounded-xl p-6">
        <h2
          className="text-2xl text-white mb-4"
          style={{ fontFamily: 'var(--font-bebas), sans-serif', letterSpacing: '0.03em' }}
        >
          {t.recentActivity}
        </h2>
        {progress && progress.length > 0 ? (
          <div className="space-y-2">
            {progress.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 text-white/60 text-sm py-2 border-b border-white/5 last:border-0"
              >
                <span className="text-[#ffd11e]">📈</span>
                <span>
                  {new Date(p.created_at).toLocaleDateString(params.locale, {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/40 text-sm">{t.noActivity}</p>
        )}
      </div>
    </div>
  )
}
