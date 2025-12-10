// src/types/golf.ts

// --------------------
// Enums
// --------------------
export enum scoringFormat {
  StrokePlay = "StrokePlay",
  MatchPlay = "MatchPlay",
  PointsBased = "PointsBased"
}

export enum gameplayFormat {
  Individual = "Individual",
  BestBall = "BestBall",
  Scramble = "Scramble",
  Shamble = "Shamble",
  AlternateShot = "AlternateShot"
}

export enum matchupFormat {
  Solo = "Solo",
  H2H = "H2H",
  H2HModified = "H2HModified",
  TeamPlay = "TeamPlay",
}

// --------------------
// Golf Game Definition
// --------------------
export interface GolfGame {
  id: string;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  scoringFormats: scoringFormat[];
  gameplayFormats: gameplayFormat[];
  matchupFormats: matchupFormat[];
  bettingEnabled: boolean;
  handicapEnabled: boolean;
  tags: string[];
}

// --------------------
// Player
// --------------------
export interface Player {
  id: string;
  name: string;
  handicap?: number;
  email?: string;
  avatar?: string;
  totalGamesPlayed?: number;
  totalWinnings?: number;
  favoriteGame?: string;
}

// --------------------
// Course & Hole Data (Updated to match courses.ts)
// --------------------
export interface Course {
  id: number;
  name: string;
  clubName?: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
  tees: TeeBox[];
}

export interface TeeBox {
  name: string;
  courseRating: number;
  slopeRating: number;
  bogeyRating: number;
  totalYards: number;
  totalMeters: number;
  numberOfHoles: number;
  parTotal: number;
  frontCourseRating?: number;
  frontSlopeRating?: number;
  frontBogeyRating?: number;
  backCourseRating?: number;
  backSlopeRating?: number;
  backBogeyRating?: number;
  holes: Hole[];
}

export interface Hole {
  holeNumber: number;
  par: number;
  yardage: number;
  handicap: number; // Stroke index (1-18, 1 being hardest)
}

// --------------------
// Scoring
// --------------------
export interface HoleScore {
  playerId: string;
  holeNumber: number;
  strokes: number;
  netStrokes?: number; // After handicap adjustment
  points?: number; // For points-based games (Stableford, etc.)
}

// --------------------
// Game State
// --------------------
export interface GameState {
  gameId: string;
  game: GolfGame;
  course: Course;
  selectedTeeBox: string;
  players: Player[];
  currentHole: number;
  scores: HoleScore[];
  bets: Bet[];
  isComplete: boolean;
  startTime?: Date;
  endTime?: Date;
}

// --------------------
// Betting
// --------------------
export interface Bet {
  id: string;
  type: string;
  amount: number;
  participants: string[]; // player IDs
  description: string;
  isResolved: boolean;
  winner?: string;
}

// --------------------
// Match Play Specific
// --------------------
export interface MatchPlayResult {
  playerId: string;
  holesWon: number;
  holesLost: number;
  holesTied: number;
  status: 'up' | 'down' | 'tied' | 'dormie' | 'winner';
}

// --------------------
// Skins Specific
// --------------------
export interface SkinsResult {
  holeNumber: number;
  winner?: string; // player ID
  carryover: number;
  value: number;
}

// --------------------
// Stableford Specific
// --------------------
export interface StablefordScore extends HoleScore {
  points: number; // 0-4 points per hole
}

// --------------------
// Nassau Specific
// --------------------
export interface NassauResult {
  front9: {
    winner?: string;
    scores: { [playerId: string]: number };
  };
  back9: {
    winner?: string;
    scores: { [playerId: string]: number };
  };
  overall: {
    winner?: string;
    scores: { [playerId: string]: number };
  };
}

// --------------------
// Team Game Types
// --------------------
export interface Team {
  id: string;
  name: string;
  playerIds: string[];
  color?: string;
}

export interface TeamScore {
  teamId: string;
  holeNumber: number;
  score: number;
  scoringPlayerId?: string; // For BestBall - which player's score counted
}

// --------------------
// Custom Game Builder
// --------------------
export interface HoleFormat {
  scoringFormat: scoringFormat;
  gameplayFormat: gameplayFormat;
  matchupFormat: matchupFormat;
}

export interface CustomGameConfig {
  baseGame?: GolfGame;
  name: string;
  front9?: HoleFormat;
  back9?: HoleFormat;
  perHoleFormats?: { [holeNumber: number]: HoleFormat };
}

// --------------------
// Handicap Calculations
// --------------------
export interface HandicapCalculation {
  handicapIndex: number;
  courseHandicap: number;
  playingHandicap: number;
  strokesPerHole: { [holeNumber: number]: number }; // 0, 1, or 2 strokes
}

// --------------------
// Leaderboard Entry
// --------------------
export interface LeaderboardEntry {
  playerId: string;
  playerName: string;
  totalScore: number;
  netScore?: number;
  thruHole: number;
  position: number;
  toPar?: number;
}
