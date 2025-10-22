import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { transcript, summary, gratitude_items, mood, metadata } = body

    if (!transcript) {
      return NextResponse.json({ error: 'Transcript is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('journal_entries')
      .insert({
        user_id: user.id,
        transcript,
        summary,
        gratitude_items,
        mood,
        conversation_metadata: metadata,
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving journal entry:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, entry: data })
  } catch (error) {
    console.error('Error in save conversation:', error)
    return NextResponse.json({ error: 'Failed to save conversation' }, { status: 500 })
  }
}
