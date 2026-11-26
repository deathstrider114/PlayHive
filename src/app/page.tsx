import { ArrowRight, ArrowUpRight, Gamepad2, Search, Sparkles, Trophy, Zap } from "lucide-react";
import GameCard from "@/components/game-card";
import { createClient } from "@/lib/supabase/server";
import { games } from "@/lib/games";

function Brand() {
  return <a className="brand" href="/" aria-label="PlayHive home"><span className="brand-mark"><Gamepad2 size={19}/></span><span>play<span>hive</span></span></a>;
}

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const spotlight = games[14] ?? games[0];
  const sidePicks = [games[15], games[0]].filter(Boolean);
  const featured = games.slice(0, 4);
  const moreToTry = games.slice(10, 14);
  const categories = [...new Set(games.map((game) => game.category))];

  return (
    <main className="shell home-shell">
      <header className="topbar glass">
        <Brand/>
        <nav aria-label="Main navigation"><a className="active" href="/">Discover</a><a href="/games">Games</a><a href="/categories">Categories</a><a href="/new">New</a></nav>
        <div className="nav-actions"><a className="search" href="/search"><Search size={16}/> Find a game</a><a className="button dark" href={user ? "/profile" : "/login"}>{user ? "My account" : "Sign in"} <ArrowUpRight size={15}/></a></div>
      </header>
      <section className="hero hero-new">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot"/> THE NEXT GOOD GAME IS RIGHT HERE</div>
          <h1>Less scrolling.<br/><span>More playing.</span></h1>
          <p className="intro">A hand-picked corner of the internet for quick breaks, close calls and games that turn five minutes into fifty.</p>
          <div className="actions"><a className="button dark big" href="/games"><Zap size={16}/> Find something to play <ArrowRight size={17}/></a><a className="button glass big" href="/categories">Explore categories</a></div>
          <div className="hero-meta"><span><i/> {games.length} games in the library</span><i/><span>No downloads</span><i/><span>Free to play</span></div>
        </div>
        <div className="hero-stage" aria-label={`Featured game: ${spotlight.title}`}>
          <div className="stage-glow"/><div className="stage-ring ring-a"/><div className="stage-ring ring-b"/>
          <div className="stage-tile tile-back"><span>{sidePicks[0]?.icon ?? "✳"}</span><small>ONE MORE ROUND</small></div>
          <a className="stage-tile tile-front" href={`/play/${spotlight.slug}`}>
            <span className="spotlight-label"><Sparkles size={12}/> THE SPOTLIGHT</span>
            <span className="spotlight-icon">{spotlight.icon}</span>
            <strong>{spotlight.title}</strong>
            <small>READY WHEN YOU ARE <ArrowUpRight size={12}/></small>
          </a>
          <div className="stage-float float-score"><Trophy size={16}/><span><b>Little victories</b><small>Big satisfaction</small></span></div>
          <div className="stage-float float-pick"><Gamepad2 size={16}/><span><b>{sidePicks[1]?.title ?? "New favourites"}</b><small>Waiting in the library</small></span></div>
        </div>
      </section>
      <section className="browse-strip glass">
        <div className="browse-icon"><Search size={19}/></div>
        <div className="browse-copy"><b>Got something in mind?</b><span>Search the library by game, genre or mood.</span></div>
        <a href="/search" className="browse-link">Search PlayHive <ArrowRight size={15}/></a>
      </section>
      <section className="section games-section">
        <div className="heading"><div><label>THE STARTING LINEUP</label><h2>Jump straight into a classic.</h2><p>Easy to pick up. Hard to put down.</p></div><a href="/games" className="section-link">Explore all {games.length} games <ArrowRight size={15}/></a></div>
        <div className="game-library-grid home-game-grid">{featured.map((game) => <GameCard game={game} key={game.slug}/>)}</div>
      </section>
      <section className="section latest-section">
        <div className="heading"><div><label>CHANGE THE PACE</label><h2>Try something different.</h2><p>A few more from the library worth a look.</p></div><a href="/games" className="section-link">See the full library <ArrowRight size={15}/></a></div>
        <div className="game-library-grid">{moreToTry.map((game) => <GameCard game={game} key={game.slug}/>)}</div>
      </section>
      <section className="section category-section">
        <div className="heading"><div><label>FIND YOUR NEXT FIX</label><h2>Pick a mood. Find a game.</h2></div><a href="/categories" className="section-link">All categories <ArrowRight size={15}/></a></div>
        <div className="category-pills">{categories.map((category) => <a href={`/categories?category=${encodeURIComponent(category)}`} key={category}>{category}<ArrowUpRight size={14}/></a>)}</div>
      </section>
      <section className="join join-new"><div className="join-mark"><Trophy size={22}/></div><div><label>YOUR GAMES, YOUR SPACE</label><h2>Make the hive yours.</h2><p>Create a free account to keep your favourites and build your own little corner of PlayHive.</p></div><a className="button dark" href={user ? "/profile" : "/register"}>{user ? "Your account" : "Create a free account"} <ArrowRight size={15}/></a></section>
      <footer className="site-footer"><div><Brand/><p>Good games. No fuss. Just one more round.</p></div><div className="footer-links"><a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="/cookies">Cookies</a><a href="/cookie-settings">Cookie settings</a></div><small>© {new Date().getFullYear()} PlayHive</small></footer>
    </main>
  );
}