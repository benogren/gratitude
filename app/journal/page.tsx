import { redirect } from 'next/navigation'

export default function JournalPage() {
  // Redirect /journal to /home since they're now the same
  redirect('/home')
}
