import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// 5 intentos por IP cada 10 minutos (sliding window)
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '10 m'),
  analytics: false,
})

export function getIp(req: Request): string {
  return (
    (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() ||
    'unknown'
  )
}

// Si Upstash está caído/mal configurado, no debe tumbar el formulario:
// se permite la solicitud (sin límite anti-spam) y se loguea el problema.
export async function checkRateLimit(key: string): Promise<{ success: boolean }> {
  try {
    return await ratelimit.limit(key)
  } catch (err) {
    console.error('Rate limit no disponible (Upstash inalcanzable), permitiendo solicitud:', err)
    return { success: true }
  }
}
