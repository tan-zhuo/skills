import { useState, useCallback } from 'react';
import { useSnakeGame } from './game/useSnakeGame';
import { submitScore } from './game/api';
import { GameBoard } from './components/GameBoard';
import { GameOverScreen } from './components/GameOverScreen';
import { Leaderboard } from './components/Leaderboard';
import './App.css';

const GRID_SIZE = 20;
const SPEED = 150;

function App() {
  const { state, reset } = useSnakeGame(GRID_SIZE, SPEED);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leaderboardKey, setLeaderboardKey] = useState(0);

  const handleSubmitScore = useCallback(async (name: string) => {
    setIsSubmitting(true);
    try {
      await submitScore(name, state.score);
      setSubmitted(true);
      setLeaderboardKey((k) => k + 1);
    } catch (e) {
      console.error('Failed to submit score:', e);
    } finally {
      setIsSubmitting(false);
    }
  }, [state.score]);

  const handleRestart = useCallback(() => {
    reset();
    setSubmitted(false);
  }, [reset]);

  return (
    <div className="app">
      <h1>Snake Game</h1>
      <p className="score">Score: {state.score}</p>
      <GameBoard gridSize={GRID_SIZE} snake={state.snake} food={state.food} />
      {state.isGameOver && (
        <GameOverScreen
          score={state.score}
          onSubmit={handleSubmitScore}
          onRestart={handleRestart}
          isSubmitting={isSubmitting}
          submitted={submitted}
        />
      )}
      <Leaderboard refreshKey={leaderboardKey} />
    </div>
  );
}

export default App;
