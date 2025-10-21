import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Target, Trophy, Plus, Minus } from "lucide-react";
import { GolfGame, Player, HoleScore, GameState } from "@/types/golf";
import { useToast } from "@/hooks/use-toast";
import { generateLeaderboard, initializeHoleScores, getPlayerTotal } from "@/utils/scoring";

interface ActiveGameProps {
  game: GolfGame;
  playerCount: number;
  onBack: () => void;
}

const ActiveGame = ({ game, playerCount, onBack }: ActiveGameProps) => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    gameId: game.id,
    players: [],
    currentHole: 1,
    scores: [],
    bets: [],
    isComplete: false
  });

  const [playerNames, setPlayerNames] = useState<string[]>(
    Array(playerCount).fill('').map((_, i) => `Player ${i+1}`)
  );

  const [gameStarted, setGameStarted] = useState(false);
  const [holeScores, setHoleScores] = useState<Record<string, number>>({});

  useEffect(() => {
    if (gameStarted) {
      const players: Player[] = playerNames.map((name, index) => ({
        id: `player-${index}`,
        name: name || `Player ${index+1}`,
        handicap: 0
      }));

      setGameState(prev => ({ ...prev, players }));
      setHoleScores(initializeHoleScores(players));
    }
  }, [gameStarted, playerNames]);

  const handleStartGame = () => {
    if (playerNames.some(name => !name.trim())) {
      toast({
        title: "Please enter all player names",
        description: "All players need names before starting the game.",
        variant: "destructive"
      });
      return;
    }
    setGameStarted(true);
    toast({
      title: "Game Started!",
      description: `${game.name} has begun. Good luck!`,
    });
  };

  const adjustScore = (playerId: string, adjustment: number) => {
    setHoleScores(prev => ({
      ...prev,
      [playerId]: Math.max(1, (prev[playerId] || 4) + adjustment)
    }));
  };

  const submitHoleScores = () => {
    const newScores: HoleScore[] = Object.entries(holeScores).map(([playerId, strokes]) => ({
      playerId,
      holeNumber: gameState.currentHole,
      strokes
    }));

    setGameState(prev => {
      const nextHole = prev.currentHole < 18 ? prev.currentHole + 1 : prev.currentHole;
      const complete = prev.currentHole >= 18;
      return {
        ...prev,
        scores: [...prev.scores, ...newScores],
        currentHole: nextHole,
        isComplete: complete
      };
    });

    // Reset hole scores for next hole
    if (gameState.currentHole < 18) {
      setHoleScores(initializeHoleScores(gameState.players));
      toast({
        title: `Hole ${gameState.currentHole} Complete!`,
        description: `Moving to hole ${gameState.currentHole + 1}`,
      });
    } else {
      toast({
        title: "Game Complete!",
        description: "Congratulations on finishing your round!",
      });
    }
  };

  const leaderboard = generateLeaderboard(gameState.players, gameState.scores, gameState.currentHole);

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={onBack} className="border-green-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-green-800">{game.name}</h1>
              <p className="text-green-600">{game.description}</p>
            </div>
          </div>

          <Card className="max-w-2xl mx-auto border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Enter Player Names</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {playerNames.map((name, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-green-700 mb-1">
                      Player {index+1}
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => {
                        const newNames = [...playerNames];
                        newNames[index] = e.target.value;
                        setPlayerNames(newNames);
                      }}
                      placeholder={`Player ${index+1}`}
                      className="border-green-300 focus:border-green-500"
                    />
                  </div>
                ))}
                
                <Button 
                  onClick={handleStartGame}
                  className="w-full bg-green-600 hover:bg-green-700 mt-6"
                  size="lg"
                >
                  Start Game
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="container mx-auto px-4 py-8">
        {/* Leaderboard and scoring components can now use `leaderboard` and `getPlayerTotal` */}
        {/* ...rest of your ActiveGame UI... */}
      </div>
    </div>
  );
};

export default ActiveGame;
