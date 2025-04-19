'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/button';
import { Card, CardContent } from '@/components/molecules/card';
import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import logo from '@/public/logo.svg';
import { AuthFormProps } from './AuthForm.interface';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function AuthForm({ dictionary, className, ...props }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleEmailLogin = async (data: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      toast.success(dictionary?.auth?.loginSuccess || 'Login successful');
      router.push(redirectTo);
    } catch (error) {
      console.error('Login error:', error);
      toast.error(dictionary?.auth?.loginError || 'Login failed');
    }
  };

  const handleGithubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/api/github/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('GitHub login error:', error);
      toast.error(dictionary?.auth?.githubLoginError || 'GitHub login failed');
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={form.handleSubmit(handleEmailLogin)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{dictionary?.auth?.welcomeBack || ''}</h1>
                <p className="text-muted-foreground text-balance">{dictionary?.auth?.loginToYourAccount || ''}</p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">{dictionary?.auth?.email || ''}</Label>
                <Input id="email" type="email" placeholder="m@example.com" {...form.register('email')} />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">{dictionary?.auth?.password || ''}</Label>
                  <Link href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    {dictionary?.auth?.forgotPassword || ''}
                  </Link>
                </div>
                <Input id="password" type="password" {...form.register('password')} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button type="submit" className="w-full">
                  {dictionary?.auth?.login || ''}
                </Button>
                <Button type="button" className="w-full" onClick={() => router.push('/signup')}>
                  {dictionary?.auth?.signUp || ''}
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">{dictionary?.auth?.orContinueWith || ''}</span>
              </div>
              <div className="flex flex-row gap-4">
                <Button variant="outline" type="button" className="w-full" onClick={handleGithubLogin}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>{dictionary?.common?.github || ''}</span>
                </Button>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src={logo}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              width={500}
              height={500}
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking sign in, you agree to our <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
