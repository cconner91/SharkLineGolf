import React from "react";
import { Course, Tee } from "../types/courses";
import { Player } from "../types/players";
import { calculateNetScore } from "../data/handicap";

interface ScorecardProps {
  course: Course;
  tee: Tee;
  players: Player[];
}

const Scorecard: React.FC<ScorecardProps> = ({ course, tee, players }) => {
  return (
    <table className="scorecard">
      <thead>
        <tr>
          <th>Hole</th>
          {tee.holes.map((_, idx) => (
            <th key={idx}>{idx + 1}</th>
          ))}
          <th>Total</th>
          <th>Net</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, idx) => {
          const netScores = calculateNetScore(player, tee);
          const total = player.scores.reduce((a, b) => a + b, 0);
          const netTotal = netScores.reduce((a, b) => a + b, 0);
          return (
            <tr key={idx}>
              <td>{player.name}</td>
              {player.scores.map((score, hIdx) => (
                <td key={hIdx}>{score}</td>
              ))}
              <td>{total}</td>
              <td>{netTotal}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Scorecard;

