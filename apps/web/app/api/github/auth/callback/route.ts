import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    console.log('data', JSON.stringify(data, null, 2));

    if (error) {
      console.error('Error exchanging code for session:', error);
    }

    console.debug('data', data);

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/github`, data);

    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
