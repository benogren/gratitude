import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Clock, TrendingUp } from 'lucide-react'

interface ConversationStatsCardProps {
  totalConversations: number
  totalDuration: number
  averageDuration: number
  totalMessages: number
  averageMessages: number
}

function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`
  }
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`
}

function formatTotalDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} seconds`
  }
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
  }
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  if (minutes === 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`
  }
  return `${hours}h ${minutes}m`
}

export function ConversationStatsCard({
  totalConversations,
  totalDuration,
  averageDuration,
  totalMessages,
  averageMessages,
}: ConversationStatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6" style={{ color: 'var(--secondary-500)' }} />
          <CardTitle>Conversation Insights</CardTitle>
        </div>
        <CardDescription>
          Your journey with the mindfulness coach
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* Total Time */}
          <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/50 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5" style={{ color: 'var(--secondary-500)' }} />
              <div className="text-3xl font-bold">
                {formatTotalDuration(totalDuration)}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              total conversation time
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center rounded-lg border p-4">
              <div className="text-2xl font-bold">
                {totalConversations}
              </div>
              <div className="text-xs text-muted-foreground text-center">
                Conversations
              </div>
            </div>
            <div className="flex flex-col items-center rounded-lg border p-4">
              <div className="text-2xl font-bold">
                {formatDuration(averageDuration)}
              </div>
              <div className="text-xs text-muted-foreground text-center">
                Avg Duration
              </div>
            </div>
          </div>

          {/* Message Stats */}
          {totalMessages > 0 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center rounded-lg border p-4">
                <div className="text-2xl font-bold">
                  {totalMessages}
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  Total Messages
                </div>
              </div>
              <div className="flex flex-col items-center rounded-lg border p-4">
                <div className="text-2xl font-bold">
                  {averageMessages}
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  Avg Messages
                </div>
              </div>
            </div>
          )}

          {/* Insight */}
          {totalConversations > 0 && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                {averageDuration >= 180 ? (
                  "You're having deep, meaningful conversations with your coach!"
                ) : averageDuration >= 90 ? (
                  "You're engaging well with your mindfulness practice."
                ) : (
                  "Keep practicing - longer conversations can lead to deeper insights."
                )}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
