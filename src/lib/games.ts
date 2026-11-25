export const games = [
  { slug: "snake", title: "Snake", category: "Arcade", description: "Grow longer, collect food and try not to run into yourself.", accent: "mint", icon: "🐍" },
  { slug: "memory", title: "Memory", category: "Puzzle", description: "Flip the cards, find matching pairs and test your memory.", accent: "lilac", icon: "🧠" },
  { slug: "flap", title: "Flap", category: "Arcade", description: "Time each flap, slip through the gaps and beat your best score.", accent: "blue", icon: "🪽" },
  { slug: "blocks", title: "Blocks", category: "Puzzle", description: "Fit falling shapes together and clear as many lines as you can.", accent: "peach", icon: "🧩" },
  { slug: "labyrinth", title: "Labyrinth", category: "Puzzle", description: "Find your way through a maze and reach the exit.", accent: "yellow", icon: "🌀" },
  { slug: "whac-a-mole", title: "Whac-A-Mole", category: "Casual", description: "Stay sharp and tap the moles before they disappear.", accent: "mint", icon: "🔨" },
] as const;

export type PlayHiveGame = (typeof games)[number];
export const getGame = (slug: string) => games.find((game) => game.slug === slug);
export const gameEmbedUrl = (slug: string) => `https://opengames-dev.github.io/${slug}/index.html`;
