'use server'

import { createClient } from '@/lib/supabase/server'
import { fetchAndStoreGravatarData } from './gravatar'

export async function handlePostLogin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user?.email) {
    await fetchAndStoreGravatarData(user.id, user.email)
  }
}
