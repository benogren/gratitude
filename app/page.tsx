import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If user is logged in, redirect to home
  if (user) {
    redirect('/home');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-foreground">
            Welcome to my Gratitude Journal App!
          </h1>
          <p className="max-w-md text-lg leading-8 text-muted-foreground">
            This gratitude journal is a tool to help you focus on the positive, become more mindful, and live with intention.
          </p>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              size="lg"
              asChild
            >
              <Link href="/login">Have an account? Login</Link>
            </Button>
            <Button
              variant="default"
              size="lg"
              asChild
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
