'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useCurrentUserName() {
  const [name, setName] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user?.user_metadata?.full_name) {
        setName(user.user_metadata.full_name)
      }
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.user_metadata?.full_name) {
        setName(session.user.user_metadata.full_name)
      } else {
        setName(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return name
}
