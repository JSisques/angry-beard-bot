import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

// Mark this endpoint as server-rendered
export const prerender = false;

const supabase = createClient(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.SUPABASE_SERVICE_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse JSON data instead of form data
    const data = await request.json();
    const email = data.email;

    if (!email) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Email is required',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    // Save to Supabase
    const { error: dbError } = await supabase
      .from('waitlist')
      .insert([
        {
          email,
          signed_up_at: new Date().toISOString(),
        },
      ])
      .single();

    if (dbError) {
      // If email already exists
      if (dbError.code === '23505') {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'You are already on the waitlist!',
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      }

      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Failed to join waitlist',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully joined the waitlist!',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An unexpected error occurred',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
};
