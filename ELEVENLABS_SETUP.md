# ElevenLabs Voice Journal Setup

Your voice journal with AI mindfulness coach is now configured! Here's how to complete the setup:

## Files Created

### Database
- `supabase/migrations/003_journal_entries.sql` - Journal entries table with RLS policies

### Components & Pages
- `components/voice-journal.tsx` - Voice conversation component
- `app/journal/page.tsx` - Journal page
- `app/actions/journal.ts` - Server actions for saving/fetching entries

### Navigation
- Updated `components/navbar.tsx` - Added Journal and Settings links

## Setup Steps

### 1. Run the Database Migration

Run the SQL migration in your Supabase project:

**Using Supabase Dashboard:**
1. Go to https://supabase.com/dashboard
2. Navigate to SQL Editor
3. Copy contents of `supabase/migrations/003_journal_entries.sql`
4. Paste and run the SQL

### 2. Create an ElevenLabs Account & Agent

1. **Sign up at ElevenLabs:**
   - Go to https://elevenlabs.io
   - Create an account (or log in)

2. **Create a Conversational AI Agent:**
   - Navigate to the "Agents" or "Conversational AI" section
   - Click "Create Agent"
   - Configure your mindfulness coach:

   **Agent Configuration Example:**
   ```
   Name: Gratitude Mindfulness Coach

   System Prompt:
   You are a warm, empathetic mindfulness coach helping users reflect on their day
   through a gratitude practice. Guide them through a brief conversation (3-5 minutes)
   asking about:

   1. What they're grateful for today
   2. Positive moments they experienced
   3. How they're feeling emotionally
   4. What brought them joy or peace

   Keep the conversation natural and flowing. Be supportive and encouraging.
   Ask one question at a time and listen actively to their responses.
   End by thanking them for sharing and encouraging them to continue this practice.

   Voice: [Choose a warm, calming voice from the available options]
   Language: English
   ```

3. **Get Your Agent ID:**
   - After creating the agent, copy the Agent ID
   - It will look something like: `agent_abc123xyz456`

### 3. Set Up Environment Variables

Add your ElevenLabs credentials to `.env.local`:

```bash
# ElevenLabs Configuration
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_agent_id_here
```

**Note:** You may also need an API key depending on your ElevenLabs plan. If required, add:
```bash
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_api_key_here
```

### 4. Restart Your Dev Server

```bash
npm run dev
```

## How to Use

1. Navigate to `/journal` from the navbar or dropdown menu
2. Click "Start Conversation" to begin talking with your AI coach
3. Have a natural conversation about what you're grateful for
4. When finished, click "End Session"
5. Review the transcript and click "Save Journal Entry"

## Features

### Voice Journal Component
- Real-time voice conversation with AI
- Conversation transcript capture
- Save entries to database
- Status indicators for connection state

### Database Schema
```sql
journal_entries {
  id: uuid (primary key)
  user_id: uuid (foreign key to auth.users)
  transcript: text (conversation transcript)
  summary: text (optional summary)
  gratitude_items: text[] (array of gratitude items)
  mood: text (optional mood)
  conversation_metadata: jsonb (additional data)
  created_at: timestamp
}
```

### Row Level Security
- Users can only view, create, update, and delete their own entries
- All operations are scoped to the authenticated user

## Customization Ideas

### Enhance the Agent Prompt
You can improve your mindfulness coach by:
- Adding specific question flows
- Personalizing the conversation style
- Including breathing exercises or meditation prompts
- Adding mood tracking with specific questions

### Add Features to the App
Consider adding:
- Journal history view (using `getJournalEntries()` action)
- Analytics/insights on gratitude patterns
- Mood tracking over time
- Export journal entries
- Search and filter entries

### Example: View Journal History

Create a new page at `app/journal/history/page.tsx`:

```tsx
import { getJournalEntries } from '@/app/actions/journal'

export default async function JournalHistory() {
  const { entries } = await getJournalEntries(20)

  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.id}>
          <p>{new Date(entry.created_at).toLocaleDateString()}</p>
          <p>{entry.transcript}</p>
        </div>
      ))}
    </div>
  )
}
```

## Troubleshooting

### Agent Not Connecting
- Verify your `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` is correct
- Check browser console for errors
- Ensure microphone permissions are granted

### Transcript Not Saving
- Check browser console for errors
- Verify database migration was run successfully
- Check Supabase logs for RLS policy errors

### Voice Quality Issues
- Check your internet connection
- Try a different browser
- Adjust microphone settings in your OS

## API Limits

ElevenLabs has usage limits based on your plan:
- Free tier: Limited minutes per month
- Paid plans: Higher limits and additional features

Monitor your usage in the ElevenLabs dashboard.

## Next Steps

1. Complete the setup steps above
2. Test the voice journal
3. Customize the agent prompt to your preferences
4. Consider adding a journal history view
5. Explore additional ElevenLabs features like custom voices

Enjoy your mindfulness practice! 🧘‍♀️
