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

    if (req.method === 'POST' && action === 'create') {
      // Coach creates an invite
      const { data: profile } = await supabaseAdmin
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'coach') {
        return new Response(JSON.stringify({ error: 'Only coaches can create invites' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { data: relationship, error } = await supabaseAdmin
        .from('coach_athlete_relationships')
        .insert({ coach_id: user.id })
        .select()
        .single();

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(
        JSON.stringify({ invite_code: relationship.invite_code }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (req.method === 'POST' && action === 'accept') {
      // Athlete accepts an invite
      const { invite_code } = await req.json();

      if (!invite_code) {
        return new Response(JSON.stringify({ error: 'invite_code is required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Find the pending invite
      const { data: invite, error: findError } = await supabaseAdmin
        .from('coach_athlete_relationships')
        .select()
        .eq('invite_code', invite_code)
        .eq('status', 'pending')
        .is('athlete_id', null)
        .single();

      if (findError || !invite) {
        return new Response(JSON.stringify({ error: 'Invalid or expired invite code' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Accept the invite
      const { error: updateError } = await supabaseAdmin
        .from('coach_athlete_relationships')
        .update({ athlete_id: user.id, status: 'active' })
        .eq('id', invite.id);

      if (updateError) {
        return new Response(JSON.stringify({ error: updateError.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(
        JSON.stringify({ success: true, coach_id: invite.coach_id }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ error: 'Invalid action. Use ?action=create or ?action=accept' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
