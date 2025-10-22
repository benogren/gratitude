import crypto from 'crypto'

export interface GravatarProfile {
  hash: string
  display_name?: string
  profile_url?: string
  avatar_url?: string
  location?: string
  job_title?: string
  company?: string
  first_name?: string
  last_name?: string
}

/**
 * Generate SHA256 hash of email for Gravatar API
 */
export function getGravatarHash(email: string): string {
  const normalizedEmail = email.trim().toLowerCase()
  return crypto.createHash('sha256').update(normalizedEmail).digest('hex')
}

/**
 * Fetch Gravatar profile data using the Gravatar API
 */
export async function fetchGravatarProfile(email: string): Promise<GravatarProfile | null> {
  const hash = getGravatarHash(email)
  const apiKey = process.env.NEXT_PUBLIC_GRAVATAR

  if (!apiKey) {
    console.error('Gravatar API key not configured')
    return null
  }

  try {
    const response = await fetch(`https://api.gravatar.com/v3/profiles/${hash}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        // User doesn't have a Gravatar profile
        return null
      }
      throw new Error(`Gravatar API error: ${response.status}`)
    }

    const data = await response.json()

    return {
      hash,
      display_name: data.display_name,
      profile_url: data.profile_url,
      avatar_url: data.avatar_url,
      location: data.location,
      job_title: data.job_title,
      company: data.company,
      first_name: data.first_name,
      last_name: data.last_name,
    }
  } catch (error) {
    console.error('Error fetching Gravatar profile:', error)
    return null
  }
}
