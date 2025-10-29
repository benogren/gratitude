import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { StreakCard } from '@/components/streak-card'
import { ConversationStatsCard } from '@/components/conversation-stats-card'
import { GratitudeItemsCard } from '@/components/gratitude-items-card'
import { MoodTrackerCard } from '@/components/mood-tracker-card'
import { RecentSummariesCard } from '@/components/recent-summaries-card'
import { Button } from '@/components/ui/button'
import { getUserStreak, getConversationStats, getGratitudeData } from '@/app/actions/journal'
import { fetchAndStoreGravatarData } from '@/app/actions/gravatar'
import { Mic } from 'lucide-react'

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

  // Fetch user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch streak data, conversation stats, and gratitude data
  const streakData = await getUserStreak()
  const conversationData = await getConversationStats()
  const gratitudeData = await getGratitudeData()

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-6xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              {profile?.full_name || user.email}
            </p>
          </div>
          <Link href="/journal/new">
            <Button size="lg" className="gap-2">
              <Mic className="h-5 w-5" />
              Start New Entry
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <StreakCard
              currentStreak={streakData.streak.currentStreak}
              longestStreak={streakData.streak.longestStreak}
              totalEntries={streakData.streak.totalEntries}
            />
            <ConversationStatsCard
              totalConversations={conversationData.stats.totalConversations}
              totalDuration={conversationData.stats.totalDuration}
              averageDuration={conversationData.stats.averageDuration}
              totalMessages={conversationData.stats.totalMessages}
              averageMessages={conversationData.stats.averageMessages}
            />
            <MoodTrackerCard
              recentMoods={gratitudeData.data.recentMoods}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <GratitudeItemsCard
              recentItems={gratitudeData.data.recentGratitudeItems}
              topItems={gratitudeData.data.topGratitudeItems}
            />
            <RecentSummariesCard
              recentSummaries={gratitudeData.data.recentSummaries}
            />
          </div>
        </div>
      </div>
    </>
  )
}
