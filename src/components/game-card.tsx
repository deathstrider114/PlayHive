"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { PlayHiveGame } from "@/lib/games";

const FAVOURITES_KEY = "playhive:favourites";
const RECENT_KEY = "playhive:recent";

function readList(key: string): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export default function GameCard({ game }: { game: PlayHiveGame }) {
  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadFavourite() {
      const localFavourite = readList(FAVOURITES_KEY).includes(game.slug);
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase.from("user_favourites").select("game_slug").eq("user_id", user.id).eq("game_slug", game.slug).maybeSingle();
          if (active) setFavourite(Boolean(data) || localFavourite);
          if (localFavourite && !data) await supabase.from("user_favourites").upsert({ user_id: user.id, game_slug: game.slug });
        } else if (active) setFavourite(localFavourite);
      } catch {
        if (active) setFavourite(localFavourite);
      }
    }
    void loadFavourite();
    return () => { active = false; };
  }, [game.slug]);

  async function toggleFavourite() {
    const next = !favourite;
    setFavourite(next);
    const local = readList(FAVOURITES_KEY).filter((slug) => slug !== game.slug);
    if (next) local.unshift(game.slug);
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(local));
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const result = next
          ? await supabase.from("user_favourites").upsert({ user_id: user.id, game_slug: game.slug })
          : await supabase.from("user_favourites").delete().eq("user_id", user.id).eq("game_slug", game.slug);
        if (result.error) throw result.error;
      }
    } catch {
      // Guest favourites remain available locally when Supabase is unavailable.
    }
  }

  async function recordPlay() {
    const recent = readList(RECENT_KEY).filter((slug) => slug !== game.slug);
    recent.unshift(game.slug);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, 12)));
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: previous } = await supabase.from("recently_played").select("play_count").eq("user_id", user.id).eq("game_slug", game.slug).maybeSingle();
      await supabase.from("recently_played").upsert({ user_id: user.id, game_slug: game.slug, last_played_at: new Date().toISOString(), play_count: (previous?.play_count ?? 0) + 1 });
    } catch {
      // The local recent list still works for signed-out players.
    }
  }

  return <article className={`game-card ${game.accent}`}>
    <Link className="game-card-link" href={`/play/${game.slug}`} onClick={() => { void recordPlay(); }}>
      <div className="game-card-art">
        <span className="game-card-icon">{game.icon}</span>
        <small>{game.category}</small>
        <span className="game-card-open"><ArrowUpRight size={16}/></span>
      </div>
      <div className="game-card-copy"><div><h2>{game.title}</h2><p>{game.description}</p></div><span className="game-card-arrow"><ArrowUpRight size={17}/></span></div>
    </Link>
    <button type="button" className={favourite ? "game-favourite active" : "game-favourite"} onClick={toggleFavourite} aria-label={favourite ? `Remove ${game.title} from favourites` : `Add ${game.title} to favourites`} aria-pressed={favourite} title={favourite ? "Remove favourite" : "Add to favourites"}><Heart size={16} fill={favourite ? "currentColor" : "none"}/></button>
  </article>;
}