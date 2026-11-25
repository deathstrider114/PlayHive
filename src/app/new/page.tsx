import Link from "next/link";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import GameCard from "@/components/game-card";
import { games } from "@/lib/games";

export default function NewPage() {
  const newGames = games.slice(6);
  return <main className="shell inner-shell">
    <header className="topbar glass">
      <Link className="brand" href="/"><span className="brand-mark"><Gamepad2 size={19}/></span><span>play<span>hive</span></span></Link>
      <nav><Link href="/">Discover</Link><Link href="/games">Games</Link><Link className="active" href="/new">New</Link></nav>
      <Link className="button dark" href="/games"><ArrowLeft size={15}/> All games</Link>
    </header>
    <section className="page-wrap library-page">
      <div className="eyebrow"><span className="eyebrow-dot"/> FRESH FROM THE HIVE</div>
      <h1 className="page-title">New around<br/><span>here.</span></h1>
      <p className="page-lead">Fourteen new games have joined the library. Take a look through the latest additions.</p>
      <div className="library-stats"><span><b>{newGames.length}</b> new games</span><i/><span>Free to play</span></div>
      <div className="game-library-grid library-grid" style={{marginTop:30}}>{newGames.map((game) => <GameCard game={game} key={game.slug}/>)}</div>
    </section>
  </main>;
}