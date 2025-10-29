import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { JournalEntryDetails, JournalEntryDetailsSkeleton } from '@/components/journal-entry-details'
import { getJournalEntryById } from '@/app/actions/journal'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Suspense } from 'react'

interface PageProps {
  params: Promise<{ id: string }>
}

async function JournalEntryContent({ id }: { id: string }) {
  const { entry, error } = await getJournalEntryById(id)

  if (error || !entry) {
    notFound()
  }

  return <JournalEntryDetails entry={entry} />
}

export default async function JournalEntryPage({ params }: PageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { id } = await params

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-4xl p-6">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/home">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <Suspense fallback={<JournalEntryDetailsSkeleton />}>
          <JournalEntryContent id={id} />
        </Suspense>
      </div>
    </>
  )
}
