import type { Position } from '../game/types';
import './GameBoard.css';

interface Props {
  gridSize: number;
  snake: Position[];
  food: Position;
}

export function GameBoard({ gridSize, snake, food }: Props) {
  const snakeSet = new Set(snake.map((p) => `${p.x},${p.y}`));
  const headKey = `${snake[0].x},${snake[0].y}`;

  return (
    <div
      data-testid="game-board"
      className="game-board"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {Array.from({ length: gridSize * gridSize }, (_, i) => {
        const x = i % gridSize;
        const y = Math.floor(i / gridSize);
        const key = `${x},${y}`;
        const isHead = key === headKey;
        const isSnake = snakeSet.has(key);
        const isFood = food.x === x && food.y === y;

        let className = 'cell';
        if (isHead) className += ' head';
        else if (isSnake) className += ' snake';
        if (isFood) className += ' food';

        return <div key={key} className={className} />;
      })}
    </div>
  );
}
