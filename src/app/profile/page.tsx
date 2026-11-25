import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Clock, Gamepad2, Heart, Sparkles, UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/sign-out-button";
import GameCard from "@/components/game-card";
import ProfileEditor from "@/components/profile-editor";
import { getGame } from "@/lib/games";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, { data: favouriteRows }, { data: recentRows }] = await Promise.all([
    supabase.from("profiles").select("username, display_name, avatar_url, bio, xp, level").eq("id", user.id).maybeSingle(),
    supabase.from("user_favourites").select("game_slug").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("recently_played").select("game_slug, last_played_at, play_count").eq("user_id", user.id).order("last_played_at", { ascending: false }).limit(30),
  ]);

  const favourites = (favouriteRows ?? []).flatMap((row) => {
    const game = getGame(row.game_slug);
    return game ? [game] : [];
  });
  const recent = (recentRows ?? []).flatMap((row) => {
    const game = getGame(row.game_slug);
    return game ? [{ game, playCount: row.play_count }] : [];
  });
  const displayName = profile?.display_name || user.email?.split("@")[0] || "Player";
  const initials = displayName.slice(0, 1).toUpperCase();
  const totalPlays = (recentRows ?? []).reduce((total, row) => total + row.play_count, 0);
  const playedCategories = new Set(recent.map(({ game }) => game.category)).size;
  const achievements = [
    { title: "First game", detail: "Play your first game.", unlocked: totalPlays >= 1, icon: "🎮" },
    { title: "Game hopper", detail: "Try five different games.", unlocked: recent.length >= 5, icon: "🧭" },
    { title: "Back for more", detail: "Play ten sessions.", unlocked: totalPlays >= 10, icon: "🔁" },
    { title: "Collector", detail: "Save five favourite games.", unlocked: favourites.length >= 5, icon: "💙" },
    { title: "A bit of everything", detail: "Play across three categories.", unlocked: playedCategories >= 3, icon: "✨" },
  ];

  return <main className="shell inner-shell">
    <header className="topbar glass">
      <Link className="brand" href="/"><span className="brand-mark"><Gamepad2 size={19}/></span><span>play<span>hive</span></span></Link>
      <nav><Link href="/">Discover</Link><Link href="/games">Games</Link><Link href="/categories">Categories</Link></nav>
      <SignOutButton/>
    </header>
    <section className="page-wrap library-page">
      <div className="eyebrow"><span className="eyebrow-dot"/> YOUR PLAYHIVE SPACE</div>
      <div className="profile-hero" style={{marginTop:22}}>
        <div className="profile-avatar">{initials}</div>
        <div style={{flex:1,minWidth:0}}>
          <h1>{displayName}</h1>
          <p>{profile?.username ? `@${profile.username} · ` : ""}{user.email}</p>
          {profile?.bio ? <p style={{marginTop:8}}>{profile.bio}</p> : null}
        </div>
        <span className="verified"><UserRound size={14}/> Player</span>
      </div>

      <ProfileEditor initialName={profile?.display_name || displayName} initialUsername={profile?.username || ""} initialBio={profile?.bio || ""}/>

      <div className="profile-stats">
        <div><strong>{recent.length}</strong><span>Games played</span></div>
        <div><strong>{totalPlays}</strong><span>Total sessions</span></div>
        <div><strong>{favourites.length}</strong><span>Favourites</span></div>
      </div>

      <section className="profile-section">
        <div className="heading"><div><label><Sparkles size={12} style={{display:"inline",verticalAlign:"-2px"}}/> MILESTONES</label><h2>Achievements</h2></div><span className="profile-achievement-count">{achievements.filter((item) => item.unlocked).length} / {achievements.length} unlocked</span></div>
        <div className="achievement-grid">{achievements.map((achievement) => <div className={achievement.unlocked ? "achievement-card unlocked" : "achievement-card"} key={achievement.title}><span>{achievement.icon}</span><div><strong>{achievement.title}</strong><small>{achievement.detail}</small></div><i>{achievement.unlocked ? "UNLOCKED" : "LOCKED"}</i></div>)}</div>
      </section>

      <section className="profile-section">
        <div className="heading"><div><label><Heart size={12} style={{display:"inline",verticalAlign:"-2px"}}/> SAVED FOR LATER</label><h2>Your favourites</h2></div><Link href="/games" className="section-link">Find more games <ArrowRight size={15}/></Link></div>
        {favourites.length ? <div className="game-library-grid">{favourites.map((game) => <GameCard game={game} key={game.slug}/>)}</div> : <div className="profile-empty">You haven't saved any favourites yet. Tap the heart on a game card and it'll show up here.</div>}
      </section>

      <section className="profile-section">
        <div className="heading"><div><label><Clock size={12} style={{display:"inline",verticalAlign:"-2px"}}/> PICK UP WHERE YOU LEFT OFF</label><h2>Recently played</h2></div><Link href="/games" className="section-link">Browse library <ArrowRight size={15}/></Link></div>
        {recent.length ? <div className="game-library-grid">{recent.map(({game,playCount}) => <div key={game.slug} className="recent-game-card"><GameCard game={game}/><small>Played {playCount} {playCount === 1 ? "time" : "times"}</small></div>)}</div> : <div className="profile-empty">Games you play will appear here, so you can jump back in next time.</div>}
      </section>
    </section>
  </main>;
}
