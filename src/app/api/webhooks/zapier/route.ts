/**
 * POST /api/webhooks/zapier
 *
 * Endpoint que recibe datos desde Zapier cuando algo ocurre en Trainerize.
 * Zapier configura este webhook como "action" en el Zap.
 *
 * Eventos soportados:
 *  - progress_update  → guarda nuevo registro de progreso
 *  - new_message      → guarda mensaje del entrenador desde Trainerize
 *  - workout_complete → registra actividad completada
 */

import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Usamos el service role para escribir sin restricciones de RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export async function POST(request: NextRequest) {
  // Validar secret para que solo Zapier pueda llamar este endpoint
  const authHeader = request.headers.get('x-webhook-secret')
  if (authHeader !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { event, email, data } = body

  if (!event || !email) {
    return NextResponse.json({ error: 'Missing event or email' }, { status: 400 })
  }

  // Buscar el cliente por email
  const { data: { users }, error: userError } = await supabase.auth.admin.listUsers()
  if (userError) return NextResponse.json({ error: 'DB error' }, { status: 500 })

  const user = users.find((u) => u.email === email)
  if (!user) {
    return NextResponse.json({ error: `No user found for email: ${email}` }, { status: 404 })
  }

  switch (event) {

    // ── Progreso desde Trainerize ─────────────────────────────────────
    case 'progress_update': {
      const { weight_kg, body_fat_pct, muscle_mass_kg, notes } = data ?? {}
      const { error } = await supabase.from('progress').insert({
        client_id: user.id,
        weight_kg:      weight_kg      ? parseFloat(weight_kg)      : null,
        body_fat_pct:   body_fat_pct   ? parseFloat(body_fat_pct)   : null,
        muscle_mass_kg: muscle_mass_kg ? parseFloat(muscle_mass_kg) : null,
        notes: notes ?? `Sincronizado desde Trainerize`,
      })
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ ok: true, event, user_id: user.id })
    }

    // ── Mensaje desde Trainerize ──────────────────────────────────────
    case 'new_message': {
      const { content } = data ?? {}
      if (!content) return NextResponse.json({ error: 'Missing content' }, { status: 400 })
      const { error } = await supabase.from('messages').insert({
        client_id: user.id,
        content,
        sender_role: 'trainer',
        read: false,
      })
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ ok: true, event, user_id: user.id })
    }

    // ── Workout completado en Trainerize ──────────────────────────────
    case 'workout_complete': {
      const { workout_name } = data ?? {}
      const { error } = await supabase.from('messages').insert({
        client_id: user.id,
        content: `💪 Completaste el entrenamiento "${workout_name ?? 'workout'}" en Trainerize. ¡Excelente trabajo!`,
        sender_role: 'trainer',
        read: false,
      })
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ ok: true, event, user_id: user.id })
    }

    default:
      return NextResponse.json({ error: `Unknown event: ${event}` }, { status: 400 })
  }
}
