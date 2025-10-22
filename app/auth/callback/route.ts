import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { fetchAndStoreGravatarData } from '@/app/actions/gravatar'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)

    // Fetch Gravatar data after successful authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.email) {
      await fetchAndStoreGravatarData(user.id, user.email)
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${origin}/home`)
}
