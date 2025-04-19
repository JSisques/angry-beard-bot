import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const locales = ['en', 'es'];

// Get the preferred locale from browser and return default if not supported
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return 'en';

  // Get first preferred locale that matches our supported locales
  const preferredLocale = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0])
    .map(lang => lang.substring(0, 2))
    .find(lang => locales.includes(lang));

  return preferredLocale || 'en';
}

// List of public routes that don't require authentication
const publicRoutes = ['/auth', '/api/auth'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is public
  const isPublicRoute = publicRoutes.some(route => pathname.includes(route));

  // Handle locale redirects
  const pathnameHasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  try {
    // Create Supabase client
    const supabase = await createClient();

    // Get session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // If no session and not on a public route, redirect to auth page
    if (!session) {
      const locale = pathname.split('/')[1];
      const redirectUrl = new URL(`/${locale}/auth`, request.url);
      redirectUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // If we have a session, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of error, redirect to auth page
    const locale = pathname.split('/')[1];
    return NextResponse.redirect(new URL(`/${locale}/auth`, request.url));
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and API routes
    '/((?!_next|api|_vercel|.*\\..*).*)',
  ],
};
