import { useState } from 'react';
import './GameOverScreen.css';

interface Props {
  score: number;
  onSubmit: (name: string) => void;
  onRestart: () => void;
  isSubmitting: boolean;
  submitted: boolean;
}

export function GameOverScreen({ score, onSubmit, onRestart, isSubmitting, submitted }: Props) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="game-over-overlay">
      <div className="game-over-card">
        <h2>Game Over</h2>
        <p className="final-score">Score: {score}</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="name-form">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              disabled={isSubmitting}
              autoFocus
            />
            <button type="submit" disabled={isSubmitting || !name.trim()}>
              {isSubmitting ? 'Submitting...' : 'Submit Score'}
            </button>
          </form>
        ) : (
          <p className="submitted-msg">Score submitted!</p>
        )}

        <button onClick={onRestart} className="restart-btn">
          Restart
        </button>
      </div>
    </div>
  );
}
