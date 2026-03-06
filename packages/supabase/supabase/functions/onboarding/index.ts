import { serve } from 'https://deno.land/std@0.208.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OnboardingRequest {
  full_name: string;
  role: 'athlete' | 'coach';
  timezone: string;
  modules: Array<'running' | 'strength' | 'nutrition'>;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const authHeader = req.headers.get('Authorization')!;

    // Client with user's JWT for auth context
    const supabaseUser = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });

    // Service client for admin operations
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const { data: { user }, error: authError } = await supabaseUser.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body: OnboardingRequest = await req.json();
    const { full_name, role, timezone, modules } = body;

    // Create user profile
    const { error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .upsert({
        id: user.id,
        full_name,
        role,
        timezone,
        onboarding_completed: true,
      });

    if (profileError) {
      return new Response(JSON.stringify({ error: profileError.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create module settings
    const moduleSettings = modules.map((module) => ({
      user_id: user.id,
      module,
      enabled: true,
    }));

    // Also add disabled entries for modules not selected
    const allModules: Array<'running' | 'strength' | 'nutrition'> = ['running', 'strength', 'nutrition'];
    for (const mod of allModules) {
      if (!modules.includes(mod)) {
        moduleSettings.push({ user_id: user.id, module: mod, enabled: false });
      }
    }

    const { error: modulesError } = await supabaseAdmin
      .from('user_module_settings')
      .upsert(moduleSettings, { onConflict: 'user_id,module' });

    if (modulesError) {
      return new Response(JSON.stringify({ error: modulesError.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Onboarding complete' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
