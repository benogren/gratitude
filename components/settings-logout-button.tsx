'use client'

import { Button } from './ui/button'
import { createClient } from '@/lib/supabase/client'

export function SettingsLogoutButton() {
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <Button variant="outline" className='w-full mt-0' onClick={handleLogout}>
      Sign Out
    </Button>
  )
}
