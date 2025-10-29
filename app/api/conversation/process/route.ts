import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { transcript } = body

    if (!transcript || typeof transcript !== 'string') {
      return NextResponse.json(
        { error: 'Transcript is required and must be a string' },
        { status: 400 }
      )
    }

    const anthropic = new Anthropic({
      apiKey,
    })

    let message
    try {
      message = await anthropic.messages.create({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `You are analyzing a gratitude journal conversation between a user and their mindfulness coach. Please analyze the following conversation transcript and extract:

1. A brief summary (1-2 sentences) written in second person addressing the user directly (e.g., "You shared...", "You reflected on...", "You expressed gratitude for..."). Make it warm, personal, and encouraging.
2. A list of specific gratitude items mentioned (as an array of strings, keeping them concise)
3. The user's overall mood/emotional state (one word or short phrase like "grateful", "reflective", "joyful", "peaceful", etc.)

Please respond ONLY with valid JSON in this exact format:
{
  "summary": "string",
  "gratitude_items": ["string", "string"],
  "mood": "string"
}

Conversation transcript:
${transcript}`,
          },
        ],
      })
    } catch (apiError: any) {
      console.error('Anthropic API error:', apiError.message)
      return NextResponse.json(
        {
          error: 'Failed to call Anthropic API',
          details: apiError.message
        },
        { status: 500 }
      )
    }

    // Extract the text content from Claude's response
    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''

    // Parse the JSON response
    let result
    try {
      // Try to extract JSON if it's wrapped in markdown code blocks
      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) ||
                       responseText.match(/```\s*([\s\S]*?)\s*```/) ||
                       [null, responseText]

      const jsonString = jsonMatch[1] || responseText
      result = JSON.parse(jsonString.trim())
    } catch (parseError) {
      console.error('Error parsing Claude response:', parseError)
      console.error('Response text:', responseText)
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      )
    }

    // Validate the response structure
    if (!result.summary || !Array.isArray(result.gratitude_items) || !result.mood) {
      console.error('Invalid response structure:', result)
      return NextResponse.json(
        { error: 'Invalid response structure from AI' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      summary: result.summary,
      gratitude_items: result.gratitude_items,
      mood: result.mood,
    })
  } catch (error) {
    console.error('Error processing conversation:', error)
    return NextResponse.json(
      { error: 'Failed to process conversation' },
      { status: 500 }
    )
  }
}
