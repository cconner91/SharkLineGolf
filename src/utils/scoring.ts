import { GameState, HoleScore, Player } from "@/types/golf";

/**
 * Get total strokes for a player
 */
export const getPlayerTotal = (playerId: string, scores: HoleScore[]): number => {
  return scores
    .filter((score) => score.playerId === playerId)
    .reduce((total, score) => total + score.strokes, 0);
};

/**
 * Generate a leaderboard sorted by total strokes (ascending)
 */
export const generateLeaderboard = (players: Player[], scores: HoleScore[], currentHole: number) => {
  return players
    .map((player) => ({
      ...player,
      total: getPlayerTotal(player.id, scores),
      thruHole: currentHole - 1
    }))
    .sort((a, b) => a.total - b.total);
};

/**
 * Reset hole scores for the next hole
 */
export const initializeHoleScores = (players: Player[], defaultPar = 4): Record<string, number> => {
  const holeScores: Record<string, number> = {};
  players.forEach((player) => {
    holeScores[player.id] = defaultPar;
  });
  return holeScores;
};
