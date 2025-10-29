'use server'

import { createClient } from '@/lib/supabase/server'
import { calculateStreak } from '@/lib/streak'

export interface ConversationMetadata {
  timestamp?: string
  conversationId?: string | null
  startTime?: string | null
  endTime?: string | null
  duration?: number | null
  messageCount?: number
  connectionType?: 'websocket' | 'webrtc' | null
  [key: string]: any
}

export interface JournalEntry {
  transcript: string
  summary?: string
  gratitude_items?: string[]
  mood?: string
  conversation_metadata?: ConversationMetadata
}

export async function saveJournalEntry(entry: JournalEntry) {
  const supabase = await createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const { error } = await supabase
      .from('journal_entries')
      .insert({
        user_id: user.id,
        transcript: entry.transcript,
        summary: entry.summary,
        gratitude_items: entry.gratitude_items,
        mood: entry.mood,
        conversation_metadata: entry.conversation_metadata,
      })

    if (error) {
      console.error('Error saving journal entry:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error in saveJournalEntry:', error)
    return { success: false, error: 'Failed to save journal entry' }
  }
}

export async function getJournalEntries(limit = 10) {
  const supabase = await createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: 'Not authenticated', entries: [] }
    }

    const { data: entries, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching journal entries:', error)
      return { success: false, error: error.message, entries: [] }
    }

    return { success: true, entries: entries || [] }
  } catch (error) {
    console.error('Error in getJournalEntries:', error)
    return { success: false, error: 'Failed to fetch journal entries', entries: [] }
  }
}

export async function getUserStreak() {
  const supabase = await createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return {
        success: false,
        error: 'Not authenticated',
        streak: {
          currentStreak: 0,
          longestStreak: 0,
          totalEntries: 0,
          lastEntryDate: null,
        }
      }
    }

    // Fetch ALL entries to calculate accurate streaks
    const { data: entries, error } = await supabase
      .from('journal_entries')
      .select('created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching journal entries for streak:', error)
      return {
        success: false,
        error: error.message,
        streak: {
          currentStreak: 0,
          longestStreak: 0,
          totalEntries: 0,
          lastEntryDate: null,
        }
      }
    }

    const streak = calculateStreak(entries || [])

    return { success: true, streak }
  } catch (error) {
    console.error('Error in getUserStreak:', error)
    return {
      success: false,
      error: 'Failed to fetch streak data',
      streak: {
        currentStreak: 0,
        longestStreak: 0,
        totalEntries: 0,
        lastEntryDate: null,
      }
    }
  }
}

export async function getConversationStats() {
  const supabase = await createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return {
        success: false,
        error: 'Not authenticated',
        stats: {
          totalConversations: 0,
          totalDuration: 0,
          averageDuration: 0,
          totalMessages: 0,
          averageMessages: 0,
          lastConversationDate: null,
        }
      }
    }

    // Fetch all entries with conversation metadata
    const { data: entries, error } = await supabase
      .from('journal_entries')
      .select('conversation_metadata, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching journal entries for stats:', error)
      return {
        success: false,
        error: error.message,
        stats: {
          totalConversations: 0,
          totalDuration: 0,
          averageDuration: 0,
          totalMessages: 0,
          averageMessages: 0,
          lastConversationDate: null,
        }
      }
    }

    // Calculate statistics
    let totalDuration = 0
    let totalMessages = 0
    let conversationsWithDuration = 0
    let conversationsWithMessages = 0

    entries?.forEach(entry => {
      const metadata = entry.conversation_metadata as ConversationMetadata | undefined

      if (metadata?.duration && metadata.duration > 0) {
        totalDuration += metadata.duration
        conversationsWithDuration++
      }

      if (metadata?.messageCount && metadata.messageCount > 0) {
        totalMessages += metadata.messageCount
        conversationsWithMessages++
      }
    })

    const stats = {
      totalConversations: entries?.length || 0,
      totalDuration,
      averageDuration: conversationsWithDuration > 0
        ? Math.round(totalDuration / conversationsWithDuration)
        : 0,
      totalMessages,
      averageMessages: conversationsWithMessages > 0
        ? Math.round(totalMessages / conversationsWithMessages)
        : 0,
      lastConversationDate: entries?.[0]?.created_at || null,
    }

    return { success: true, stats }
  } catch (error) {
    console.error('Error in getConversationStats:', error)
    return {
      success: false,
      error: 'Failed to fetch conversation stats',
      stats: {
        totalConversations: 0,
        totalDuration: 0,
        averageDuration: 0,
        totalMessages: 0,
        averageMessages: 0,
        lastConversationDate: null,
      }
    }
  }
}

export async function getJournalEntryById(id: string) {
  const supabase = await createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return {
        success: false,
        error: 'Not authenticated',
        entry: null,
      }
    }

    const { data: entry, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error) {
      console.error('Error fetching journal entry:', error)
      return {
        success: false,
        error: error.message,
        entry: null,
      }
    }

    return { success: true, entry }
  } catch (error) {
    console.error('Error in getJournalEntryById:', error)
    return {
      success: false,
      error: 'Failed to fetch journal entry',
      entry: null,
    }
  }
}

export async function getGratitudeData() {
  const supabase = await createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return {
        success: false,
        error: 'Not authenticated',
        data: {
          recentGratitudeItems: [],
          topGratitudeItems: [],
          recentMoods: [],
          recentSummaries: [],
        }
      }
    }

    // Fetch recent entries with gratitude items, mood, and summary
    const { data: entries, error } = await supabase
      .from('journal_entries')
      .select('id, gratitude_items, mood, summary, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(30)

    if (error) {
      console.error('Error fetching gratitude data:', error)
      return {
        success: false,
        error: error.message,
        data: {
          recentGratitudeItems: [],
          topGratitudeItems: [],
          recentMoods: [],
          recentSummaries: [],
        }
      }
    }

    // Process gratitude items
    const allGratitudeItems: string[] = []
    const gratitudeItemCounts: Record<string, number> = {}

    entries?.forEach(entry => {
      if (entry.gratitude_items && Array.isArray(entry.gratitude_items)) {
        entry.gratitude_items.forEach((item: string) => {
          allGratitudeItems.push(item)
          const lowerItem = item.toLowerCase().trim()
          gratitudeItemCounts[lowerItem] = (gratitudeItemCounts[lowerItem] || 0) + 1
        })
      }
    })

    // Get top gratitude items
    const topGratitudeItems = Object.entries(gratitudeItemCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([item, count]) => ({ item, count }))

    // Get recent unique gratitude items (last 10)
    const recentGratitudeItems = allGratitudeItems.slice(0, 10)

    // Get recent moods
    const recentMoods = entries
      ?.filter(entry => entry.mood)
      .slice(0, 7)
      .map(entry => ({
        mood: entry.mood,
        date: entry.created_at
      })) || []

    // Get recent summaries
    const recentSummaries = entries
      ?.filter(entry => entry.summary)
      .slice(0, 5)
      .map(entry => ({
        id: entry.id,
        summary: entry.summary,
        date: entry.created_at
      })) || []

    return {
      success: true,
      data: {
        recentGratitudeItems,
        topGratitudeItems,
        recentMoods,
        recentSummaries,
      }
    }
  } catch (error) {
    console.error('Error in getGratitudeData:', error)
    return {
      success: false,
      error: 'Failed to fetch gratitude data',
      data: {
        recentGratitudeItems: [],
        topGratitudeItems: [],
        recentMoods: [],
        recentSummaries: [],
      }
    }
  }
}
