import Link from "next/link";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import GamesBrowser from "@/components/games-browser";
import { games } from "@/lib/games";

export default function Games() {
  return <main className="shell inner-shell">
    <header className="topbar glass">
      <Link className="brand" href="/"><span className="brand-mark"><Gamepad2 size={19}/></span><span>play<span>hive</span></span></Link>
      <nav><Link href="/">Discover</Link><Link className="active" href="/games">Games</Link><Link href="/categories">Categories</Link><Link href="/new">New</Link></nav>
      <Link className="button dark" href="/"><ArrowLeft size={15}/> Home</Link>
    </header>
    <section className="page-wrap library-page">
      <div className="library-intro"><div className="eyebrow"><span className="eyebrow-dot"/> THE PLAYHIVE LIBRARY</div><h1 className="page-title">Find your next<br/><span>favourite game.</span></h1><p className="page-lead">No downloads, no waiting around. Just pick a game and get playing.</p><div className="library-stats"><span><b>{games.length}</b> games ready</span><i/><span>Free to play</span><i/><span>Account optional</span></div></div>
      <GamesBrowser/>
      <p className="game-library-note">The first games are from OpenGames, an independent open-source project. <a href="https://github.com/opengames-dev/opengames-dev.github.io" target="_blank" rel="noreferrer">View the source and licence</a>.</p>
    </section>
  </main>;
}