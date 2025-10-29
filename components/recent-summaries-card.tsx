import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface RecentSummariesCardProps {
  recentSummaries: { id: string; summary: string; date: string }[]
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

export function RecentSummariesCard({ recentSummaries }: RecentSummariesCardProps) {
  const hasData = recentSummaries.length > 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" style={{ color: 'var(--secondary-500)' }} />
          <CardTitle>Recent Journal Entries</CardTitle>
        </div>
        <CardDescription>
          Your recent reflections
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="text-center text-muted-foreground py-8">
            Your journal summaries will appear here
          </div>
        ) : (
          <div className="space-y-3">
            {recentSummaries.map((entry) => (
              <Link
                key={entry.id}
                href={`/journal/${entry.id}`}
                className="block group"
              >
                <div className="p-4 rounded-lg border bg-muted/50 space-y-2 transition-colors hover:bg-muted cursor-pointer">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm flex-1">{entry.summary}</p>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-0.5" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(entry.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
