"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AuthFormProps = { mode: "login" | "register" };

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setError("");

    try {
      const supabase = createClient();
      if (mode === "register") {
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        });
        if (authError) throw authError;
        if (data.session) {
          router.push("/profile");
          router.refresh();
        } else {
          setMessage("Check your inbox for a confirmation link to finish creating your account.");
        }
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
        router.push("/profile");
        router.refresh();
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-field">
        <label htmlFor="email">Email address</label>
        <input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
      </div>
      <div className="auth-field">
        <label htmlFor="password">Password</label>
        <input id="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" />
      </div>
      {error && <p role="alert" style={{ color: "#b43e45", background: "#fff0f0", padding: 12, borderRadius: 12 }}>{error}</p>}
      {message && <p role="status" style={{ color: "#467653", background: "#eff8f0", padding: 12, borderRadius: 12 }}>{message}</p>}
      <button className="button dark" type="submit" disabled={busy} style={{ marginTop: 12, width: "100%", border: 0, cursor: busy ? "wait" : "pointer", opacity: busy ? .7 : 1 }}>
        {busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
      </button>
    </form>
  );
}
