'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useCurrentUserImage() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user?.user_metadata?.avatar_url) {
        setProfileImage(user.user_metadata.avatar_url)
      }
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.user_metadata?.avatar_url) {
        setProfileImage(session.user.user_metadata.avatar_url)
      } else {
        setProfileImage(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return profileImage
}
