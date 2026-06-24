"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

type AuthContext = {
  user: User | null;
  profile: Record<string, unknown> | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const AuthCtx = createContext<AuthContext>({
  user: null,
  profile: null,
  loading: true,
  refresh: async () => {},
});

export function useAuth() {
  return useContext(AuthCtx);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  async function fetchProfile(userId: string) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    setProfile(data);
  }

  async function refresh() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    if (user) await fetchProfile(user.id);
    else setProfile(null);
  }

  useEffect(() => {
    refresh().finally(() => setLoading(false));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) await fetchProfile(u.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthCtx.Provider value={{ user, profile, loading, refresh }}>
      {children}
    </AuthCtx.Provider>
  );
}
