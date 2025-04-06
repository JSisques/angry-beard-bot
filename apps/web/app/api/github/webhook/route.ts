import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';
import { post } from '@/lib/api';

/**
 * Type definition for GitHub webhook events that will be handled
 */
type GitHubEvent = 'pull_request' | 'pull_request_review' | 'pull_request_review_comment' | 'issue_comment';

/**
 * Interface defining the structure of GitHub webhook payload
 */
interface WebhookPayload {
  action: string;
  pull_request?: {
    number: number;
    title: string;
    body: string;
    html_url: string;
    user: {
      login: string;
      avatar_url: string;
    };
  };
  repository: {
    name: string;
    full_name: string;
    owner: {
      login: string;
    };
  };
  sender: {
    login: string;
  };
}

/**
 * Verifies the signature of a GitHub webhook request
 * @param {string} payload - The raw request body
 * @param {string} signature - The signature from GitHub webhook header
 * @param {string} secret - The webhook secret used to verify the signature
 * @returns {boolean} Whether the signature is valid
 */
function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  const expectedSignature = `sha256=${digest}`;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}

/**
 * Routes GitHub webhook events to their specific handlers
 * @param {GitHubEvent} event - The type of GitHub event
 * @param {WebhookPayload} payload - The webhook payload data
 */
async function handleGitHubEvent(event: GitHubEvent, payload: WebhookPayload): Promise<void> {
  switch (event) {
    case 'pull_request':
      await handlePullRequest(payload);
      break;
    case 'pull_request_review':
      await handlePullRequestReview(payload);
      break;
    case 'pull_request_review_comment':
      await handlePullRequestReviewComment(payload);
      break;
    case 'issue_comment':
      await handleIssueComment(payload);
      break;
  }
}

/**
 * Handles pull request events from GitHub
 * @param {WebhookPayload} payload - The webhook payload containing pull request data
 */
async function handlePullRequest(payload: WebhookPayload) {
  const { action, pull_request, repository } = payload;

  if (!pull_request) return;

  // We will implement PR handling logic here
  console.log(`Pull Request ${action} in ${repository.full_name}: #${pull_request.number}`);
}

/**
 * Handles pull request review events from GitHub
 * @param {WebhookPayload} payload - The webhook payload containing review data
 */
async function handlePullRequestReview(payload: WebhookPayload) {
  const { action, pull_request, repository } = payload;

  if (!pull_request) return;

  // We will implement review handling logic here
  console.log(`Pull Request Review ${action} in ${repository.full_name}: #${pull_request.number}`);
}

/**
 * Handles pull request review comment events from GitHub
 * @param {WebhookPayload} payload - The webhook payload containing review comment data
 */
async function handlePullRequestReviewComment(payload: WebhookPayload) {
  const { action, pull_request, repository } = payload;

  if (!pull_request) return;

  // We will implement review comment handling logic here
  console.log(`Pull Request Review Comment ${action} in ${repository.full_name}: #${pull_request.number}`);
}

/**
 * Handles issue comment events from GitHub
 * @param {WebhookPayload} payload - The webhook payload containing issue comment data
 */
async function handleIssueComment(payload: WebhookPayload) {
  const { action, repository } = payload;

  // We will implement issue comment handling logic here
  console.log(`Issue Comment ${action} in ${repository.full_name}`);
}

/**
 * POST endpoint handler for GitHub webhooks
 * Validates the webhook signature and processes the event
 * @param {Request} request - The incoming webhook request
 * @returns {Promise<NextResponse>} JSON response indicating success or failure
 */
export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const signature = headersList.get('x-hub-signature-256');
    const event = headersList.get('x-github-event') as GitHubEvent;

    if (!signature || !event) {
      return NextResponse.json({ error: 'Missing required headers' }, { status: 400 });
    }

    // Get webhook secret from environment
    const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('GITHUB_WEBHOOK_SECRET is not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Get request body
    const payload = await request.text();
    console.log('payload', payload);

    // Verify webhook signature
    if (!verifyWebhookSignature(payload, signature, webhookSecret)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Process the event
    const webhookPayload = JSON.parse(payload) as WebhookPayload;
    await post('/github/webhook', webhookPayload);

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
