import Link from "next/link";
import { ArrowRight, Gamepad2, Puzzle, Zap, Crosshair, Sparkles } from "lucide-react";
import { games } from "@/lib/games";

const icons = { Arcade: Zap, Puzzle, Classic: Gamepad2, Action: Crosshair, Casual: Sparkles } as const;
const descriptions: Record<string, string> = {
  Arcade: "Quick rounds, high scores and one-more-go games.",
  Puzzle: "Take your time, spot the pattern and work it out.",
  Classic: "The familiar games that never get old.",
  Action: "Fast reactions and a little bit of chaos.",
  Casual: "Easy to pick up whenever you have a minute.",
};

export default function Categories() {
  const categories = [...new Set(games.map((game) => game.category))];
  return <main className="shell inner-shell">
    <header className="topbar glass">
      <Link className="brand" href="/"><span className="brand-mark"><Gamepad2 size={19}/></span><span>play<span>hive</span></span></Link>
      <nav><Link href="/">Discover</Link><Link href="/games">Games</Link><Link className="active" href="/categories">Categories</Link></nav>
      <Link className="button dark" href="/games">All games <ArrowRight size={15}/></Link>
    </header>
    <section className="page-wrap library-page">
      <div className="eyebrow"><span className="eyebrow-dot"/> BROWSE BY MOOD</div>
      <h1 className="page-title">Pick your kind<br/><span>of game.</span></h1>
      <p className="page-lead">A few different ways to find something worth playing.</p>
      <div className="page-grid category-grid" style={{marginTop:34}}>
        {categories.map((category) => {
          const Icon = icons[category as keyof typeof icons] ?? Gamepad2;
          const count = games.filter((game) => game.category === category).length;
          return <Link className="page-tile category-tile" href={`/games?category=${encodeURIComponent(category)}`} key={category}>
            <span className="category-tile-icon"><Icon size={24}/><ArrowRight size={16}/></span>
            <span><strong>{category}</strong><br/><small>{descriptions[category] ?? "Browse this collection."}</small></span>
            <em>{count} {count === 1 ? "game" : "games"}</em>
          </Link>;
        })}
      </div>
    </section>
  </main>;
}
