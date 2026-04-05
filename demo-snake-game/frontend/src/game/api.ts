// API client based on locked api-contract (SNAKE-API-001, SNAKE-API-002)

const API_BASE = 'http://localhost:8080';

export interface ScoreEntry {
  id: number;
  player_name: string;
  score: number;
  created_at: string;
}

interface APIResponse<T> {
  code: number;
  data: T;
  message: string;
}

export async function submitScore(
  playerName: string,
  score: number,
): Promise<ScoreEntry> {
  const res = await fetch(`${API_BASE}/api/scores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ player_name: playerName, score }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to submit score');
  }

  const json: APIResponse<ScoreEntry> = await res.json();
  return json.data;
}

export async function getLeaderboard(limit = 10): Promise<ScoreEntry[]> {
  const res = await fetch(`${API_BASE}/api/scores?limit=${limit}`);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to fetch leaderboard');
  }

  const json: APIResponse<ScoreEntry[]> = await res.json();
  return json.data ?? [];
}
