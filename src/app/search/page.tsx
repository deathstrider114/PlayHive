import Link from "next/link";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import GamesBrowser from "@/components/games-browser";

export default function SearchPage() {
  return <main className="shell inner-shell">
    <header className="topbar glass">
      <Link className="brand" href="/"><span className="brand-mark"><Gamepad2 size={19}/></span><span>playhive</span></Link>
      <nav><Link href="/">Discover</Link><Link href="/games">Games</Link><Link href="/categories">Categories</Link></nav>
      <Link className="button dark" href="/games"><ArrowLeft size={15}/> All games</Link>
    </header>
    <section className="page-wrap library-page">
      <div className="eyebrow"><span className="eyebrow-dot"/> THE WHOLE LIBRARY</div>
      <h1 className="page-title">What do you<br/><span>feel like playing?</span></h1>
      <p className="page-lead">Search titles, browse genres and find something new.</p>
      <GamesBrowser/>
    </section>
  </main>;
}
