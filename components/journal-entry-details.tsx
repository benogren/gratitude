'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Heart, Smile, MessageSquare, BookOpen, Trash2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { deleteJournalEntry } from '@/app/actions/journal'

interface JournalEntryDetailsProps {
  entry: {
    id: string
    transcript: string
    summary?: string
    gratitude_items?: string[]
    mood?: string
    conversation_metadata?: {
      duration?: number
      messageCount?: number
      startTime?: string
      endTime?: string
    }
    created_at: string
  }
}

function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} seconds`
  }
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes} minutes`
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

export function JournalEntryDetails({ entry }: JournalEntryDetailsProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const duration = entry.conversation_metadata?.duration || 0
  const messageCount = entry.conversation_metadata?.messageCount || 0

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      const result = await deleteJournalEntry(entry.id)

      if (result.success) {
        toast.success('Journal entry deleted')
        router.push('/home')
      } else {
        toast.error(result.error || 'Failed to delete entry')
        setIsDeleting(false)
      }
    } catch (error) {
      toast.error('Failed to delete entry')
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with metadata and delete button */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Journal Entry</CardTitle>
              <CardDescription>{formatDateTime(entry.created_at)}</CardDescription>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="gap-2" disabled={isDeleting}>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this journal entry. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">{formatDuration(duration)}</p>
                <p className="text-muted-foreground">Duration</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">{messageCount} messages</p>
                <p className="text-muted-foreground">Exchanges</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {entry.summary && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" style={{ color: 'var(--secondary-500)' }} />
              <CardTitle>Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{entry.summary}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Gratitude Items */}
        {entry.gratitude_items && entry.gratitude_items.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" style={{ color: 'var(--accent-500)' }} />
                <CardTitle>Gratitude</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {entry.gratitude_items.map((item, index) => (
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
            </CardContent>
          </Card>
        )}

        {/* Mood */}
        {entry.mood && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Smile className="h-5 w-5" style={{ color: 'var(--primary-400)' }} />
                <CardTitle>Mood</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-medium capitalize">{entry.mood}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Full Conversation */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation Transcript</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {entry.transcript}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function JournalEntryDetailsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Summary Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>

      {/* Gratitude and Mood Skeletons */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-28" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-32" />
          </CardContent>
        </Card>
      </div>

      {/* Transcript Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
