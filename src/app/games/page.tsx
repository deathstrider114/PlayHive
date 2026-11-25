import Link from "next/link";
import { ArrowRight, Gamepad2, Search, ShieldCheck } from "lucide-react";
import { games } from "@/lib/games";

export default function Games() {
  return (
    <main className="shell">
      <header className="topbar glass">
        <Link className="brand" href="/"><span className="brand-mark">⬡</span><span>play<span>hive</span></span></Link>
        <nav><Link href="/">Discover</Link><Link className="active" href="/games">All games</Link><Link href="/categories">Categories</Link><Link href="/new">New</Link></nav>
        <Link className="button dark" href="/login">Sign in <ArrowRight size={15}/></Link>
      </header>
      <section className="page-wrap">
        <label className="page-kicker">THE PLAYHIVE LIBRARY</label>
        <h1 className="page-title">Find your next game.</h1>
        <p className="page-lead">Pick something, jump straight in and play. No download or account needed.</p>
        <div className="page-toolbar">
          <span className="verified"><ShieldCheck size={14}/> Open-source & playable now</span>
          <span className="game-count">{games.length} games available</span>
        </div>
        <div className="game-library-grid">
          {games.map((game) => (
            <Link className={`game-card ${game.accent}`} href={`/play/${game.slug}`} key={game.slug}>
              <div className="game-card-art"><span>{game.icon}</span><small>{game.category}</small></div>
              <div className="game-card-copy"><div><h2>{game.title}</h2><p>{game.description}</p></div><span className="game-card-arrow"><ArrowRight size={17}/></span></div>
            </Link>
          ))}
        </div>
        <p className="game-library-note">These first games are from OpenGames, an independent open-source project. <a href="https://github.com/opengames-dev/opengames-dev.github.io" target="_blank" rel="noreferrer">View the source and licence</a>.</p>
      </section>
    </main>
  );
}
