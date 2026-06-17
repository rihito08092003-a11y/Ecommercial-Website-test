import supabase, { isSupabaseConfigured } from "./supabaseClient";

const mapUser = (user) => ({
  id: user?.id,
  email: user?.email,
  name: user?.user_metadata?.full_name || "",
  emailConfirmed: Boolean(user?.email_confirmed_at || user?.confirmed_at),
});

const authService = {
  getSession: async () => {
    if (!isSupabaseConfigured) {
      return { session: null, user: null };
    }

    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;

    return {
      session: data.session,
      user: mapUser(data.session?.user),
    };
  },
  onAuthStateChange: (callback) => {
    if (!isSupabaseConfigured) {
      return { unsubscribe: () => {} };
    }

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      callback({
        session,
        user: mapUser(session?.user),
      });
    });

    return data.subscription;
  },
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
      session: authData.session,
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
      session: authData.session,
      user: mapUser(authData.user),
    };
  },
  resetPassword: async (email) => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase is not configured");
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;

    return data;
  },
};

export default authService;
