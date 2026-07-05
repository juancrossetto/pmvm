import { NextRequest, NextResponse } from 'next/server'

// GET — verificación de webhook por Meta
export async function GET(req: NextRequest) {
  const mode      = req.nextUrl.searchParams.get('hub.mode')
  const token     = req.nextUrl.searchParams.get('hub.verify_token')
  const challenge = req.nextUrl.searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.META_WEBHOOK_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 })
  }

  return new NextResponse('Forbidden', { status: 403 })
}

// POST — mensajes entrantes de WhatsApp (sin procesar por ahora)
export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log('WhatsApp webhook received:', JSON.stringify(body, null, 2))
  return NextResponse.json({ status: 'ok' }, { status: 200 })
}
