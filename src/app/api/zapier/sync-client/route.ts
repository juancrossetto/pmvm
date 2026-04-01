import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const { full_name, email, phone, goal } = await request.json()
  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

  const url = process.env.ZAPIER_NEW_CLIENT_WEBHOOK
  if (!url) { console.warn('[Zapier] ZAPIER_NEW_CLIENT_WEBHOOK not set'); return NextResponse.json({ ok: true, skipped: true }) }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, email, phone, goal, sync_trigger: 'manual' }),
    })
    if (!res.ok) return NextResponse.json({ ok: false }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (err) { return NextResponse.json({ ok: false }, { status: 500 }) }
}
