import { gameplayFormat, matchupFormat, scoringFormat } from "@/types/golf";

export const validCombinations = {
  [gameplayFormat.Individual]: [
    matchupFormat.Solo,
    matchupFormat.H2H,
    matchupFormat.H2HModified,
    matchupFormat.TeamPlay
  ],
  [gameplayFormat.BestBall]: [matchupFormat.TeamPlay],
  [gameplayFormat.Scramble]: [matchupFormat.TeamPlay],
  [gameplayFormat.Shamble]: [matchupFormat.TeamPlay],
  [gameplayFormat.AltShot]: [matchupFormat.TeamPlay],
};

// Optional exception list
export const invalidCombinations = [
  { scoring: scoringFormat.MatchPlay, matchup: matchupFormat.Solo },
];

export const isValidCombination = (
  scoring: scoringFormat,
  gameplay: gameplayFormat,
  matchup: matchupFormat
): boolean => {
  const validMatchups = validCombinations[gameplay] || [];
  const isValidMatchup = validMatchups.includes(matchup);

  const isInvalidScoringCombo = invalidCombinations.some(
    rule => rule.scoring === scoring && rule.matchup === matchup
  );

  return isValidMatchup && !isInvalidScoringCombo;
};
