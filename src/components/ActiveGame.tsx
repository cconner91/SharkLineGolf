
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Target, Trophy, Plus, Minus } from "lucide-react";
import { GolfGame, Player, HoleScore, GameState } from "@/types/golf";
import { useToast } from "@/hooks/use-toast";

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
    Array(playerCount).fill('').map((_, i) => `Player ${i + 1}`)
  );
  
  const [gameStarted, setGameStarted] = useState(false);
  const [holeScores, setHoleScores] = useState<{[playerId: string]: number}>({});

  useEffect(() => {
    if (gameStarted) {
      const players: Player[] = playerNames.map((name, index) => ({
        id: `player-${index}`,
        name: name || `Player ${index + 1}`,
        handicap: 0
      }));
      
      setGameState(prev => ({ ...prev, players }));
      
      // Initialize hole scores
      const initialScores: {[playerId: string]: number} = {};
      players.forEach(player => {
        initialScores[player.id] = 4; // Par default
      });
      setHoleScores(initialScores);
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

    setGameState(prev => ({
      ...prev,
      scores: [...prev.scores, ...newScores],
      currentHole: prev.currentHole < 18 ? prev.currentHole + 1 : prev.currentHole,
      isComplete: prev.currentHole >= 18
    }));

    // Reset hole scores for next hole
    if (gameState.currentHole < 18) {
      const resetScores: {[playerId: string]: number} = {};
      gameState.players.forEach(player => {
        resetScores[player.id] = 4;
      });
      setHoleScores(resetScores);
      
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

  const getPlayerTotal = (playerId: string) => {
    return gameState.scores
      .filter(score => score.playerId === playerId)
      .reduce((total, score) => total + score.strokes, 0);
  };

  const getLeaderboard = () => {
    return gameState.players
      .map(player => ({
        ...player,
        total: getPlayerTotal(player.id),
        thruHole: gameState.currentHole - 1
      }))
      .sort((a, b) => a.total - b.total);
  };

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
                      Player {index + 1}
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => {
                        const newNames = [...playerNames];
                        newNames[index] = e.target.value;
                        setPlayerNames(newNames);
                      }}
                      placeholder={`Player ${index + 1}`}
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack} className="border-green-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              End Game
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-green-800">{game.name}</h1>
              <div className="flex items-center gap-4 text-green-600">
                <span className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  Hole {gameState.currentHole}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {gameState.players.length} Players
                </span>
              </div>
            </div>
          </div>
          
          {gameState.isComplete && (
            <Badge className="bg-green-600 text-white text-lg px-4 py-2">
              <Trophy className="h-4 w-4 mr-2" />
              Complete
            </Badge>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current Hole Scoring */}
          {!gameState.isComplete && (
            <div className="lg:col-span-2">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Hole {gameState.currentHole} Scoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gameState.players.map((player) => (
                      <div key={player.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-green-800">{player.name}</h3>
                          <p className="text-sm text-green-600">
                            Total: {getPlayerTotal(player.id)} strokes
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => adjustScore(player.id, -1)}
                            disabled={holeScores[player.id] <= 1}
                            className="border-green-300"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <span className="text-2xl font-bold text-green-800 min-w-[3rem] text-center">
                            {holeScores[player.id] || 4}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => adjustScore(player.id, 1)}
                            className="border-green-300"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      onClick={submitHoleScores}
                      className="w-full bg-green-600 hover:bg-green-700 mt-6"
                      size="lg"
                    >
                      {gameState.currentHole < 18 ? `Submit Hole ${gameState.currentHole}` : 'Finish Game'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Leaderboard */}
          <div className={gameState.isComplete ? "lg:col-span-3" : ""}>
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  {gameState.isComplete ? 'Final Results' : 'Leaderboard'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getLeaderboard().map((player, index) => (
                    <div key={player.id} className={`flex items-center justify-between p-3 rounded-lg ${
                      index === 0 ? 'bg-yellow-100 border border-yellow-300' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <span className={`text-lg font-bold ${
                          index === 0 ? 'text-yellow-600' : 'text-gray-600'
                        }`}>
                          #{index + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold text-green-800">{player.name}</h3>
                          {player.thruHole > 0 && (
                            <p className="text-sm text-green-600">
                              Thru {player.thruHole} hole{player.thruHole !== 1 ? 's' : ''}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-green-800">{player.total}</span>
                        <p className="text-sm text-green-600">strokes</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveGame;
