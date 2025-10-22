'use server'

import { createClient } from '@/lib/supabase/server'

export interface JournalEntry {
  transcript: string
  summary?: string
  gratitude_items?: string[]
  mood?: string
  conversation_metadata?: Record<string, any>
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
