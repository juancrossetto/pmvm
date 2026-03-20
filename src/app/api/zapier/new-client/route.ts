/**
 * POST /api/zapier/new-client
 *
 * Llamado internamente cuando un cliente se registra en la web.
 * Envía los datos a Zapier → Zapier crea el cliente en Trainerize.
 */

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { full_name, email } = await request.json()

  const zapierWebhookUrl = process.env.ZAPIER_NEW_CLIENT_WEBHOOK

  if (!zapierWebhookUrl) {
    // Si no está configurado el webhook, no falla — solo loguea
    console.warn('[Zapier] ZAPIER_NEW_CLIENT_WEBHOOK no configurado, saltando.')
    return NextResponse.json({ ok: true, skipped: true })
  }

  try {
    const res = await fetch(zapierWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, email }),
    })

    if (!res.ok) {
      console.error('[Zapier] Error al notificar nuevo cliente:', await res.text())
      return NextResponse.json({ ok: false }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[Zapier] Fetch error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
