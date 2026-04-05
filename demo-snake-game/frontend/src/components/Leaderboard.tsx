import { useEffect, useState } from 'react';
import { getLeaderboard } from '../game/api';
import type { ScoreEntry } from '../game/api';
import './Leaderboard.css';

interface Props {
  refreshKey: number;
}

export function Leaderboard({ refreshKey }: Props) {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getLeaderboard(10)
      .then(setScores)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      {loading && <p className="lb-status">Loading...</p>}
      {error && <p className="lb-status lb-error">Failed to load: {error}</p>}
      {!loading && !error && scores.length === 0 && (
        <p className="lb-status">No scores yet</p>
      )}
      {scores.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>
                <td>{s.player_name}</td>
                <td>{s.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
