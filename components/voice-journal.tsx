'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useConversation } from '@elevenlabs/react'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Alert, AlertDescription } from './ui/alert'
import { Orb, type AgentState } from './ui/orb'
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from './ui/conversation'

interface VoiceJournalProps {
  userName: string
  autoStart?: boolean
}

interface Message {
  id: string
  source: 'user' | 'ai'
  text: string
  timestamp: Date
}

export function VoiceJournal({ userName, autoStart = false }: VoiceJournalProps) {
  const router = useRouter()
  const [transcript, setTranscript] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [sessionEnded, setSessionEnded] = useState(false)
  const [agentState, setAgentState] = useState<AgentState>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [conversationMetadata, setConversationMetadata] = useState<{
    conversationId: string | null
    startTime: string | null
    endTime: string | null
    messageCount: number
    connectionType: 'websocket' | 'webrtc' | null
    duration: number | null
  }>({
    conversationId: null,
    startTime: null,
    endTime: null,
    messageCount: 0,
    connectionType: null,
    duration: null,
  })

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to agent')
      setSaveMessage(null)
      setSessionEnded(false)
      setAgentState('listening')
    },
    onDisconnect: () => {
      console.log('Disconnected from agent')
      setAgentState(null)
      const endTime = new Date().toISOString()
      setConversationMetadata(prev => {
        const duration = prev.startTime
          ? Math.round((new Date(endTime).getTime() - new Date(prev.startTime).getTime()) / 1000)
          : null
        const updatedMetadata = {
          ...prev,
          endTime,
          duration,
        }

        // Trigger auto-save after metadata is updated
        setSessionEnded(true)

        return updatedMetadata
      })
    },
    onMessage: (message) => {
      console.log('Message:', message)
      // Update agent state based on message source
      if (message.source === 'ai') {
        setAgentState('talking')
      } else if (message.source === 'user') {
        setAgentState('listening')
      }

      // Append messages to transcript and messages array
      if (message.message) {
        setTranscript(prev => prev + `\n${message.source}: ${message.message}`)
        setMessages(prev => [...prev, {
          id: `${Date.now()}-${Math.random()}`,
          source: message.source as 'user' | 'ai',
          text: message.message,
          timestamp: new Date()
        }])
        setConversationMetadata(prev => ({
          ...prev,
          messageCount: prev.messageCount + 1
        }))
      }
    },
    onError: (error) => {
      console.error('Conversation error:', error)
      setSaveMessage({ type: 'error', text: 'Connection error occurred' })
    },
    onConversationMetadata: (metadata) => {
      console.log('Conversation metadata:', metadata)
    },
  })

  const handleSaveEntry = async () => {
    if (!transcript.trim()) {
      toast.error('No conversation to save')
      return
    }

    setIsSaving(true)

    const processingPromise = (async () => {
      try {
        // Step 1: Process the transcript with AI to extract summary, gratitude items, and mood
        const processResponse = await fetch('/api/conversation/process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transcript: transcript.trim(),
          }),
        })

        let summary, gratitude_items, mood

        if (processResponse.ok) {
          const processData = await processResponse.json()
          summary = processData.summary
          gratitude_items = processData.gratitude_items
          mood = processData.mood
        } else {
          console.warn('Failed to process transcript, continuing without AI analysis')
        }

        // Step 2: Save the journal entry with all data
        const saveResponse = await fetch('/api/conversation/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transcript: transcript.trim(),
            summary,
            gratitude_items,
            mood,
            metadata: {
              timestamp: new Date().toISOString(),
              conversationId: conversationMetadata.conversationId,
              startTime: conversationMetadata.startTime,
              endTime: conversationMetadata.endTime,
              duration: conversationMetadata.duration,
              messageCount: conversationMetadata.messageCount,
              connectionType: conversationMetadata.connectionType,
            }
          }),
        })

        const saveData = await saveResponse.json()

        if (!saveResponse.ok) {
          throw new Error(saveData.error || 'Failed to save')
        }

        // Redirect to the journal entry details page
        if (saveData.entry?.id) {
          router.push(`/journal/${saveData.entry.id}`)
        }

        return saveData
      } catch (error) {
        setIsSaving(false)
        throw error
      }
    })()

    toast.promise(processingPromise, {
      loading: 'Processing your conversation...',
      success: 'Journal entry saved!',
      error: (err) => err instanceof Error ? err.message : 'Failed to save entry',
    })
  }

  // Auto-save when session ends
  useEffect(() => {
    if (sessionEnded && transcript.trim() && !isSaving) {
      handleSaveEntry()
    }
  }, [sessionEnded])

  // Auto-start conversation if requested
  useEffect(() => {
    if (autoStart && conversation.status !== 'connected' && !transcript) {
      const startConversation = async () => {
        const connectionType = 'websocket' as const
        const conversationId = await conversation.startSession({
          agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || '',
          connectionType,
          dynamicVariables: {
            user_name: userName
          }
        })
        const startTime = new Date().toISOString()
        setConversationMetadata({
          conversationId,
          startTime,
          endTime: null,
          messageCount: 0,
          connectionType,
          duration: null,
        })
      }

      startConversation()
    }
  }, [autoStart])

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

          {conversation.status === 'connected' ? (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - Orb */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-full aspect-square relative">
                  <Orb
                    agentState={agentState}
                    getInputVolume={conversation.getInputVolume}
                    getOutputVolume={conversation.getOutputVolume}
                    colors={["#CADCFC", "#8BA5D8"]}
                  />
                </div>
                <Button
                  onClick={conversation.endSession}
                  variant="destructive"
                  size="lg"
                  className="gap-2 w-full"
                  disabled={isSaving}
                >
                  {isSaving ? 'Processing...' : 'End Session & Save'}
                </Button>
              </div>

              {/* Right Column - Conversation */}
              <div className="flex flex-col">
                <Card className="flex-1 flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg">Live Conversation</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1 flex flex-col">
                    <Conversation className="flex-1 min-h-[500px]">
                      <ConversationContent>
                        {messages.length === 0 ? (
                          <ConversationEmptyState
                            title="Listening..."
                            description="Your conversation with the mindfulness coach will appear here"
                          />
                        ) : (
                          <div className="space-y-4">
                            {messages.map((msg) => (
                              <div
                                key={msg.id}
                                className={`flex ${msg.source === 'user' ? 'justify-end' : 'justify-start'}`}
                              >
                                <div
                                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                    msg.source === 'user'
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-muted'
                                  }`}
                                >
                                  <p className="text-sm">{msg.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </ConversationContent>
                      <ConversationScrollButton />
                    </Conversation>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              {/* Show orb even when not connected */}
              <div className="w-full max-w-md aspect-square relative">
                <Orb
                  agentState={agentState}
                  getInputVolume={conversation.getInputVolume}
                  getOutputVolume={conversation.getOutputVolume}
                  colors={["#CADCFC", "#8BA5D8"]}
                />
              </div>
              {!autoStart && (
                <Button
                  onClick={async () => {
                    const connectionType = 'websocket' as const
                    const conversationId = await conversation.startSession({
                      agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || '',
                      connectionType,
                      dynamicVariables: {
                        user_name: userName
                      }
                    })
                    const startTime = new Date().toISOString()
                    setConversationMetadata({
                      conversationId,
                      startTime,
                      endTime: null,
                      messageCount: 0,
                      connectionType,
                      duration: null,
                    })
                  }}
                  size="lg"
                  className="gap-2 w-full max-w-md"
                  disabled={!process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID}
                >
                  Start Conversation
                </Button>
              )}
            </div>
          )}
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
