import { revalidatePath } from "next/cache"
import type { NextRequest } from "next/server"
import { parseBody } from "next-sanity/webhook"

// Sanity webhook target: pages cache for an hour, and any published edit refreshes them all.
// Set SANITY_REVALIDATE_SECRET here and as the webhook's secret in sanity.io/manage.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) return new Response("Missing SANITY_REVALIDATE_SECRET", { status: 500 })

  const { isValidSignature } = await parseBody(req, secret)
  if (!isValidSignature) return new Response("Invalid signature", { status: 401 })

  revalidatePath("/", "layout")
  return Response.json({ revalidated: true, now: Date.now() })
}
