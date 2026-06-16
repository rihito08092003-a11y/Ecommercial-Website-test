import supabase, { isSupabaseConfigured } from "./supabaseClient";

const mapUser = (user) => ({
  id: user?.id,
  email: user?.email,
  name: user?.user_metadata?.full_name || "",
  emailConfirmed: Boolean(user?.email_confirmed_at || user?.confirmed_at),
});

const authService = {
  logout: async () => {
    if (!isSupabaseConfigured) {
      return {};
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return {};
  },
  login: async (data) => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase is not configured");
    }

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;

    return {
      jwt: authData.session?.access_token,
      user: mapUser(authData.user),
    };
  },
  register: async (data) => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase is not configured");
    }

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;

    return {
      jwt: authData.session?.access_token,
      user: mapUser(authData.user),
    };
  },
};

export default authService;
