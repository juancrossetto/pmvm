import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { client_email, client_name, routine_name, routine_id, category, exercises } = body
  if (!client_email || !routine_name)
    return NextResponse.json({ error: 'Missing client_email or routine_name' }, { status: 400 })

  const url = process.env.ZAPIER_ASSIGN_ROUTINE_WEBHOOK
  if (!url) { console.warn('[Zapier] ZAPIER_ASSIGN_ROUTINE_WEBHOOK not set'); return NextResponse.json({ ok: true, skipped: true }) }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_email, client_name, routine_name, routine_id, category,
        exercises_count: exercises?.length ?? 0,
        exercises: (exercises ?? []).map((e: any) => ({ name: e.name, sets: e.sets, reps: e.reps, rest: e.rest, muscle_group: e.muscle_group })),
        assigned_at: new Date().toISOString(),
      }),
    })
    if (!res.ok) return NextResponse.json({ ok: false }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (err) { return NextResponse.json({ ok: false }, { status: 500 }) }
}
