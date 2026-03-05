import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { supabase } from "../lib/supabaseClient";
import LearnFetchAuth from "./components/auth/LearnFetchAuth";
import { router } from "./routes";
import { Session } from "@supabase/supabase-js";

export default function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    // Check for existing session on load
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    // Listen for login / logout
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Still loading session
  if (session === undefined) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "#9ca3af", fontFamily: "sans-serif" }}>
        Loading…
      </div>
    );
  }

  // Not logged in → show auth page
  // Logged in → show  full app
  return session ? <RouterProvider router={router} /> : <LearnFetchAuth />;
}