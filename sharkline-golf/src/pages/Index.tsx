
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Target, DollarSign, User } from "lucide-react";
import GameSelection from "@/components/GameSelection";
import ActiveGame from "@/components/ActiveGame";
import PlayerProfile from "@/components/PlayerProfile";
import { Player } from "@/types/golf";

const Index = () => {
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<'setup' | 'gameSelection' | 'activeGame' | 'profile'>('setup');
  const [selectedGame, setSelectedGame] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const handlePlayerCountSelect = (count: number) => {
    setPlayerCount(count);
    setCurrentView('gameSelection');
  };

  const handleGameSelect = (game: any) => {
    setSelectedGame(game);
    setCurrentView('activeGame');
  };

  const handleBackToSetup = () => {
    setCurrentView('setup');
    setPlayerCount(null);
    setSelectedGame(null);
  };

  const handleProfileSave = (player: Player) => {
    setCurrentPlayer(player);
    setCurrentView('setup');
    console.log('Player saved:', player);
    // TODO: Save to local storage or database
  };

  if (currentView === 'profile') {
    return (
      <PlayerProfile 
        player={currentPlayer}
        onSave={handleProfileSave}
        onBack={() => setCurrentView('setup')}
      />
    );
  }

  if (currentView === 'activeGame' && selectedGame) {
    return (
      <ActiveGame 
        game={selectedGame} 
        playerCount={playerCount!} 
        onBack={() => setCurrentView('gameSelection')}
      />
    );
  }

  if (currentView === 'gameSelection' && playerCount) {
    return (
      <GameSelection 
        playerCount={playerCount} 
        onGameSelect={handleGameSelect}
        onBack={handleBackToSetup}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-green-600 rounded-full">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-green-800">GolfBet Pro</h1>
          </div>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            Track scores, manage bets, and compete with your golf group in style
          </p>
          
          {/* Profile Button */}
          <div className="mt-6">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('profile')}
              className="border-green-300 hover:bg-green-50"
            >
              <User className="h-4 w-4 mr-2" />
              {currentPlayer ? 'Edit Profile' : 'Create Profile'}
            </Button>
          </div>
        </div>

        {/* Current Player Info */}
        {currentPlayer && (
          <div className="max-w-md mx-auto mb-8">
            <Card className="border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-green-800">{currentPlayer.name}</div>
                    <div className="text-sm text-green-600">
                      Handicap: {currentPlayer.handicap || 'N/A'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-2">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-green-800">Group Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Set up your golf group and choose from games that match your player count
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-2">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-green-800">Live Scoring</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Real-time score tracking with multiple game formats and betting options
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-2">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-green-800">Betting Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Keep track of side bets and winnings throughout your round
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Player Count Selection */}
        <Card className="max-w-4xl mx-auto border-green-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-800">How many players in your group?</CardTitle>
            <CardDescription>
              Select your group size to see available games and betting options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[2, 3, 4, 5, 6, 7, 8].map((count) => (
                <Button
                  key={count}
                  variant="outline"
                  className="h-20 text-lg font-semibold border-green-300 hover:bg-green-50 hover:border-green-500 transition-all"
                  onClick={() => handlePlayerCountSelect(count)}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Users className="h-6 w-6" />
                    <span>{count} Players</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div>
              <div className="text-3xl font-bold text-green-600">15+</div>
              <div className="text-sm text-green-700">Game Formats</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">Live</div>
              <div className="text-sm text-green-700">Score Tracking</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">$$$</div>
              <div className="text-sm text-green-700">Bet Management</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
