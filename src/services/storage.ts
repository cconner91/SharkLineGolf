import { Player } from "@/types/golf";

const PLAYER_KEY = "golfbet_players";

/**
 * Save a player to localStorage
 */
export const savePlayer = (player: Player) => {
  const players = getAllPlayers();
  const index = players.findIndex((p) => p.id === player.id);

  if (index > -1) {
    players[index] = player;
  } else {
    players.push(player);
  }

  localStorage.setItem(PLAYER_KEY, JSON.stringify(players));
};

/**
 * Get all saved players
 */
export const getAllPlayers = (): Player[] => {
  const stored = localStorage.getItem(PLAYER_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as Player[];
  } catch {
    return [];
  }
};

/**
 * Get a player by ID
 */
export const getPlayerById = (id: string): Player | null => {
  return getAllPlayers().find((p) => p.id === id) || null;
};
