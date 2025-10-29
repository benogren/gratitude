import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Smile } from 'lucide-react'

interface MoodTrackerCardProps {
  recentMoods: { mood: string; date: string }[]
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function MoodTrackerCard({ recentMoods }: MoodTrackerCardProps) {
  const hasData = recentMoods.length > 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Smile className="h-6 w-6 text-yellow-500" />
          <CardTitle>Mood Tracker</CardTitle>
        </div>
        <CardDescription>
          How you've been feeling lately
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="text-center text-muted-foreground py-8">
            Your mood history will appear here
          </div>
        ) : (
          <div className="space-y-3">
            {recentMoods.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border bg-muted/50"
              >
                <span className="text-sm font-medium capitalize">{entry.mood}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(entry.date)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
