import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CourseSelector } from "@/components/CourseSelector";
import { PlayerForm } from "@/components/PlayerForm";
import { courses } from "@/data/courses";
import ActiveGame from "./ActiveGame";

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    if (!selectedCourse || players.length === 0) {
      alert("Please select a course and add at least one player.");
      return;
    }
    setGameStarted(true);
  };

  if (gameStarted) {
    return (
      <ActiveGame
        game={{ id: "stroke-play", name: "Stroke Play", description: "Standard Stroke Play Round" }}
        playerCount={players.length}
        onBack={() => setGameStarted(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="container mx-auto px-4 py-10 space-y-8">
        <h1 className="text-3xl font-bold text-green-800 text-center">
          Golf Round Setup
        </h1>

        <CourseSelector
          courses={courses}
          selectedCourse={selectedCourse}
          onSelect={setSelectedCourse}
        />

        <PlayerForm players={players} setPlayers={setPlayers} />

        <div className="flex justify-center">
          <Button
            onClick={handleStartGame}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Start Round
          </Button>
        </div>
      </div>
    </div>
  );
}
