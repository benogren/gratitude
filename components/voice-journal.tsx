'use client'

import { useState } from 'react'
import { useConversation } from '@elevenlabs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Alert, AlertDescription } from './ui/alert'
import { Save } from 'lucide-react'

export function VoiceJournal() {
  const [transcript, setTranscript] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to agent')
      setSaveMessage(null)
    },
    onDisconnect: () => {
      console.log('Disconnected from agent')
    },
    onMessage: (message) => {
      console.log('Message:', message)
      // Append messages to transcript
      if (message.message) {
        setTranscript(prev => prev + `\n${message.source}: ${message.message}`)
      }
    },
    onError: (error) => {
      console.error('Conversation error:', error)
      setSaveMessage({ type: 'error', text: 'Connection error occurred' })
    },
  })

  const handleSaveEntry = async () => {
    if (!transcript.trim()) {
      setSaveMessage({ type: 'error', text: 'No conversation to save' })
      return
    }

    setIsSaving(true)
    setSaveMessage(null)

    try {
      const response = await fetch('/api/conversation/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: transcript.trim(),
          metadata: { timestamp: new Date().toISOString() }
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save')
      }

      setSaveMessage({ type: 'success', text: 'Journal entry saved successfully!' })
      setTranscript('')
    } catch (error) {
      setSaveMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to save entry'
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mindfulness Voice Journal</CardTitle>
          <CardDescription>
            Talk with your AI mindfulness coach about what you&apos;re grateful for today
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {saveMessage && (
            <Alert variant={saveMessage.type === 'error' ? 'destructive' : 'success'}>
              <AlertDescription>{saveMessage.text}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="text-sm text-muted-foreground">
                Status: <span className="font-medium">{conversation.status}</span>
              </div>

              {conversation.status === 'connected' ? (
                <Button
                  onClick={conversation.endSession}
                  variant="destructive"
                  size="lg"
                  className="gap-2"
                >
                  End Session
                </Button>
              ) : (
                <Button
                  onClick={() => conversation.startSession({
                    agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || '',
                    connectionType: 'websocket' as const
                  })}
                  size="lg"
                  className="gap-2"
                  disabled={!process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID}
                >
                  Start Conversation
                </Button>
              )}

              {transcript && (
                <div className="w-full space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Conversation Transcript:</label>
                    <textarea
                      value={transcript}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTranscript(e.target.value)}
                      className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your conversation will appear here..."
                    />
                  </div>
                  <Button
                    onClick={handleSaveEntry}
                    disabled={isSaving}
                    className="gap-2 w-full"
                  >
                    <Save className="h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save Journal Entry'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Your Mindfulness Coach</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your AI coach will guide you through a brief gratitude reflection. They&apos;ll ask you about:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li>What you&apos;re grateful for today</li>
            <li>Positive moments you experienced</li>
            <li>How you&apos;re feeling</li>
            <li>What brought you joy</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
