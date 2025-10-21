import React, { useState } from "react";
import { Player } from "../types/players";

interface Props {
  onAdd: (player: Player) => void;
}

const PlayerForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [handicap, setHandicap] = useState("");

  const handleAdd = () => {
    if (!name || !handicap) return;
    onAdd({ name, handicapIndex: parseFloat(handicap), scores: [] });
    setName("");
    setHandicap("");
  };

  return (
    <div>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Handicap Index"
        type="number"
        value={handicap}
        onChange={(e) => setHandicap(e.target.value)}
      />
      <button onClick={handleAdd}>Add Player</button>
    </div>
  );
};

export default PlayerForm;
