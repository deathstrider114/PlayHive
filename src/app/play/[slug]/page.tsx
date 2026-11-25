import Link from "next/link";
import { ArrowLeft, ExternalLink, Maximize2, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { gameEmbedUrl, games, getGame } from "@/lib/games";

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export default async function PlayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const embedUrl = gameEmbedUrl(game.slug);
  return (
    <main className="shell">
      <header className="topbar glass">
        <Link className="brand" href="/"><span className="brand-mark">⬡</span><span>play<span>hive</span></span></Link>
        <nav><Link href="/">Discover</Link><Link className="active" href="/games">All games</Link><Link href="/categories">Categories</Link></nav>
        <Link className="button dark" href="/games"><ArrowLeft size={15}/> Back to games</Link>
      </header>
      <section className="play-page">
        <div className="play-heading">
          <div><div className="play-kicker"><ShieldCheck size={14}/> OPEN-SOURCE GAME</div><h1>{game.title}</h1><p>{game.description}</p></div>
          <a className="button glass" href={embedUrl} target="_blank" rel="noreferrer">Open separately <ExternalLink size={15}/></a>
        </div>
        <div className="game-frame-wrap">
          <iframe
            key={game.slug}
            src={embedUrl}
            title={game.title}
            className="game-frame"
            allow="fullscreen; gamepad"
            allowFullScreen
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <a className="frame-fullscreen" href={embedUrl} target="_blank" rel="noreferrer" aria-label="Open game in a new tab"><Maximize2 size={17}/></a>
        </div>
        <div className="game-credit">
          <span>Game by <a href="https://github.com/opengames-dev/opengames-dev.github.io" target="_blank" rel="noreferrer">OpenGames contributors</a></span>
          <span>Shared under the MIT License</span>
          <Link href="/games">More games on PlayHive <span aria-hidden>→</span></Link>
        </div>
      </section>
    </main>
  );
}
