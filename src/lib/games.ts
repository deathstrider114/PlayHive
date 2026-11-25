export const games = [
  { slug: "snake", title: "Snake", category: "Arcade", description: "Grow longer, collect food and try not to run into yourself.", accent: "mint", icon: "🐍", provider: "opengames" },
  { slug: "memory", title: "Memory", category: "Puzzle", description: "Flip the cards, find matching pairs and test your memory.", accent: "lilac", icon: "🧠", provider: "opengames" },
  { slug: "flap", title: "Flap", category: "Arcade", description: "Time each flap, slip through the gaps and beat your best score.", accent: "blue", icon: "🪽", provider: "opengames" },
  { slug: "blocks", title: "Blocks", category: "Puzzle", description: "Fit falling shapes together and clear as many lines as you can.", accent: "peach", icon: "🧩", provider: "opengames" },
  { slug: "labyrinth", title: "Labyrinth", category: "Puzzle", description: "Find your way through a maze and reach the exit.", accent: "yellow", icon: "🌀", provider: "opengames" },
  { slug: "whac-a-mole", title: "Whac-A-Mole", category: "Casual", description: "Stay sharp and tap the moles before they disappear.", accent: "mint", icon: "🔨", provider: "opengames" },
  { slug: "2048", title: "2048", category: "Puzzle", description: "Slide and merge matching tiles. Can you reach 2048?", accent: "blue", icon: "🧮", provider: "mashukui" },
  { slug: "minesweeper", title: "Minesweeper", category: "Puzzle", description: "Clear the board without setting off a mine. Three board sizes.", accent: "slate", icon: "💣", provider: "mashukui" },
  { slug: "breakout", title: "Breakout", category: "Arcade", description: "Bounce the ball, smash the bricks and clear each level.", accent: "peach", icon: "🧱", provider: "mashukui" },
  { slug: "paddle-duel", title: "Paddle Duel", category: "Arcade", description: "Take on the computer in a fast game of paddle and ball.", accent: "blue", icon: "🏓", provider: "mashukui" },
  { slug: "stack-tower", title: "Stack Tower", category: "Arcade", description: "Drop each block in line and see how high you can build.", accent: "mint", icon: "🏗️", provider: "mashukui" },
  { slug: "tic-tac-toe", title: "Tic Tac Toe", category: "Classic", description: "Get three in a row against the computer or a friend.", accent: "lilac", icon: "⭕", provider: "mashukui" },
  { slug: "connect-four", title: "Connect Four", category: "Classic", description: "Drop your discs and connect four before the computer does.", accent: "peach", icon: "🔴", provider: "mashukui" },
  { slug: "ant-jump", title: "Ant Jump", category: "Arcade", description: "Bounce between platforms and guide the ant as high as you can.", accent: "yellow", icon: "🐜", provider: "mashukui" },
  { slug: "dino-run", title: "Dino Run", category: "Action", description: "Jump the cacti, duck the birds and keep the run going.", accent: "mint", icon: "🦖", provider: "mashukui" },
  { slug: "bubble-shooter", title: "Bubble Shooter", category: "Puzzle", description: "Aim, match colours and clear the board one bubble at a time.", accent: "lilac", icon: "🫧", provider: "mashukui" },
  { slug: "sudoku", title: "Sudoku", category: "Puzzle", description: "Fill the grid with numbers. Choose easy, medium or hard.", accent: "blue", icon: "🔢", provider: "mashukui" },
  { slug: "water-sort", title: "Water Sort", category: "Puzzle", description: "Sort the colours into their own tubes, one pour at a time.", accent: "blue", icon: "🧪", provider: "mashukui" },
  { slug: "air-hockey", title: "Air Hockey", category: "Arcade", description: "Move your mallet, send the puck flying and race to seven goals.", accent: "peach", icon: "🏒", provider: "mashukui" },
  { slug: "sokoban", title: "Sokoban", category: "Puzzle", description: "Push every crate onto a target. Think ahead before each move.", accent: "yellow", icon: "📦", provider: "mashukui" },
] as const;

export type PlayHiveGame = (typeof games)[number];
export const getGame = (slug: string) => games.find((game) => game.slug === slug);
export const gameEmbedUrl = (slug: string) => {
  const game = getGame(slug);
  if (game?.provider === "mashukui") return `https://mashukui.github.io/web-games/${slug}/`;
  return `https://opengames-dev.github.io/${slug}/index.html`;
};
