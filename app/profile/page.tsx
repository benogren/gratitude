import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  // Redirect to home since profile content is now on the home page
  redirect('/home')
}
