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

    if (req.method === 'POST' && action === 'connect') {
      // Register Apple Health as connected (actual data sync happens on-device)
      const { error } = await supabaseAdmin
        .from('integration_connections')
        .upsert({
          user_id: user.id,
          provider: 'apple_health',
          connected: true,
          metadata: { permissions_granted: true },
        }, { onConflict: 'user_id,provider' });

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Apple Health connected' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (req.method === 'POST' && action === 'disconnect') {
      const { error } = await supabaseAdmin
        .from('integration_connections')
        .update({ connected: false })
        .eq('user_id', user.id)
        .eq('provider', 'apple_health');

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Apple Health disconnected' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (req.method === 'GET' && action === 'status') {
      const { data, error } = await supabaseAdmin
        .from('integration_connections')
        .select('connected, metadata, updated_at')
        .eq('user_id', user.id)
        .eq('provider', 'apple_health')
        .single();

      if (error && error.code !== 'PGRST116') {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(
        JSON.stringify({ connected: data?.connected ?? false, metadata: data?.metadata ?? {} }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action. Use ?action=connect, ?action=disconnect, or ?action=status' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
