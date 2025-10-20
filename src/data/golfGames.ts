import { GolfGamePreset, scoringFormat, gameplayFormat, matchupFormat } from "@/types/golf";

export const golfGames: GolfGamePreset[] = [
  {
    id: "skins",
    name: "Skins Game",
    description: "Each hole is worth a 'skin'. Lowest score wins the skin. If tied, skin carries over.",
    minPlayers: 2,
    maxPlayers: 8,
    scoringFormats: [scoringFormat.MatchPlay, scoringFormat.StrokePlay],
    gameplayFormats: [gameplayFormat.Individual],
    matchupFormats: [matchupFormat.H2H],
    bettingEnabled: true,
    tags: ['Popular', 'Exciting', 'NoTeamPlay']
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
    tags: ['Classic', 'Betting', 'Traditional', 'NoTeamPlay']
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
    tags: ['Team', 'Fun', 'Beginner Friendly']
  }
  // Add other games similarly...
];

