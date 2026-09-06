import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { redis } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { count, error } = await supabase
    .from('plans')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('Keep-alive: error consultando Supabase:', error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  // Evita que Upstash borre la base de rate-limiting por inactividad (14 días sin uso).
  let upstashOk = true
  try {
    await redis.set('keep-alive:last-ping', new Date().toISOString())
  } catch (upstashErr) {
    upstashOk = false
    console.error('Keep-alive: error consultando Upstash:', upstashErr)
  }

  return NextResponse.json({ ok: true, timestamp: new Date().toISOString(), plansCount: count, upstashOk })
}
