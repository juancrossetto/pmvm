/**
 * POST /api/zapier/purchase
 *
 * Llamado cuando un cliente completa una compra.
 * Envía a Zapier → Zapier asigna el plan/rutina en Trainerize.
 */

import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const { full_name, email, plan_name } = await request.json()

  const zapierWebhookUrl = process.env.ZAPIER_PURCHASE_WEBHOOK

  if (!zapierWebhookUrl) {
    console.warn('[Zapier] ZAPIER_PURCHASE_WEBHOOK no configurado, saltando.')
    return NextResponse.json({ ok: true, skipped: true })
  }

  try {
    const res = await fetch(zapierWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, email, plan_name }),
    })

    if (!res.ok) {
      console.error('[Zapier] Error al notificar compra:', await res.text())
      return NextResponse.json({ ok: false }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[Zapier] Fetch error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
