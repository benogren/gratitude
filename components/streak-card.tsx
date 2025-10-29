import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Flame, Check } from 'lucide-react'

interface StreakCardProps {
  currentStreak: number
  longestStreak: number
  totalEntries: number
  weeklyData: boolean[]
}

export function StreakCard({ currentStreak, longestStreak, totalEntries, weeklyData }: StreakCardProps) {
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Flame className="h-6 w-6" style={{ color: 'var(--primary-500)' }} />
          <CardTitle>Your Streak</CardTitle>
        </div>
        <CardDescription>
          Keep your gratitude practice going strong
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* Current Streak */}
          <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/50 p-6">
            <div className="text-5xl font-bold mb-2" style={{ color: 'var(--primary-600)' }}>
              {currentStreak}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentStreak === 1 ? 'day' : 'days'} current streak
            </div>
          </div>

          {/* This Week */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-center">This Week</div>
            <div className="flex justify-center gap-2">
              {daysOfWeek.map((day, index) => (
                <div key={day} className="flex flex-col items-center gap-1">
                  <div className="text-xs text-muted-foreground">{day}</div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      weeklyData[index]
                        ? 'text-white'
                        : 'bg-muted border'
                    }`}
                    style={weeklyData[index] ? { backgroundColor: 'var(--primary-500)' } : {}}
                  >
                    {weeklyData[index] && <Check className="h-4 w-4" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center rounded-lg border p-4">
              <div className="text-2xl font-bold">
                {longestStreak}
              </div>
              <div className="text-xs text-muted-foreground text-center">
                Longest Streak
              </div>
            </div>
            <div className="flex flex-col items-center rounded-lg border p-4">
              <div className="text-2xl font-bold">
                {totalEntries}
              </div>
              <div className="text-xs text-muted-foreground text-center">
                Total Entries
              </div>
            </div>
          </div>

          {/* Encouragement Message */}
          {currentStreak > 0 && (
            <div className="text-center text-sm text-muted-foreground">
              {currentStreak >= 7 ? (
                "Amazing! You're building a strong gratitude habit!"
              ) : currentStreak >= 3 ? (
                "Great job! Keep it up!"
              ) : (
                "You're on your way! Come back tomorrow!"
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
