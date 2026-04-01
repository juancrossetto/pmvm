import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { client_email, client_name, message_content, message_id } = body
  if (!client_email || !message_content)
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const url = process.env.ZAPIER_SEND_MESSAGE_WEBHOOK
  if (!url) { console.warn('[Zapier] ZAPIER_SEND_MESSAGE_WEBHOOK not set'); return NextResponse.json({ ok: true, skipped: true }) }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_email, client_name, message_content, message_id, sent_at: new Date().toISOString(), sender: 'coach' }),
    })
    if (!res.ok) return NextResponse.json({ ok: false }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (err) { return NextResponse.json({ ok: false }, { status: 500 }) }
}
