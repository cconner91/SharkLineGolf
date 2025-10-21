// /data/handicap.ts

export interface Player {
  id: string;
  name: string;
  handicapIndex: number;
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
  percentOfHandicap?: number; // e.g., 50 for 50% of team total handicap
}

export interface Hole {
  par: number;
  yardage: number;
  handicap: number;
}

export interface Tee {
  name: string;
  courseRating: number;
  slopeRating: number;
  bogeyRating: number;
  totalYards: number;
  totalMeters: number;
  numberOfHoles: number;
  parTotal: number;
  frontCourseRating: number;
  frontSlopeRating: number;
  frontBogeyRating: number;
  backCourseRating: number;
  backSlopeRating: number;
  backBogeyRating: number;
  holes: Hole[];
}

// -------------------------
// Stroke Play: Adjusted Strokes per Hole
// -------------------------
export function calculateAdjustedStrokes(
  player: Player,
  tee: Tee
): number[] {
  const { handicapIndex } = player;
  const { holes, slopeRating, courseRating } = tee;

  // USGA formula to compute course handicap
  // Course Handicap = Handicap Index * (Slope Rating / 113) + (Course Rating - Par)
  const coursePar = tee.parTotal;
  const courseHandicap = Math.round(
    handicapIndex * (slopeRating / 113) + (courseRating - coursePar)
  );

  // Allocate strokes to holes by hole handicap
  // e.g., lowest handicap hole gets the first extra stroke, etc.
  const adjustedStrokes: number[] = holes.map(() => 0);
  let strokesRemaining = courseHandicap;

  const sortedHoleIndexes = holes
    .map((h, i) => ({ index: i, handicap: h.handicap }))
    .sort((a, b) => a.handicap - b.handicap)
    .map((h) => h.index);

  let i = 0;
  while (strokesRemaining > 0) {
    adjustedStrokes[sortedHoleIndexes[i % holes.length]] += 1;
    strokesRemaining--;
    i++;
  }

  return adjustedStrokes;
}

// -------------------------
// Match Play: Adjusted Strokes per Hole
// -------------------------
export function calculateMatchPlayStrokes(
  player: Player,
  opponent: Player,
  tee: Tee
): number[] {
  const playerCourseHandicap = Math.round(
    player.handicapIndex * (tee.slopeRating / 113) + (tee.courseRating - tee.parTotal)
  );
  const opponentCourseHandicap = Math.round(
    opponent.handicapIndex * (tee.slopeRating / 113) + (tee.courseRating - tee.parTotal)
  );

  const strokeDifference = playerCourseHandicap - opponentCourseHandicap;

  // Allocate strokes by hole handicap like stroke play
  const strokes: number[] = tee.holes.map(() => 0);
  if (strokeDifference > 0) {
    let strokesRemaining = strokeDifference;
    const sortedHoleIndexes = tee.holes
      .map((h, i) => ({ index: i, handicap: h.handicap }))
      .sort((a, b) => a.handicap - b.handicap)
      .map((h) => h.index);

    let i = 0;
    while (strokesRemaining > 0) {
      strokes[sortedHoleIndexes[i % tee.holes.length]] += 1;
      strokesRemaining--;
      i++;
    }
  }

  return strokes;
}

// -------------------------
// Team Handicap: Weighted by Percent
// -------------------------
export function calculateTeamHandicap(
  team: Team
): number {
  const totalIndex = team.players.reduce((sum, p) => sum + p.handicapIndex, 0);
  const percent = team.percentOfHandicap ?? 100;
  return totalIndex * (percent / 100);
}

// -------------------------
// Helper: Compute Net Score
// -------------------------
export function computeNetScore(
  grossScore: number,
  adjustedStrokes: number[]
): number {
  const totalAdjustment = adjustedStrokes.reduce((sum, s) => sum + s, 0);
  return grossScore - totalAdjustment;
}
