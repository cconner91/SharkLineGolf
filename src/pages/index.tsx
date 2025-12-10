// src/pages/Index.tsx
import { useState } from "react";
import { Player, GolfGame, Course } from "@/types/golf";
import SetupPage from "./SetupPage";
import GameSelectionPage from "./GameSelectionPage";
import ActiveGamePage from "./ActiveGamePage";

type AppView = "setup" | "gameSelection" | "activeGame";

export default function Index() {
  // Main routing state
  const [currentView, setCurrentView] = useState<AppView>("setup");
  
  // Data that flows through the app
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedTeeBox, setSelectedTeeBox] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedGame, setSelectedGame] = useState<GolfGame | null>(null);

  // Setup -> Game Selection
  const handleSetupComplete = (course: Course, teeBox: string, playerList: Player[]) => {
    setSelectedCourse(course);
    setSelectedTeeBox(teeBox);
    setPlayers(playerList);
    setCurrentView("gameSelection");
  };

  // Game Selection -> Active Game
  const handleGameSelect = (game: GolfGame) => {
    setSelectedGame(game);
    setCurrentView("activeGame");
  };

  // Navigation back handlers
  const handleBackToSetup = () => {
    setCurrentView("setup");
  };

  const handleBackToGameSelection = () => {
    setCurrentView("gameSelection");
  };

  // Render current view
  if (currentView === "setup") {
    return (
      <SetupPage
        initialCourse={selectedCourse}
        initialTeeBox={selectedTeeBox}
        initialPlayers={players}
        onComplete={handleSetupComplete}
      />
    );
  }

  if (currentView === "gameSelection") {
    return (
      <GameSelectionPage
        playerCount={players.length}
        onGameSelect={handleGameSelect}
        onBack={handleBackToSetup}
      />
    );
  }

  if (currentView === "activeGame" && selectedGame && selectedCourse && selectedTeeBox) {
    return (
      <ActiveGamePage
        game={selectedGame}
        course={selectedCourse}
        teeBox={selectedTeeBox}
        players={players}
        onBack={handleBackToGameSelection}
      />
    );
  }

  // Fallback (shouldn't happen)
  return null;
}
