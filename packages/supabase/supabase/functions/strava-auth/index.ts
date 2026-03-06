import { serve } from 'https://deno.land/std@0.208.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const stravaClientId = Deno.env.get('STRAVA_CLIENT_ID')!;
    const stravaClientSecret = Deno.env.get('STRAVA_CLIENT_SECRET')!;
    const authHeader = req.headers.get('Authorization')!;

    const supabaseUser = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const { data: { user }, error: authError } = await supabaseUser.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    if (action === 'authorize') {
      // Return the Strava OAuth URL for the client to redirect to
      const redirectUri = url.searchParams.get('redirect_uri');
      if (!redirectUri) {
        return new Response(JSON.stringify({ error: 'redirect_uri is required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const stravaAuthUrl = new URL('https://www.strava.com/oauth/authorize');
      stravaAuthUrl.searchParams.set('client_id', stravaClientId);
      stravaAuthUrl.searchParams.set('redirect_uri', redirectUri);
      stravaAuthUrl.searchParams.set('response_type', 'code');
      stravaAuthUrl.searchParams.set('scope', 'read,activity:read_all');
      stravaAuthUrl.searchParams.set('state', user.id);

      return new Response(
        JSON.stringify({ url: stravaAuthUrl.toString() }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (action === 'callback') {
      // Exchange authorization code for tokens
      const { code } = await req.json();
      if (!code) {
        return new Response(JSON.stringify({ error: 'Authorization code is required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const tokenResponse = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: stravaClientId,
          client_secret: stravaClientSecret,
          code,
          grant_type: 'authorization_code',
        }),
      });

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.text();
        return new Response(JSON.stringify({ error: `Strava token exchange failed: ${errorData}` }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const tokens = await tokenResponse.json();

      // Store tokens in integration_connections
      const { error: upsertError } = await supabaseAdmin
        .from('integration_connections')
        .upsert({
          user_id: user.id,
          provider: 'strava',
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          token_expires_at: new Date(tokens.expires_at * 1000).toISOString(),
          external_user_id: String(tokens.athlete?.id),
          connected: true,
          metadata: { athlete: tokens.athlete },
        }, { onConflict: 'user_id,provider' });

      if (upsertError) {
        return new Response(JSON.stringify({ error: upsertError.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(
        JSON.stringify({ success: true, athlete_id: tokens.athlete?.id }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (action === 'disconnect') {
      const { error } = await supabaseAdmin
        .from('integration_connections')
        .update({ connected: false, access_token: null, refresh_token: null })
        .eq('user_id', user.id)
        .eq('provider', 'strava');

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action. Use ?action=authorize, ?action=callback, or ?action=disconnect' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
