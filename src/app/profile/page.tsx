import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/sign-out-button";
import { UserRound } from "lucide-react";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return <main className="shell">
    <header className="topbar glass">
      <a className="brand" href="/"><span className="brand-mark">⬡</span><span>play<span>hive</span></span></a>
      <nav><a href="/games">All games</a><a href="/categories">Categories</a></nav>
      <SignOutButton/>
    </header>
    <section className="auth-card glass">
      <span className="empty-icon"><UserRound size={27}/></span>
      <label className="page-kicker">YOUR PLAYHIVE ACCOUNT</label>
      <h1>Hey, gamer.</h1>
      <p>You're signed in as <strong>{user.email}</strong>.</p>
      <div className="auth-note" style={{marginTop:22}}>Your account is connected. Profile customisation, favourites and achievements will be added as the player features are built.</div>
      <a className="button dark" style={{marginTop:22,width:"100%"}} href="/games">Find a game</a>
    </section>
  </main>;
}
