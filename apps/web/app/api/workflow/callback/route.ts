import { post } from '@/lib/api';
import { NextResponse } from 'next/server';

/**
 * POST endpoint handler for GitHub webhooks
 * Validates the webhook signature and processes the event
 * @param {Request} request - The incoming webhook request
 * @returns {Promise<NextResponse>} JSON response indicating success or failure
 */
export async function POST(request: Request) {
  try {
    const payload = await request.text();
    const body = JSON.parse(payload);

    console.log(body);

    await post('/workflow/callback', body);

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
