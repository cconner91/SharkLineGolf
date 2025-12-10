// src/pages/ActiveGamePage.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Target, Trophy, Plus, Minus, AlertCircle } from "lucide-react";
import { GolfGame, Player, HoleScore, Course } from "@/types/golf";
import { useToast } from "@/hooks/use-toast";

interface ActiveGamePageProps {
  game: GolfGame;
  course: Course;
  teeBox: string;
  players: Player[];
  onBack: () => void;
}

export default function ActiveGamePage({
  game,
  course,
  teeBox,
  players,
  onBack
}: ActiveGamePageProps) {
  const { toast } = useToast();
  
  const [currentHole, setCurrentHole] = useState(1);
  const [allScores, setAllScores] = useState<HoleScore[]>([]);
  const [currentHoleScores, setCurrentHoleScores] = useState<{ [playerId: string]: number }>({});
  const [isComplete, setIsComplete] = useState(false);

  // Get the selected tee box data
  const selectedTee = course.tees.find(t => t.name === teeBox);
  
  // Get current hole data
  const currentHoleData = selectedTee?.holes.find(h => h.holeNumber === currentHole);

  // Initialize scores for current hole (default to par)
  useEffect(() => {
    const initialScores: { [playerId: string]: number } = {};
    players.forEach(player => {
      initialScores[player.id] = currentHoleData?.par || 4;
    });
    setCurrentHoleScores(initialScores);
  }, [currentHole, players, currentHoleData]);

  const adjustScore = (playerId: string, adjustment: number) => {
    setCurrentHoleScores(prev => ({
      ...prev,
      [playerId]: Math.max(1, Math.min(15, (prev[playerId] || 4) + adjustment))
    }));
  };

  const submitHoleScores = () => {
    // Create hole score records
    const newScores: HoleScore[] = Object.entries(currentHoleScores).map(([playerId, strokes]) => ({
      playerId,
      holeNumber: currentHole,
      strokes
    }));

    // Add to all scores
    setAllScores([...allScores, ...newScores]);

    // Move to next hole or finish
    if (currentHole < 18) {
      setCurrentHole(currentHole + 1);
      toast({
        title: `Hole ${currentHole} Complete!`,
        description: `Moving to hole ${currentHole + 1}`,
      });
    } else {
      setIsComplete(true);
      toast({
        title: "Round Complete!",
        description: "Congratulations on finishing your round!",
      });
    }
  };

  // Calculate player totals
  const getPlayerTotal = (playerId: string) => {
    return allScores
      .filter(score => score.playerId === playerId)
      .reduce((total, score) => total + score.strokes, 0);
  };

  // Get leaderboard
  const getLeaderboard = () => {
    return players
      .map(player => ({
        ...player,
        total: getPlayerTotal(player.id),
        thruHole: currentHole - 1
      }))
      .sort((a, b) => a.total - b.total);
  };

  // Get score relative to par for styling
  const getScoreToPar = (strokes: number, par: number) => {
    return strokes - par;
  };

  const getScoreColor = (scoreToPar: number) => {
    if (scoreToPar <= -2) return "text-blue-600 font-bold"; // Eagle or better
    if (scoreToPar === -1) return "text-green-600 font-semibold"; // Birdie
    if (scoreToPar === 0) return "text-gray-800"; // Par
    if (scoreToPar === 1) return "text-orange-600"; // Bogey
    return "text-red-600"; // Double bogey or worse
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="border-green-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Round
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-green-800">{game.name}</h1>
              <div className="flex items-center gap-4 text-sm text-green-600">
                <span>{course.name}</span>
                <span>•</span>
                <span>{teeBox} Tees</span>
              </div>
            </div>
          </div>

          {isComplete && (
            <Badge className="bg-green-600 text-white text-lg px-4 py-2">
              <Trophy className="h-5 w-5 mr-2" />
              Complete
            </Badge>
          )}
        </div>

        {/* Course Info Bar */}
        {currentHoleData && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-sm text-green-600">Hole</div>
                    <div className="text-3xl font-bold text-green-800">{currentHole}</div>
                  </div>
                  <div>
                    <div className="text-sm text-green-600">Par</div>
                    <div className="text-2xl font-bold text-green-800">{currentHoleData.par}</div>
                  </div>
                  <div>
                    <div className="text-sm text-green-600">Yards</div>
                    <div className="text-2xl font-bold text-green-800">{currentHoleData.yardage}</div>
                  </div>
                  <div>
                    <div className="text-sm text-green-600">Handicap</div>
                    <div className="text-2xl font-bold text-green-800">{currentHoleData.handicap}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-600">Progress</div>
                  <div className="text-lg font-semibold text-green-800">
                    {currentHole - 1} / 18 holes
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Scoring Section */}
          {!isComplete && currentHoleData && (
            <div className="lg:col-span-2">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">
                    Hole {currentHole} Scoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {players.map((player) => {
                      const score = currentHoleScores[player.id] || currentHoleData.par;
                      const scoreToPar = getScoreToPar(score, currentHoleData.par);
                      
                      return (
                        <div
                          key={player.id}
                          className="flex items-center justify-between p-4 bg-green-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-green-800">{player.name}</h3>
                            <div className="flex gap-4 text-sm text-green-600">
                              <span>Total: {getPlayerTotal(player.id)}</span>
                              {player.handicap !== undefined && (
                                <span>HCP: {player.handicap}</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => adjustScore(player.id, -1)}
                              disabled={score <= 1}
                              className="border-green-300 h-10 w-10 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>

                            <div className="text-center min-w-[80px]">
                              <div className={`text-3xl font-bold ${getScoreColor(scoreToPar)}`}>
                                {score}
                              </div>
                              {scoreToPar !== 0 && (
                                <div className="text-xs text-gray-600">
                                  {scoreToPar > 0 ? '+' : ''}{scoreToPar}
                                </div>
                              )}
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => adjustScore(player.id, 1)}
                              disabled={score >= 15}
                              className="border-green-300 h-10 w-10 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}

                    <Button
                      onClick={submitHoleScores}
                      className="w-full bg-green-600 hover:bg-green-700 mt-6"
                      size="lg"
                    >
                      {currentHole < 18 ? `Submit Hole ${currentHole}` : 'Finish Round'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Leaderboard */}
          <div className={isComplete ? "lg:col-span-3" : "lg:col-span-1"}>
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  {isComplete ? 'Final Results' : 'Leaderboard'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getLeaderboard().map((player, idx) => (
                    <div
                      key={player.id}
                      className={`flex justify-between items-center p-3 rounded-lg ${
                        idx === 0 ? 'bg-yellow-100 border border-yellow-300' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-bold ${idx === 0 ? 'text-yellow-800 text-xl' : 'text-gray-600'}`}>
                          {idx + 1}.
                        </span>
                        <div>
                          <p className={`font-semibold ${idx === 0 ? 'text-yellow-900' : 'text-green-800'}`}>
                            {player.name}
                          </p>
                          {!isComplete && (
                            <p className="text-xs text-gray-600">Thru {player.thruHole}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${idx === 0 ? 'text-yellow-900 text-xl' : 'text-green-700'}`}>
                          {player.total}
                        </p>
                        <p className="text-xs text-gray-600">strokes</p>
                      </div>
                    </div>
                  ))}
                </div>

                {isComplete && (
                  <div className="mt-6 pt-6 border-t border-green-200">
                    <Button
                      onClick={onBack}
                      variant="outline"
                      className="w-full border-green-300"
                    >
                      Start New Round
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Game Info */}
            <Card className="mt-4 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 text-sm">Game Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Scoring:</span>
                  <span className="text-green-800 font-medium">{game.scoringFormats[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gameplay:</span>
                  <span className="text-green-800 font-medium">{game.gameplayFormats[0]}</span>
                </div>
                {game.handicapEnabled && (
                  <Badge className="bg-green-100 text-green-800 w-full justify-center">
                    Handicaps Enabled
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
