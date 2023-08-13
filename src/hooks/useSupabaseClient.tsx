import { createClient } from "@supabase/supabase-js";

const useSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  if (!supabaseUrl || !supabaseKey)
    return {
      supabase: null,
      errorMsg: "Supabase configuration not available in env file",
    };
  // Create a single supabase client for interacting with your database
  const supabase = createClient(supabaseUrl, supabaseKey);

  return { supabase, errorMsg: null };
};

export default useSupabaseClient;
