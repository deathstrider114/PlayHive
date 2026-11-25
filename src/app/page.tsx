import { ArrowRight, Gamepad2, Search, Sparkles, Trophy, Zap } from "lucide-react";
import GameCard from "@/components/game-card";
import { createClient } from "@/lib/supabase/server";
import { games } from "@/lib/games";

function Brand() {
  return <a className="brand" href="/" aria-label="PlayHive home"><span className="brand-mark"><Gamepad2 size={19}/></span><span>playhive</span></a>;
}

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const featured = games.slice(0, 3);
  const categories = [...new Set(games.map((game) => game.category))];

  return (
    <main className="shell home-shell">
      <header className="topbar glass">
        <Brand/>
        <nav aria-label="Main navigation"><a className="active" href="/">Discover</a><a href="/games">Games</a><a href="/categories">Categories</a></nav>
        <div className="nav-actions"><a className="search" href="/search"><Search size={16}/> Find a game</a><a className="button dark" href={user ? "/profile" : "/login"}>{user ? "My account" : "Sign in"} <ArrowRight size={15}/></a></div>
      </header>
      <section className="hero hero-new">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot"/> A SMALL WORLD OF BIG DISTRACTIONS</div>
          <h1>One more game.<br/><span>Then one more.</span></h1>
          <p className="intro">Quick games, good little challenges and new favourites. Pick something and play straight away.</p>
          <div className="actions"><a className="button dark big" href="/games">Explore the games <ArrowRight size={17}/></a><a className="button glass big" href="/categories">Browse by category</a></div>
          <div className="hero-meta"><span><Zap size={14}/> No downloads</span><i/><span>Free to play</span><i/><span>Account optional</span></div>
        </div>
        <div className="hero-stage" aria-hidden="true">
          <div className="stage-glow"/><div className="stage-ring ring-a"/><div className="stage-ring ring-b"/>
          <div className="stage-tile tile-back"><span>✳</span><small>TAKE A BREAK</small></div>
          <div className="stage-tile tile-front"><Gamepad2 size={70}/><small>PRESS PLAY</small></div>
          <div className="stage-float float-score"><Trophy size={16}/><span><b>Little wins</b><small>Count them all</small></span></div>
          <div className="stage-float float-pick"><Sparkles size={16}/><span><b>Find your next</b><small>favourite game</small></span></div>
        </div>
      </section>
      <section className="browse-strip glass"><div className="browse-icon"><Search size={19}/></div><div className="browse-copy"><b>Not sure what to play?</b><span>Search the library and see what catches your eye.</span></div><a href="/search" className="browse-link">Find a game <ArrowRight size={15}/></a></section>
      <section className="section games-section">
        <div className="heading"><div><label>START HERE</label><h2>Good games, ready when you are.</h2><p>Hand-picked games you can play right here on PlayHive.</p></div><a href="/games" className="section-link">See all {games.length} games <ArrowRight size={15}/></a></div>
        <div className="game-library-grid home-game-grid">{featured.map((game) => <GameCard game={game} key={game.slug}/>)}</div>
      </section>
      <section className="section category-section">
        <div className="heading"><div><label>FIND YOUR MOOD</label><h2>What sounds good?</h2></div><a href="/categories" className="section-link">All categories <ArrowRight size={15}/></a></div>
        <div className="category-pills">{categories.map((category) => <a href={`/categories?category=${encodeURIComponent(category)}`} key={category}>{category}<ArrowRight size={14}/></a>)}</div>
      </section>
      <section className="join join-new"><div className="join-mark"><Trophy size={22}/></div><div><label>MAKE IT YOUR HIVE</label><h2>Keep your favourites close.</h2><p>Make a free account to save games and, soon, track your scores and achievements.</p></div><a className="button dark" href={user ? "/profile" : "/register"}>{user ? "Your account" : "Create a free account"} <ArrowRight size={15}/></a></section>
      <footer className="site-footer"><div><Brand/><p>A good place to lose five minutes. Or fifty.</p></div><div className="footer-links"><a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="/cookies">Cookies</a><a href="/cookie-settings">Cookie settings</a></div><small>© {new Date().getFullYear()} PlayHive</small></footer>
    </main>
  );
}