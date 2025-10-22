# Supabase Auth Setup

Your Supabase authentication is now configured! Here's what was set up:

## Files Created

### Supabase Client Utilities
- `lib/supabase/client.ts` - Browser client for client components
- `lib/supabase/server.ts` - Server client for server components
- `lib/supabase/middleware.ts` - Middleware helper for session management

### Middleware
- `middleware.ts` - Automatically refreshes auth tokens on all routes

### Auth Components
- `components/auth/login-form.tsx` - Login form component
- `components/auth/signup-form.tsx` - Signup form component with full name field

### Auth Pages
- `app/login/page.tsx` - Login page
- `app/signup/page.tsx` - Signup page
- `app/auth/callback/route.ts` - Auth callback handler for email confirmation

### Database Migration
- `supabase/migrations/001_user_profiles.sql` - Creates user_profiles table with automatic population trigger

## Next Steps

### 1. Run the Database Migration

You need to run the SQL migration in your Supabase project:

**Option A: Using Supabase Dashboard**
1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to SQL Editor
3. Copy the contents of `supabase/migrations/001_user_profiles.sql`
4. Paste and run the SQL

**Option B: Using Supabase CLI**
```bash
npx supabase db push
```

### 2. Test the Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000/signup to create a test account
3. Check your email for the confirmation link
4. After confirming, visit http://localhost:3000/login to sign in

### 3. Verify user_profiles Table

After registration, check your Supabase dashboard:
1. Go to Table Editor
2. Select `user_profiles` table
3. You should see your new user's profile automatically created with:
   - id (matches auth.users)
   - email
   - full_name (from signup form)
   - created_at
   - updated_at

## How It Works

### Registration Flow
1. User fills out signup form with email, password, and full name
2. Supabase creates user in `auth.users` table
3. Database trigger (`on_auth_user_created`) automatically runs
4. Trigger creates corresponding entry in `user_profiles` table
5. User receives confirmation email
6. After confirmation, user can log in

### Session Management
- Middleware automatically refreshes auth sessions on every request
- Sessions are stored in HTTP-only cookies for security
- Server components can access user data via `createClient()` from `lib/supabase/server.ts`
- Client components can access user data via `createClient()` from `lib/supabase/client.ts`

## Usage Examples

### Server Component (get current user)
```tsx
import { createClient } from '@/lib/supabase/server'

export default async function ProfilePage() {
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

  return <div>Welcome, {profile.full_name}!</div>
}
```

### Client Component (logout)
```tsx
'use client'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return <button onClick={handleLogout}>Logout</button>
}
```

## Security Notes

- Row Level Security (RLS) is enabled on `user_profiles`
- Users can only view and update their own profile
- Never commit `.env.local` to version control
- The `SUPABASE_SERVICE_ROLE_KEY` should only be used server-side for admin operations
