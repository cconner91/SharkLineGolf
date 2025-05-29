
import { GolfGame, scoringFormat, gameplayFormat, matchupFormat } from "@/types/golf";

export const golfGames: GolfGame[] = [
  {
    id: "skins",
    name: "Skins Game",
    description: "Each hole is worth a 'skin'. Lowest score wins the skin. If tied, skin carries over.",
    minPlayers: 2,
    maxPlayers: 8,
    scoringFormat: scoringFormat.MatchPlay,
    gameplayFormat: gameplayFormat.Individual,
    matchupFormat: matchupFormat.H2H,
    bettingEnabled: true,
    difficulty: 'Easy',
    tags: ['Popular', 'Betting', 'Exciting']
  },
  {
    id: "nassau",
    name: "Nassau",
    description: "Three separate bets: front 9, back 9, and overall 18-hole match.",
    minPlayers: 2,
    maxPlayers: 4,
    scoringFormat: scoringFormat.StrokePlay,
    gameplayFormat: gameplayFormat.Individual,
    matchupFormat: matchupFormat.H2H,
    bettingEnabled: true,
    difficulty: 'Medium',
    tags: ['Classic', 'Betting', 'Traditional']
  },
  {
    id: "wolf",
    name: "Wolf",
    description: "Players take turns being the 'Wolf'. Wolf chooses a partner or plays alone against the field.",
    minPlayers: 4,
    maxPlayers: 4,
    scoringFormat: scoringFormat.PointsBased,
    gameplayFormat: gameplayFormat.Individual,
    matchupFormat: matchupFormat.ModifiedMatchup,
    bettingEnabled: true,
    difficulty: 'Hard',
    tags: ['Strategy', 'Rotating', 'Partnership']
  },
  {
    id: "best-ball",
    name: "Best Ball",
    description: "Teams of 2. Each player plays their own ball, lowest score per team counts.",
    minPlayers: 4,
    maxPlayers: 8,
    scoringFormat: scoringFormat.StrokePlay,
    gameplayFormat: gameplayFormat.BestBall,
    matchupFormat: matchupFormat.TeamPlay,
    bettingEnabled: true,
    difficulty: 'Easy',
    tags: ['Team', 'Beginner Friendly', 'Cooperative']
  },
  {
    id: "scramble",
    name: "Scramble",
    description: "Team format. All players tee off, best shot is selected, all play from there.",
    minPlayers: 3,
    maxPlayers: 8,
    scoringFormat: scoringFormat.StrokePlay,
    gameplayFormat: gameplayFormat.Scramble,
    matchupFormat: matchupFormat.TeamPlay,
    bettingEnabled: true,
    difficulty: 'Easy',
    tags: ['Team', 'Fun', 'Beginner Friendly']
  },
  {
    id: "stableford",
    name: "Stableford",
    description: "Points-based scoring. Birdie = 3pts, Par = 2pts, Bogey = 1pt, worse = 0pts.",
    minPlayers: 2,
    maxPlayers: 8,
    scoringFormat: scoringFormat.PointsBased,
    gameplayFormat: gameplayFormat.Individual,
    matchupFormat: matchupFormat.H2H,
    bettingEnabled: true,
    difficulty: 'Medium',
    tags: ['Points', 'Forgiving', 'Individual']
  },
  {
    id: "bingo-bango-bongo",
    name: "Bingo Bango Bongo",
    description: "Three points per hole: first on green (Bingo), closest to pin (Bango), first in hole (Bongo).",
    minPlayers: 3,
    maxPlayers: 6,
    scoringFormat: scoringFormat.PointsBased,
    gameplayFormat: gameplayFormat.Individual,
    matchupFormat: matchupFormat.H2H,
    bettingEnabled: true,
    difficulty: 'Medium',
    tags: ['Points', 'Skill', 'Multiple Winners']
  },
  {
    id: "chicago",
    name: "Chicago",
    description: "Points based on performance vs par. Quotas set based on handicap.",
    minPlayers: 2,
    maxPlayers: 8,
    scoringFormat: scoringFormat.PointsBased,
    gameplayFormat: gameplayFormat.Individual,
    matchupFormat: matchupFormat.H2H,
    bettingEnabled: true,
    difficulty: 'Medium',
    tags: ['Handicap Based', 'Fair', 'Points']
  },
  {
    id: "alternate-shot",
    name: "Alternate Shot",
    description: "Teams of 2. Partners alternate hitting the same ball.",
    minPlayers: 4,
    maxPlayers: 8,
    scoringFormat: scoringFormat.StrokePlay,
    gameplayFormat: gameplayFormat.Modified,
    matchupFormat: matchupFormat.TeamPlay,
    bettingEnabled: true,
    difficulty: 'Hard',
    tags: ['Team', 'Challenging', 'Partnership']
  },
  {
    id: "vegas",
    name: "Vegas",
    description: "Teams of 2. Scores combined to form numbers (4&5 = 45). Lower number wins.",
    minPlayers: 4,
    maxPlayers: 4,
    scoringFormat: scoringFormat.StrokePlay,
    gameplayFormat: gameplayFormat.BestBall,
    matchupFormat: matchupFormat.TeamPlay,
    bettingEnabled: true,
    difficulty: 'Medium',
    tags: ['Team', 'Unique Scoring', 'Betting']
  }
];

export const scoringFormatDescriptions: Record<scoringFormat, string> = {
  [scoringFormat.StrokePlay]: "Counts the total number of strokes over 18 holes.",
  [scoringFormat.MatchPlay]: "Holes are won/lost/tied based on individual hole performance.",
  [scoringFormat.PointsBased]: "Players earn points based on hole performance."
};

export const gamePlayFormatDescriptions: Record<gameplayFormat, string> = {
  [gameplayFormat.Individual]: "Each player plays their own ball throughout the round.",
  [gameplayFormat.BestBall]: "Each player plays their own ball, but only the best score on each hole counts for the team.",
  [gameplayFormat.Scramble]: "All players tee off, the best shot is selected, and all play from that spot.",
  [gameplayFormat.Shamble]: "All tee off, best drive is chosen, then all players play their own ball to the hole.",
  [gameplayFormat.Modified]: "A custom mix of other gameplay formats (e.g., scramble front 9, best ball back 9)."
};

export const matchupFormatDescriptions: Record<matchupFormat, string> = {
  [matchupFormat.Solo]: "Solo Play",
  [matchupFormat.H2H]: "H2H matchup - 1v1, 1v1v1, 1v1v1v1.",
  [matchupFormat.H2HModified]: "H2H matchup hybrid - 2v1, 1v3, 4v1 etc....",
  [matchupFormat.TeamPlay]: "Team of 2 or more vs another team",
  [matchupFormat.ModifiedMatchup]: "Combination of matchup styles"
};
