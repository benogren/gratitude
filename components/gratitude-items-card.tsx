import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart } from 'lucide-react'

interface GratitudeItemsCardProps {
  recentItems: string[]
  topItems: { item: string; count: number }[]
}

export function GratitudeItemsCard({ recentItems, topItems }: GratitudeItemsCardProps) {
  const hasData = recentItems.length > 0 || topItems.length > 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6" style={{ color: 'var(--accent-500)' }} />
          <CardTitle>What You're Grateful For</CardTitle>
        </div>
        <CardDescription>
          The things that bring you joy
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="text-center text-muted-foreground py-8">
            Start journaling to see what you're grateful for
          </div>
        ) : (
          <div className="space-y-6">
            {/* Recent Items */}
            {recentItems.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3">Recent Gratitude</h3>
                <div className="flex flex-wrap gap-2">
                  {recentItems.map((item, index) => (
                    <div
                      key={index}
                      className="px-3 py-1.5 rounded-full text-sm border"
                      style={{
                        backgroundColor: 'var(--accent-50)',
                        color: 'var(--accent-700)',
                        borderColor: 'var(--accent-200)'
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Items */}
            {topItems.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3">Most Mentioned</h3>
                <div className="space-y-2">
                  {topItems.slice(0, 5).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border bg-muted/50"
                    >
                      <span className="text-sm capitalize">{item.item}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.count} {item.count === 1 ? 'time' : 'times'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
