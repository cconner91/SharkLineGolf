// src/types/golf.ts

// --------------------
// Primary Enums
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
  AlternateShot = "AltShot"
}

export enum matchupFormat {
  Solo = "Solo",
  H2H = "H2H",
  H2HModified = "H2HModified",
  TeamPlay = "TeamPlay",
}

// --------------------
// Core Interfaces
// --------------------
export interface GolfGame {
  id: string;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  scoringFormats: scoringFormat[];    // multiple allowed
  gameplayFormats: gameplayFormat[];  // multiple allowed
  matchupFormats: matchupFormat[];    // multiple allowed
  bettingEnabled: boolean;
  handicapEnabled: boolean;           // optional toggle for handicaps
  tags: string[];                     // for rules / logic constraints
}

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

export interface Course {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  scorecard: {
    totalHoles: number;
    totalPar: number;
    totalYardage: number;
    holes: Hole[];
  };
  rating?: number;
  slope?: number;
  teeBoxes: TeeBox[];
}

export interface Hole {
  number: number;
  par: number;
  yardage: {
    [teeBox: string]: number;
  };
  handicap: number;
}

export interface TeeBox {
  name: string;
  color: string;
  totalYardage: number;
  rating: number;
  slope: number;
}

export interface HoleScore {
  playerId: string;
  holeNumber: number;
  strokes: number;
  points?: number;
  birdies?: number;
  albatross?: number;
  eagles?: number;
  pars?: number;
  bogeys?: number;
}

export interface GameState {
  gameId: string;
  players: Player[];
  currentHole: number;
  scores: HoleScore[];
  bets: Bet[];
  isComplete: boolean;
  courseId?: string;
  selectedTeeBox?: string;
}

export interface Bet {
  id: string;
  type: string;
  amount: number;
  participants: string[];
  description: string;
  isResolved: boolean;
  winner?: string;
}

// --------------------
// Helper for Custom Games
// --------------------
export interface CustomGame extends Omit<GolfGame, 'id'> {
  baseGameId?: string; // optional reference to a preset game
}


// --------------------
// Defining front9 and back9 custom formatting logic for scoring, gameplay and matchup
// --------------------

import { Player, GolfGame, scoringFormat, gameplayFormat, matchupFormat } from './golf';

export interface HoleFormat {
  scoringFormat: scoringFormat;
  gameplayFormat: gameplayFormat;
  matchupFormat: matchupFormat;
}

export interface GameInstance {
  id: string;
  name: string;
  players: Player[];
  baseGame: GolfGame; // The preset game selected
  handicapEnabled: boolean;
  front9?: HoleFormat;  // Optional: overrides for front 9
  back9?: HoleFormat;   // Optional: overrides for back 9
  scores?: Record<string, number[]>; // playerId -> hole scores
}
