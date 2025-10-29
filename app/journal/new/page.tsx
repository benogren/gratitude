import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { VoiceJournal } from '@/components/voice-journal'
import { fetchAndStoreGravatarData } from '@/app/actions/gravatar'

export default async function NewJournalPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch Gravatar data if not already fetched
  if (user.email) {
    await fetchAndStoreGravatarData(user.id, user.email)
  }

  // Fetch user profile to get display name
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('display_name, full_name')
    .eq('id', user.id)
    .single()

  const userName = profile?.display_name || profile?.full_name || user.email?.split('@')[0] || 'there'

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-4xl p-6">
        <VoiceJournal userName={userName} autoStart={true} />
      </div>
    </>
  )
}
