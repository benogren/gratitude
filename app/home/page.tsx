import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { VoiceJournal } from '@/components/voice-journal'
import { fetchAndStoreGravatarData } from '@/app/actions/gravatar'

export default async function HomePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch Gravatar data if not already fetched
  if (user.email) {
    await fetchAndStoreGravatarData(user.id, user.email)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-4xl p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Voice Journal</h1>
          <p className="text-muted-foreground">Reflect on your day with your AI mindfulness coach</p>
        </div>

        <VoiceJournal />
      </div>
    </>
  )
}
