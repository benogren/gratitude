'use server'

import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function deleteAccount(userId: string) {
  try {
    // Create admin client with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Delete the user from auth.users (cascade will delete user_profiles)
    const { error } = await supabase.auth.admin.deleteUser(userId)

    if (error) {
      console.error('Error deleting user:', error)
      return { success: false, error: error.message }
    }

    // Clear cookies
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll()
    allCookies.forEach(cookie => {
      cookieStore.delete(cookie.name)
    })

    return { success: true }
  } catch (error) {
    console.error('Error in deleteAccount:', error)
    return { success: false, error: 'Failed to delete account' }
  }
}
