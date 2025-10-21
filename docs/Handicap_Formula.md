# Handicap Formulas

## 1. Stroke Play Handicap Adjustment
A. USGA-based formula

For Stroke Play, the general approach is:

Net Score = Gross Score − Handicap Strokes Allocated

Handicap Strokes Allocation:

Course Handicap Calculation:

Course Handicap
=
Handicap Index
×
Slope Rating
113
+
(
Course Rating
−
Par
)
## Course Handicap 
Handicap Index x Slope Rating/113 + (Course Rating - Par)


Slope Rating = difficulty adjustment for bogey vs scratch golfers (113 is standard slope)

Course Rating = expected score for a scratch golfer

Par = total par for the course

Assigning Strokes to Holes:

Sort holes by stroke index (handicap index per hole, usually 1–18, 1 = hardest)

Allocate 1 stroke per hole, starting from the hardest, until the player’s course handicap is used up.

For fractional handicaps >18, the “pop on” repeats: e.g., 24 strokes → first 18 holes get 1 stroke, hardest 6 holes get 1 extra stroke.

Implementation Plan:

Store holes with handicap (USGA hole difficulty index)

For each player:

Compute course Handicap

Allocate strokes to holes according to their index

_____________________

## 2. Match Play Handicap Adjustment

Match Play is trickier because you only adjust per hole, not for the total score.

Common approaches:

Hole-by-Hole Handicap:

Calculate course handicap like Stroke Play

Assign strokes to the hardest holes

On each hole, the lower-handicap player only wins if their adjusted net beats opponent’s gross score

Team Play (Match Play):

For each team, sum or average handicaps

Allocate “team strokes” per hole in a similar way to individual Match Play

Options for partial handicaps (like 50%) are applied before distributing strokes to holes

_____________________

## 3. Team Formats with Handicap Percentages

Example: Best Ball / Scramble

Team Handicap = sum or average of player handicaps

Allow the user to specify a percentage (e.g., 50%)

Apply percentage to team handicap before allocating strokes

Example:
Team 1: Player 1 = 14.5, Player 2 = 7.4
Team 2: Player 1 = 4.1, Player 2 = 16.3

Team 1 avg = (14.5 + 7.4)/2 = 10.95 → 50% → 5.475 → round to 5 or 6 strokes
Team 2 avg = (4.1 + 16.3)/2 = 10.2 → 50% → 5.1 → round to 5 strokes

Then allocate 5 strokes per team to the hardest holes according to hole handicaps.

Notes:

Could also sum handicaps instead of averaging, depending on format

For Scramble, usually a fraction of the best player’s handicap is applied

For Best Ball, you could use the average of both players for the team, then distribute per hole


_____________________________

## 4. Proposed Data Structures

interface Player {
  name: string;
  handicapIndex: number;
}

interface Team {
  players: Player[];
  teamHandicapPercent?: number; // e.g., 0.5 for 50%
}

interface Hole {
  par: number;
  yardage: number;
  handicap: number; // USGA hole difficulty index
}

interface Tee {
  courseRating: number;
  slopeRating: number;
  parTotal: number;
  holes: Hole[];
}

_____________________________

## 5. Function Skeletons

// 1. Calculate course handicap
function getCourseHandicap(handicapIndex: number, slope: number, courseRating: number, par: number) {
  return Math.round(handicapIndex * (slope / 113) + (courseRating - par));
}

// 2. Allocate strokes to holes (Stroke Play or Match Play)
function allocateStrokes(courseHandicap: number, holes: Hole[]) {
  const sortedHoles = [...holes].sort((a, b) => a.handicap - b.handicap); // 1 = hardest
  const strokesPerHole = Array(holes.length).fill(0);

  for (let i = 0; i < courseHandicap; i++) {
    strokesPerHole[i % holes.length] += 1;
  }

  return strokesPerHole;
}

// 3. Calculate team handicap (with optional percentage)
function getTeamHandicap(players: Player[], percent = 1) {
  const avg = players.reduce((sum, p) => sum + p.handicapIndex, 0) / players.length;
  return Math.round(avg * percent);
}
