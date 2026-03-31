import { createClient } from '@/lib/supabase/server'

const texts = {
  es: {
    title: 'Mi Progreso',
    subtitle: 'Tu evolución a lo largo del tiempo.',
    empty: 'Todavía no hay registros de progreso. Tu entrenador irá cargando tus métricas.',
    weight: 'Peso',
    bodyFat: 'Grasa corporal',
    muscle: 'Masa muscular',
    date: 'Fecha',
    notes: 'Notas',
    kg: 'kg',
    percent: '%',
  },
  en: {
    title: 'My Progress',
    subtitle: 'Your evolution over time.',
    empty: 'No progress records yet. Your trainer will be adding your metrics.',
    weight: 'Weight',
    bodyFat: 'Body fat',
    muscle: 'Muscle mass',
    date: 'Date',
    notes: 'Notes',
    kg: 'kg',
    percent: '%',
  },
  pt: {
    title: 'Meu Progresso',
    subtitle: 'Sua evolução ao longo do tempo.',
    empty: 'Nenhum registro de progresso ainda. Seu treinador adicionará suas métricas.',
    weight: 'Peso',
    bodyFat: 'Gordura corporal',
    muscle: 'Massa muscular',
    date: 'Data',
    notes: 'Notas',
    kg: 'kg',
    percent: '%',
  },
}

export default async function ProgressPage({ params }: { params: { locale: string } }) {
  const t = texts[params.locale as keyof typeof texts] ?? texts.es
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: records } = await supabase
    .from('progress')
    .select('*')
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

      {/* Latest stats */}
      {records && records.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: t.weight, value: records[0].weight_kg, unit: t.kg, icon: '⚖️' },
            { label: t.bodyFat, value: records[0].body_fat_pct, unit: t.percent, icon: '📊' },
            { label: t.muscle, value: records[0].muscle_mass_kg, unit: t.kg, icon: '💪' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#141414] border border-white/10 rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span>{stat.icon}</span>
                <span className="text-white/50 text-sm">{stat.label}</span>
              </div>
              <p className="text-3xl font-bold text-[#ffd11e]">
                {stat.value != null ? `${stat.value} ${stat.unit}` : '—'}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* History */}
      {!records || records.length === 0 ? (
        <div className="bg-[#141414] border border-white/10 rounded-xl p-8 text-center">
          <p className="text-4xl mb-3">📈</p>
          <p className="text-white/40">{t.empty}</p>
        </div>
      ) : (
        <div className="bg-[#141414] border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/40 font-medium px-5 py-3">{t.date}</th>
                  <th className="text-right text-white/40 font-medium px-5 py-3">{t.weight}</th>
                  <th className="text-right text-white/40 font-medium px-5 py-3">{t.bodyFat}</th>
                  <th className="text-right text-white/40 font-medium px-5 py-3">{t.muscle}</th>
                  <th className="text-left text-white/40 font-medium px-5 py-3">{t.notes}</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id} className="border-b border-white/5 last:border-0 hover:bg-white/2">
                    <td className="px-5 py-3 text-white/70">
                      {new Date(r.created_at).toLocaleDateString(params.locale, {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-5 py-3 text-right text-white">
                      {r.weight_kg != null ? `${r.weight_kg} ${t.kg}` : '—'}
                    </td>
                    <td className="px-5 py-3 text-right text-white">
                      {r.body_fat_pct != null ? `${r.body_fat_pct}${t.percent}` : '—'}
                    </td>
                    <td className="px-5 py-3 text-right text-white">
                      {r.muscle_mass_kg != null ? `${r.muscle_mass_kg} ${t.kg}` : '—'}
                    </td>
                    <td className="px-5 py-3 text-white/50 max-w-xs truncate">
                      {r.notes ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
