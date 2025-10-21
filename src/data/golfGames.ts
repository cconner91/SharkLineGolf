// src/data/golfGames.ts

// scoringFormat Types: The Scoring format is the overarching method in which scores are calculated. 
// StrokePlay = "StrokePlay"
// MatchPlay = "MatchPlay"
// PointsBased = "PointsBased"
//_________________________

// gameplayFormat Types: The Gameplay format defines how player(s) within the game play the ball.
// Individual = "Individual",  Each player plays their own ball.
// BestBall = "BestBall", Each player plays their ball and best score counts.
// Scramble = "Scramble", All play, best shot is selected each time.
// Shamble = "Shamble", All players hit tee shot - Best tee shot selected and each player plays their own ball from there with best score counting
// AltShot = "Teammates alternate shots"
//_________________________

// matchupFormat Types: The Matchup format defines how the players within the game are playing against each other.
// Solo = "Solo", Solo Play.
// H2H = "H2H", H2H matchup - 1v1, 1v1v1, 1v1v1v1.
// H2HModified = "H2HModified", H2H matchup hyrbid - 2v1, 1v3, 4v1 etc...
// TeamPlay = "TeamPlay", Team of 2 or more vs another team.

// Each Game has it's own set of criteria applied towards a full round of golf. For some games, players may customize certain conditions such as the scoring format, gamplay format and matchup format. 

// The "Custom Game" will allow users to create their own set of criteria for a game. This includes applying different scoring, gameplay and matchup formats for each hole allowing for the ultimate custom game builder. Players will also be able to save these settings and name the game for future use.

//GameplayFormat Dependencies - AltShot, Shamble, Scramble, BestBall can only be utilized if the Matchup Format is TeamPlay, H2H Modified. 


Players may also choose a custom game or customize the pre-set game chosen.

import { GolfGame, scoringFormat, gameplayFormat, matchupFormat } from "@/types/golf";

export const golfGames: GolfGame[] = [
    {
    id: "basic-stroke-play",
    name: "Basic Stroke Play (Medal Play)",
    description: "Traditional golf scoring. Count every stroke from tee to hole. Lowest total score wins.",
    minPlayers: 1,
    maxPlayers: 8,
    scoringFormat: [scoringFormat.StrokePlay],
    gameplayFormat: [gameplayFormat.Individual, gameplayFormat.BestBall, gameplayFormat.Scramble, gameplayFormat.Shamble, gameplayFormat.AltShot], // multiple possible
    matchupFormat: [matchupFormat.Solo, matchupFormat.H2H, matchupFormat.H2HModified, matchupFormat.TeamPlay, matchupFormat.ModifiedMatchup], // multiple possible
    bettingEnabled: true,
    handicapEnabled: true,
    tags: ['Classic', 'Traditional', 'Beginner Friendly']
  },
  {
    id: "match-play-singles",
    name: "Match Play (Singles)",
    description: "Hole-by-hole competition. Win, lose, or tie each hole. Player with most holes won wins the match.",
    minPlayers: 2,
    maxPlayers: 4,
    scoringFormat: [scoringFormat.MatchPlay],
    gameplayFormat: [gameplayFormat.Individual],
    matchupFormat: [matchupFormat.H2H],
    bettingEnabled: true,
    handicapEnabled: true,
    tags: ['Classic', 'Traditional', 'Beginner Friendly']
  },
  {
    id: "match-play-team",
    name: "Team Match Play",
    description: "Hole-by-hole competition in team format. Win, lose, or tie each hole. Player with most holes won wins the match.",
    minPlayers: 3,
    maxPlayers: 8,
    scoringFormat: [scoringFormat.MatchPlay],
    gameplayFormat: [gameplayFormat.BestBall, gameplayFormat.Scramble, gameplayFormat.Shamble, gameplayFormat.Modified], // multiple possible
    matchupFormat: [matchupFormat.TeamPlay],
    bettingEnabled: true,
    handicapEnabled: true,
    tags: ['Classic', 'Traditional', 'Beginner Friendly']
  },
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
    scoringFormats: [scoringFormat.StrokePlay, scoringFormat.MatchPlay], // multiple possible
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
    handicapEnabled: false, //handicaps can't be applied to this game
    tags: ['Strategy', 'Rotating', 'Partnership']
  },
  {
    id: "best-ball",
    name: "Best Ball",
    description: "Teams of 2. Each player plays their own ball, lowest score per team counts.",
    minPlayers: 4,
    maxPlayers: 8,
    scoringFormats: [scoringFormat.StrokePlay, scoringFormat.MatchPlay, scoringFormat.PointsBased], // multiple possible,
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
    scoringFormats: [scoringFormat.StrokePlay, scoringFormat.MatchPlay, scoringFormat.PointsBased], // multiple possible
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
    tags: ['Points']
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
    id: "alt-shot",
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
  },
  {
    id: "custom-game",
    name: "Custom Game",
    description: "Customize your own game utilizing one or multiple scoring, gameplay and matchup formats for each hole",
    minPlayers: 1,
    maxPlayers: 8,
    scoringFormats: [scoringFormat.StrokePlay, scoringFormat.MatchPlay, scoringFormat.PointsBased], // multiple possible
    gameplayFormats: [gameplayFormat.Individual, gameplayFormat.BestBall, gameplayFormat.Scramble, gameplayFormat.Shamble, gameplayFormat.Modified], // multiple possible
    matchupFormats: [matchupFormat.Solo, matchupFormat.H2H, matchupFormat.H2HHybrid, matchupFormat.TeamPlay],
    bettingEnabled: true,
    handicapEnabled: true,
    tags: ['Team', 'Unique Scoring', 'Betting']
  }
];
