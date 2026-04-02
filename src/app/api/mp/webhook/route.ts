import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const PLAN_DAYS: Record<string, number> = {
  monthly: 30,
  quarterly: 90,
  semiannual: 180,
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('MP Webhook recibido:', JSON.stringify(body))

    // MP envía type=payment cuando se aprueba un pago
    if (body.type !== 'payment' || !body.data?.id) {
      return NextResponse.json({ ok: true })
    }

    const paymentId = body.data.id
    const mpAccessToken = process.env.MP_ACCESS_TOKEN

    // Obtener detalles del pago desde MP
    const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${mpAccessToken}` },
    })

    if (!paymentRes.ok) {
      console.error('Error al obtener pago de MP')
      return NextResponse.json({ error: 'Error MP' }, { status: 500 })
    }

    const payment = await paymentRes.json()
    console.log('MP Payment status:', payment.status, 'external_ref:', payment.external_reference)

    // Solo procesar pagos aprobados
    if (payment.status !== 'approved') {
      return NextResponse.json({ ok: true, skipped: `status=${payment.status}` })
    }

    const subscriptionId = payment.external_reference
    if (!subscriptionId) {
      console.error('Sin external_reference en el pago')
      return NextResponse.json({ ok: true })
    }

    const supabase = createClient()

    // Obtener la suscripción
    const { data: sub, error: subError } = await supabase
      .from('subscriptions')
      .select('*, plans(duration_days)')
      .eq('id', subscriptionId)
      .single()

    if (subError || !sub) {
      console.error('Suscripción no encontrada:', subscriptionId)
      return NextResponse.json({ error: 'Suscripción no encontrada' }, { status: 404 })
    }

    // Calcular fechas
    const startedAt = new Date()
    const days = PLAN_DAYS[sub.plan_id] ?? 30
    const expiresAt = new Date(startedAt.getTime() + days * 24 * 60 * 60 * 1000)

    // Activar suscripción
    await supabase
      .from('subscriptions')
      .update({
        status: 'active',
        mp_payment_id: String(paymentId),
        mp_status: payment.status,
        started_at: startedAt.toISOString(),
        expires_at: expiresAt.toISOString(),
      })
      .eq('id', subscriptionId)

    // Obtener datos del usuario para notificaciones
    const { data: { user } } = await supabase.auth.admin.getUserById(sub.user_id)
    const userEmail = user?.email ?? payment.payer?.email ?? ''
    const userName = user?.user_metadata?.full_name ?? userEmail.split('@')[0]

    // Obtener teléfono del perfil
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, phone')
      .eq('id', sub.user_id)
      .single()

    const displayName = profile?.full_name ?? userName
    const phone = profile?.phone ?? ''

    const planNames: Record<string, string> = {
      monthly: 'Plan Mensual',
      quarterly: 'Plan Trimestral',
      semiannual: 'Plan Semestral',
    }
    const planName = planNames[sub.plan_id] ?? sub.plan_id

    // Disparar notificaciones en paralelo (fire-and-forget)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    Promise.all([
      // Email
      sendEmail({ userEmail, displayName, planName, days, expiresAt }),
      // WhatsApp (solo si tiene teléfono)
      phone ? sendWhatsApp({ phone, displayName, planName, days }) : Promise.resolve(),
    ]).catch(err => console.error('Error en notificaciones:', err))

    return NextResponse.json({ ok: true, activated: subscriptionId })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// ── Email via Resend ─────────────────────────────────────────────────
async function sendEmail({
  userEmail,
  displayName,
  planName,
  days,
  expiresAt,
}: {
  userEmail: string
  displayName: string
  planName: string
  days: number
  expiresAt: Date
}) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) { console.warn('RESEND_API_KEY no configurado'); return }

  const expiresFormatted = expiresAt.toLocaleDateString('es-AR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: -apple-system, sans-serif; background: #0e0e0e; color: #fff; margin: 0; padding: 0; }
  .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
  .logo { font-size: 28px; font-weight: 900; letter-spacing: -1px; color: #c1ed00; margin-bottom: 32px; }
  .title { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
  .subtitle { color: #aaa; font-size: 15px; margin-bottom: 32px; }
  .card { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px; margin-bottom: 24px; }
  .plan-badge { display: inline-block; background: #c1ed00; color: #0e0e0e; font-weight: 700; font-size: 13px; padding: 4px 12px; border-radius: 100px; margin-bottom: 16px; }
  .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #2a2a2a; font-size: 14px; }
  .info-row:last-child { border-bottom: none; }
  .info-label { color: #888; }
  .info-value { color: #fff; font-weight: 600; }
  .cta { display: block; background: #c1ed00; color: #0e0e0e; text-align: center; padding: 14px 24px; border-radius: 12px; font-weight: 700; font-size: 16px; text-decoration: none; margin: 24px 0; }
  .section-title { font-size: 13px; font-weight: 700; color: #c1ed00; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
  .step { display: flex; gap: 12px; margin-bottom: 16px; font-size: 14px; color: #ccc; }
  .step-num { background: #c1ed00; color: #0e0e0e; font-weight: 700; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; }
  .footer { color: #555; font-size: 12px; text-align: center; margin-top: 32px; }
</style></head>
<body>
<div class="container">
  <div class="logo">R3SET</div>
  <div class="title">¡Bienvenido, ${displayName}! 🎉</div>
  <div class="subtitle">Tu acceso está activo. Es hora de transformarte.</div>

  <div class="card">
    <div class="plan-badge">${planName}</div>
    <div class="info-row"><span class="info-label">Estado</span><span class="info-value" style="color:#c1ed00">✓ Activo</span></div>
    <div class="info-row"><span class="info-label">Duración</span><span class="info-value">${days} días</span></div>
    <div class="info-row"><span class="info-label">Vence el</span><span class="info-value">${expiresFormatted}</span></div>
  </div>

  <a href="${process.env.NEXT_PUBLIC_SITE_URL}/es/dashboard" class="cta">Acceder a mi Dashboard →</a>

  <div class="card">
    <div class="section-title">Cómo empezar en Trainerize</div>
    <div class="step"><div class="step-num">1</div><div>Descargá la app <strong>Trainerize</strong> en tu teléfono (iOS o Android)</div></div>
    <div class="step"><div class="step-num">2</div><div>Ingresá con el email con el que compraste: <strong>${userEmail}</strong></div></div>
    <div class="step"><div class="step-num">3</div><div>Tu contraseña inicial es: <strong>R3SET2024</strong> (cambiala en tu primer ingreso)</div></div>
    <div class="step"><div class="step-num">4</div><div>¡Listo! Ya podés ver tus rutinas personalizadas</div></div>
  </div>

  <div class="footer">
    Pesar Menos Vivir Más · R3SET Program<br>
    Si tenés alguna duda, respondé este email.
  </div>
</div>
</body>
</html>
  `

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: 'R3SET <hola@pesarmenosvivirmas.com>',
      to: [userEmail],
      subject: `✅ ¡Tu ${planName} R3SET está activo!`,
      html,
    }),
  })

  console.log('Email enviado a:', userEmail)
}

// ── WhatsApp via Twilio ──────────────────────────────────────────────
async function sendWhatsApp({
  phone,
  displayName,
  planName,
  days,
}: {
  phone: string
  displayName: string
  planName: string
  days: number
}) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_WHATSAPP_FROM // 'whatsapp:+14155238886'
  if (!accountSid || !authToken || !fromNumber) {
    console.warn('Twilio no configurado, saltando WhatsApp')
    return
  }

  // Normalizar número (asegurar formato internacional)
  const toNumber = phone.startsWith('+') ? phone : `+54${phone.replace(/^0/, '')}`

  const message = `¡Hola ${displayName}! 🎉

Tu *${planName} R3SET* ya está activo.

Para empezar:
1. Descargá la app *Trainerize*
2. Ingresá con tu email
3. Contraseña inicial: *R3SET2024*

Tu dashboard: ${process.env.NEXT_PUBLIC_SITE_URL}/es/dashboard

¡Vamos! 💪`

  const credentials = Buffer.from(`${accountSid}:${authToken}`).toString('base64')

  await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        From: fromNumber,
        To: `whatsapp:${toNumber}`,
        Body: message,
      }),
    }
  )

  console.log('WhatsApp enviado a:', toNumber)
}
