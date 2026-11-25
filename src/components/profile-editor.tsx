"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ProfileEditor({ initialName, initialUsername, initialBio }: { initialName: string; initialUsername: string; initialBio: string }) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState(initialName);
  const [username, setUsername] = useState(initialUsername);
  const [bio, setBio] = useState(initialBio);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setError("");
    try {
      const supabase = createClient();
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw userError ?? new Error("Please sign in again.");
      const cleanUsername = username.trim() ? username.trim().toLowerCase() : null;
      const { error: updateError } = await supabase.from("profiles").update({
        display_name: displayName.trim(),
        username: cleanUsername,
        bio: bio.trim(),
      }).eq("id", user.id);
      if (updateError) throw updateError;
      setMessage("Your profile has been saved.");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Couldn't save your profile. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return <form className="profile-editor" onSubmit={saveProfile}>
    <div className="heading"><div><label>YOUR DETAILS</label><h2>Edit profile</h2></div></div>
    <label className="profile-edit-field"><span>Display name</span><input value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={32} required placeholder="What should we call you?"/></label>
    <label className="profile-edit-field"><span>Username <small>Optional · 3–20 letters, numbers or underscores</small></span><input value={username} onChange={(event) => setUsername(event.target.value.replace(/[^a-zA-Z0-9_]/g, ""))} minLength={3} maxLength={20} pattern="[A-Za-z0-9_]{3,20}" placeholder="your_username"/></label>
    <label className="profile-edit-field"><span>Bio <small>Optional · 160 characters max</small></span><textarea value={bio} onChange={(event) => setBio(event.target.value)} maxLength={160} rows={3} placeholder="A little about you..."/></label>
    {error ? <p className="profile-form-error" role="alert">{error}</p> : null}
    {message ? <p className="profile-form-success" role="status">{message}</p> : null}
    <button className="button dark" type="submit" disabled={busy}><Save size={15}/>{busy ? "Saving..." : "Save profile"}</button>
  </form>;
}
