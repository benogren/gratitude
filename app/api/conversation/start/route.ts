import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID

    if (!agentId) {
      return NextResponse.json({ error: 'Agent ID not configured' }, { status: 500 })
    }

    // Return agent configuration for client to connect
    return NextResponse.json({
      agentId,
      userId: user.id,
    })
  } catch (error) {
    console.error('Error starting conversation:', error)
    return NextResponse.json({ error: 'Failed to start conversation' }, { status: 500 })
  }
}
