import { SignupForm } from '@/components/auth/signup-form'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function SignupPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/home')
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <SignupForm />
    </div>
  )
}
