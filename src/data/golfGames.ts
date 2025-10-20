// src/data/golfGames.ts
import { GolfGame, scoringFormat, gameplayFormat, matchupFormat } from "@/types/golf";

export const golfGames: GolfGame[] = [
  {
    id: "skins",
    name: "Skins Game",
    description: "Each hole is worth a 'skin'. Lowest score wins the skin. If tied, skin carries over.",
    minPlayers: 2,
    maxPlayers: 8,
    scoringFormats: [scoringFormat.StrokePlay, scoringFormat.MatchPlay], // multiple possible
    gameplayFormats: [gameplayFormat.Individual],
    matchupFormats: [matchupFormat.H2H],
    bettingEnabled: true,
    handicapEnabled: true,
    tags: ['Popular', 'Betting', 'Individual']
  },
  {
    id: "nassau",
    name: "Nassau",
    description: "Three separate bets: front 9, back 9, and overall 18-hole match.",
    minPlayers: 2,
    maxPlayers: 4,
    scoringFormats: [scoringFormat.StrokePlay],
    gameplayFormats: [gameplayFormat.Individual],
    matchupFormats: [matchupFormat.H2H],
    bettingEnabled: true,
    handicapEnabled: true,
    tags: ['Classic', 'Betting', 'Traditional']
  },
  {
    id: "wolf",
    name: "Wolf",
    description: "Players take turns being the 'Wolf'. Wolf chooses a partner or plays alone against the field.",
    minPlayers: 4,
    maxPlayers: 4,
    scoringFormats: [scoringFormat.PointsBased],
    gameplayFormats: [gameplayFormat.Individual],
    matchupFormats: [matchupFormat.ModifiedMatchup],
    bettingEnabled: true,
    handicapEnabled: false,
    tags: ['Strategy', 'Rotating', 'Partnership']
  },
  {
    id: "best-ball",
    name: "Best Ball",
    description: "Teams of 2. Each player plays their own ball, lowest score per team counts.",
    minPlayers: 4,
    maxPlayers: 8,
    scoringFormats: [scoringFormat.StrokePlay],
    gameplayFormats: [gameplayFormat.BestBall],
    matchupFormats: [matchupFormat.TeamPlay],
    bettingEnabled: true,
    handicapEnabled: true,
    tags: ['Team', 'Beginner Friendly', 'Cooperative']
  },
  {
    id: "scramble",
    name: "Scramble",
    description: "Team format. All players tee off, best shot is selected, all play from there.",
    minPlayers: 3,
    maxPlayers: 8,
    scoringFormats: [scoringFormat.StrokePlay],
    gameplayFormats: [gameplayFormat.Scramble],
    matchupFormats: [matchupFormat.TeamPlay],
    bettingEnabled: true,
    handicapEnabled: true,
    tags: ['Team', 'Fun', 'Beginner Friendly']
  },
  {
    id: "stableford",
    name: "Stableford",
    description: "Points-based scoring. Birdie = 3pts, Par = 2pts, Bogey = 1pt, worse = 0pts.",
    minPlayers: 2,
    maxPlayers: 8,
    scoringFormats: [scoringFormat.PointsBased],
    gameplayFormats: [gameplayFormat.Individual],
    matchupFormats: [matchupFormat.H2H],
    bettingEnabled: true,
    handicapEnabled: true,
    tags: ['Points', 'Forgiving', 'Individual']
  },
  {
    id: "bingo-bango-bongo",
    name: "Bingo Bango Bongo",
    description: "Three points per hole: first on green (Bingo), closest to pin (Bango), first in hole (Bongo).",
    minPlayers: 3,
    maxPlayers: 6,
    scoringFormats: [scoringFormat.PointsBased],
    gameplayFormats: [gameplayFormat.Individual],
    matchupFormats: [matchupFormat.H2H],
    bettingEnabled: true,
    handicapEnabled: true,
    tags: ['Points', 'Skill', 'Multiple Winners']
  },
  {
    id: "chicago",
    name: "Chicago",
    description: "Points based on performance vs par. Quotas set based on handicap.",
    minPlayers: 2,
    maxPlayers: 8,
    scoringFormats: [scoringFormat.PointsBased],
    gameplayFormats: [gameplayFormat.Individual],
    matchupFormats: [matchupFormat.H2H],
    bettingEnabled: true,
    handicapEnabled: true,
    tags: ['Handicap Based', 'Fair', 'Points']
  },
  {
    id: "alternate-shot",
    name: "Alternate Shot",
    description: "Teams of 2. Partners alternate hitting the same ball.",
    minPlayers: 4,
    maxPlayers: 8,
    scoringFormats: [scoringFormat.StrokePlay],
    gameplayFormats: [gameplayFormat.Modified],
    matchupFormats: [matchupFormat.TeamPlay],
    bettingEnabled: true,
    handicapEnabled: false,
    tags: ['Team', 'Challenging', 'Partnership']
  },
  {
    id: "vegas",
    name: "Vegas",
    description: "Teams of 2. Scores combined to form numbers (4&5 = 45). Lower number wins.",
    minPlayers: 4,
    maxPlayers: 4,
    scoringFormats: [scoringFormat.StrokePlay],
    gameplayFormats: [gameplayFormat.BestBall],
    matchupFormats: [matchupFormat.TeamPlay],
    bettingEnabled: true,
    handicapEnabled: false,
    tags: ['Team', 'Unique Scoring', 'Betting']
  }
];
