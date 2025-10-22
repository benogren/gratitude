import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Label } from '@/components/ui/label'
import { CurrentUserAvatar } from '@/components/current-user-avatar'
import { DeleteAccountDialog } from '@/components/delete-account-dialog'
import { SettingsLogoutButton } from '@/components/settings-logout-button'

export default async function SettingsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-4xl p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and profile</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <CurrentUserAvatar />
                <div>
                  <p className="text-sm font-medium">Profile Picture</p>
                  <p className="text-xs text-muted-foreground">
                    {profile?.avatar_url ? 'Synced from Gravatar' : 'No avatar set'}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <p className="text-sm">{profile?.full_name || 'Not set'}</p>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <p className="text-sm">{user.email}</p>
                </div>

                {profile?.job_title && (
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <p className="text-sm">{profile.job_title}</p>
                  </div>
                )}

                {profile?.company && (
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <p className="text-sm">{profile.company}</p>
                  </div>
                )}

                {profile?.location && (
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <p className="text-sm">{profile.location}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Account information and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>User ID</Label>
                <p className="font-mono text-sm">{user.id}</p>
              </div>

              <div className="space-y-2">
                <Label>Account Created</Label>
                <p className="text-sm">
                  {profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Unknown'}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Gravatar Status</Label>
                <p className="text-sm">
                  {profile?.gravatar_fetched ? (
                    <span className="text-green-600">✓ Synced</span>
                  ) : (
                    <span className="text-muted-foreground">Not synced</span>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <DeleteAccountDialog userId={user.id} />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <SettingsLogoutButton />
          </div>
        </div>
      </div>
    </>
  )
}
