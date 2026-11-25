"use client";

import { useEffect, useMemo, useState } from "react";
import GameCard from "@/components/game-card";
import { Search, SlidersHorizontal, Gamepad2 } from "lucide-react";
import { games } from "@/lib/games";

const filters = ["All", ...Array.from(new Set(games.map((game) => game.category)))];

export default function GamesBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("category");
    if (requested && filters.includes(requested)) setCategory(requested);
  }, []);

  const visibleGames = useMemo(() => {
    const filtered = games.filter((game) => {
      const matchesCategory = category === "All" || game.category === category;
      const matchesQuery = `${game.title} ${game.category} ${game.description}`.toLowerCase().includes(query.toLowerCase().trim());
      return matchesCategory && matchesQuery;
    });
    if (sort === "az") return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    return filtered;
  }, [category, query, sort]);

  return <>
    <div className="library-controls">
      <label className="library-search"><Search size={17}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search games..." aria-label="Search games"/></label>
      <label className="sort-control"><SlidersHorizontal size={15}/><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort games"><option value="featured">Featured</option><option value="az">Name: A to Z</option></select></label>
    </div>
    <div className="filter-row" aria-label="Filter by category">{filters.map((filter) => <button type="button" className={category === filter ? "filter-chip active" : "filter-chip"} onClick={() => setCategory(filter)} key={filter}>{filter}</button>)}</div>
    <div className="library-result-line"><span>{visibleGames.length} {visibleGames.length === 1 ? "game" : "games"}</span><span>Every game is free to play</span></div>
    {visibleGames.length ? <div className="game-library-grid library-grid">{visibleGames.map((game, index) => <GameCard game={game} key={game.slug}/>)}</div> : <div className="library-empty"><Gamepad2 size={27}/><h2>No games found</h2><p>Try another search or choose a different category.</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button></div>}
  </>;
}
