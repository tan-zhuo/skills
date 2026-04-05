import { useReducer, useCallback, useEffect, useRef } from 'react';
import { gameReducer, createInitialState } from './engine';
import type { Direction } from './types';

const KEY_DIR: Record<string, Direction> = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
};

export function useSnakeGame(gridSize = 20, speed = 150) {
  const [state, dispatch] = useReducer(gameReducer, gridSize, createInitialState);
  const intervalRef = useRef<number | null>(null);

  const tick = useCallback(() => dispatch({ type: 'TICK' }), []);
  const changeDirection = useCallback(
    (dir: Direction) => dispatch({ type: 'CHANGE_DIRECTION', direction: dir }),
    [],
  );
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  // Game loop
  useEffect(() => {
    if (state.isGameOver) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = window.setInterval(tick, speed);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.isGameOver, tick, speed]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const dir = KEY_DIR[e.key];
      if (dir) {
        e.preventDefault();
        changeDirection(dir);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [changeDirection]);

  return { state, reset };
}
