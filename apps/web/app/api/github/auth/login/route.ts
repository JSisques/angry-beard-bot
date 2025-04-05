import { NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Handles GitHub OAuth login initiation
 * Generates a random state parameter and redirects user to GitHub authorization page
 * @returns {Promise<NextResponse>} Redirects to GitHub OAuth page or returns error response
 */
export async function GET() {
  try {
    const state = crypto.randomBytes(32).toString('hex');

    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.append('client_id', process.env.GITHUB_CLIENT_ID!);
    githubAuthUrl.searchParams.append('scope', 'repo user');
    githubAuthUrl.searchParams.append('state', state);
    githubAuthUrl.searchParams.append('redirect_uri', process.env.GITHUB_REDIRECT_URI!);

    return NextResponse.redirect(githubAuthUrl.toString());
  } catch (error) {
    console.error('Error in login route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
