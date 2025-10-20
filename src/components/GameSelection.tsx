// src/components/GameSelection.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  // Filter games based on player count
  const availableGames = golfGames.filter(
    game => game.minPlayers <= playerCount && game.maxPlayers >= playerCount
  );

  const handleSelect = (game: GolfGame) => {
    setSelectedGameId(game.id);
    onGameSelect(game);
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

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableGames.map((game) => (
            <Card 
              key={game.id} 
              className={`border-green-200 hover:shadow-lg transition-all hover:border-green-400 ${
                selectedGameId === game.id ? "ring-2 ring-green-400" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-green-800 text-xl">{game.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {game.scoringFormats.map((format) => (
                        <Badge key={format} className="bg-blue-100 text-blue-800 border-blue-300">
                          {format.replace(/([A-Z])/g, ' $1').trim()}
                        </Badge>
                      ))}
                      {game.gameplayFormats.map((format) => (
                        <Badge key={format} className="bg-purple-100 text-purple-800 border-purple-300">
                          {format.replace(/([A-Z])/g, ' $1').trim()}
                        </Badge>
                      ))}
                      {game.matchupFormats.map((format) => (
                        <Badge key={format} className="bg-pink-100 text-pink-800 border-pink-300">
                          {format.replace(/([A-Z])/g, ' $1').trim()}
                        </Badge>
                      ))}
                      {game.bettingEnabled && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          Betting
                        </Badge>
                      )}
                      {game.handicapEnabled && (
                        <Badge className="bg-green-100 text-green-800 border-green-300">
                          Handicap
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
                <p className="mb-4 text-gray-700">{game.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {game.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-green-300 text-green-700">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button 
                  onClick={() => handleSelect(game)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Select Game
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {availableGames.length === 0 && (
          <div className="text-center py-12">
            <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Games Available</h3>
            <p className="text-gray-500">
              No games match the current player count. Try changing the number of players.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameSelection;


