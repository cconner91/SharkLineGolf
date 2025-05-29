
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Trophy, Target, Info } from "lucide-react";
import { golfGames } from "@/data/golfGames";
import { GolfGame } from "@/types/golf";

interface GameSelectionProps {
  playerCount: number;
  onGameSelect: (game: GolfGame) => void;
  onBack: () => void;
}

const GameSelection = ({ playerCount, onGameSelect, onBack }: GameSelectionProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const availableGames = golfGames.filter(
    game => game.minPlayers <= playerCount && game.maxPlayers >= playerCount
  );

  const filteredGames = selectedDifficulty 
    ? availableGames.filter(game => game.difficulty === selectedDifficulty)
    : availableGames;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={onBack} className="border-green-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-green-800">Select Your Game</h1>
            <p className="text-green-600 flex items-center gap-2">
              <Users className="h-4 w-4" />
              {playerCount} Players
            </p>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Filter by Difficulty</h3>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedDifficulty === null ? "default" : "outline"}
              onClick={() => setSelectedDifficulty(null)}
              className="border-green-300"
            >
              All Games
            </Button>
            {['Easy', 'Medium', 'Hard'].map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                onClick={() => setSelectedDifficulty(difficulty)}
                className="border-green-300"
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <Card key={game.id} className="border-green-200 hover:shadow-lg transition-all hover:border-green-400">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-green-800 text-xl">{game.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                      {game.bettingEnabled && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          Betting
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-sm text-green-600">
                    <Users className="h-4 w-4 inline mr-1" />
                    {game.minPlayers}-{game.maxPlayers}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-gray-700">
                  {game.description}
                </CardDescription>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {game.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-green-300 text-green-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-3 w-3" />
                    <span className="capitalize">{game.scoringFormat.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-3 w-3" />
                    <span className="capitalize">{game.gameplayFormat.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                </div>

                <Button 
                  onClick={() => onGameSelect(game)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Select Game
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Games Available</h3>
            <p className="text-gray-500">
              No games match the current filter criteria. Try selecting a different difficulty level.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameSelection;
