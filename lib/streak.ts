/**
 * Calculates streak data from journal entries
 */

interface JournalEntry {
  created_at: string
}

interface StreakData {
  currentStreak: number
  longestStreak: number
  totalEntries: number
  lastEntryDate: string | null
  weeklyData: boolean[] // Sunday (0) to Saturday (6)
}

/**
 * Calculates the current and longest streak from journal entries
 * A streak is maintained if there's at least one entry per day
 */
export function calculateStreak(entries: JournalEntry[]): StreakData {
  if (entries.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalEntries: 0,
      lastEntryDate: null,
      weeklyData: [false, false, false, false, false, false, false],
    }
  }

  // Sort entries by date (most recent first)
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  // Get unique dates (ignoring time)
  const uniqueDates = new Set(
    sortedEntries.map(entry => {
      const date = new Date(entry.created_at)
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    })
  )

  const sortedUniqueDates = Array.from(uniqueDates).sort((a, b) =>
    new Date(b).getTime() - new Date(a).getTime()
  )

  // Calculate current streak
  let currentStreak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let checkDate = new Date(today)

  for (const dateStr of sortedUniqueDates) {
    const entryDate = new Date(dateStr)
    entryDate.setHours(0, 0, 0, 0)

    const daysDiff = Math.floor((checkDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDiff === 0) {
      // Entry is on the check date
      currentStreak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else if (daysDiff === 1 && currentStreak === 0) {
      // Allow streak to start from yesterday if no entry today
      currentStreak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      // Streak is broken
      break
    }
  }

  // Calculate longest streak
  let longestStreak = 0
  let tempStreak = 1

  for (let i = 0; i < sortedUniqueDates.length - 1; i++) {
    const currentDate = new Date(sortedUniqueDates[i])
    const nextDate = new Date(sortedUniqueDates[i + 1])

    const daysDiff = Math.floor((currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDiff === 1) {
      // Consecutive days
      tempStreak++
    } else {
      // Streak broken
      longestStreak = Math.max(longestStreak, tempStreak)
      tempStreak = 1
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak)

  // Calculate weekly data (which days this week have entries)
  const weeklyData: boolean[] = [false, false, false, false, false, false, false]
  const currentDayOfWeek = today.getDay() // 0 = Sunday, 6 = Saturday

  // Get the start of the current week (Sunday)
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - currentDayOfWeek)
  startOfWeek.setHours(0, 0, 0, 0)

  // Get the end of the current week (Saturday)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  endOfWeek.setHours(23, 59, 59, 999)

  // Check each entry to see if it falls within this week
  sortedEntries.forEach(entry => {
    const entryDate = new Date(entry.created_at)
    if (entryDate >= startOfWeek && entryDate <= endOfWeek) {
      const dayIndex = entryDate.getDay()
      weeklyData[dayIndex] = true
    }
  })

  return {
    currentStreak,
    longestStreak,
    totalEntries: entries.length,
    lastEntryDate: sortedEntries[0].created_at,
    weeklyData,
  }
}
