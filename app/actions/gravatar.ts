'use server'

import { createClient } from '@/lib/supabase/server'
import { fetchGravatarProfile } from '@/lib/gravatar'

export async function fetchAndStoreGravatarData(userId: string, email: string) {
  const supabase = await createClient()

  try {
    // Check if Gravatar data has already been fetched
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('gravatar_fetched')
      .eq('id', userId)
      .single()

    if (profile?.gravatar_fetched) {
      // Already fetched, skip
      return { success: true, alreadyFetched: true }
    }

    // Fetch Gravatar profile data
    const gravatarData = await fetchGravatarProfile(email)

    if (!gravatarData) {
      // No Gravatar profile found, mark as fetched to avoid future calls
      await supabase
        .from('user_profiles')
        .update({ gravatar_fetched: true })
        .eq('id', userId)

      return { success: true, noProfile: true }
    }

    // Update user_profiles with Gravatar data
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        gravatar_hash: gravatarData.hash,
        avatar_url: gravatarData.avatar_url || null,
        location: gravatarData.location || null,
        job_title: gravatarData.job_title || null,
        company: gravatarData.company || null,
        gravatar_fetched: true,
      })
      .eq('id', userId)

    if (updateError) {
      console.error('Error updating user profile with Gravatar data:', updateError)
      return { success: false, error: updateError.message }
    }

    // Update auth user metadata with avatar_url
    if (gravatarData.avatar_url) {
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          avatar_url: gravatarData.avatar_url,
        },
      })

      if (authError) {
        console.error('Error updating auth metadata:', authError)
      }
    }

    return { success: true, data: gravatarData }
  } catch (error) {
    console.error('Error in fetchAndStoreGravatarData:', error)
    return { success: false, error: 'Failed to fetch Gravatar data' }
  }
}
