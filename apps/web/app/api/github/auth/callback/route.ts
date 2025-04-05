import { NextResponse } from 'next/server';

/**
 * Interface for GitHub OAuth token response
 */
interface GitHubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

/**
 * Handles GitHub OAuth callback
 * Exchanges authorization code for access token and retrieves user data
 * @param {Request} request - The incoming request with OAuth code
 * @returns {Promise<NextResponse>} Redirects to home page on success or returns error response
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) {
      return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    if (state !== process.env.GITHUB_OAUTH_STATE) {
      return NextResponse.json({ error: 'Invalid state parameter' }, { status: 400 });
    }

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_REDIRECT_URI,
      }),
    });

    const tokenData: GitHubTokenResponse = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Error getting access token:', tokenData);
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 500 });
    }

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      console.error('Error getting user data:', userData);
      return NextResponse.json({ error: 'Failed to get user data' }, { status: 500 });
    }

    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Error in auth callback:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
