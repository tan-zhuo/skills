import type { GameState, GameAction, Direction, Position } from './types';

const OPPOSITE: Record<Direction, Direction> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};

export function nextPosition(head: Position, dir: Direction): Position {
  switch (dir) {
    case 'UP':    return { x: head.x, y: head.y - 1 };
    case 'DOWN':  return { x: head.x, y: head.y + 1 };
    case 'LEFT':  return { x: head.x - 1, y: head.y };
    case 'RIGHT': return { x: head.x + 1, y: head.y };
  }
}

export function spawnFood(snake: Position[], gridSize: number): Position {
  const occupied = new Set(snake.map((p) => `${p.x},${p.y}`));
  const empty: Position[] = [];
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      if (!occupied.has(`${x},${y}`)) {
        empty.push({ x, y });
      }
    }
  }
  return empty[Math.floor(Math.random() * empty.length)];
}

export function createInitialState(gridSize: number): GameState {
  const center = Math.floor(gridSize / 2);
  const snake: Position[] = [
    { x: center, y: center },
    { x: center - 1, y: center },
    { x: center - 2, y: center },
  ];
  return {
    snake,
    food: spawnFood(snake, gridSize),
    direction: 'RIGHT',
    score: 0,
    isGameOver: false,
    gridSize,
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'TICK': {
      if (state.isGameOver) return state;

      const newHead = nextPosition(state.snake[0], state.direction);

      // Wall collision
      if (
        newHead.x < 0 || newHead.x >= state.gridSize ||
        newHead.y < 0 || newHead.y >= state.gridSize
      ) {
        return { ...state, isGameOver: true };
      }

      // Self collision
      if (state.snake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
        return { ...state, isGameOver: true };
      }

      const ateFood = newHead.x === state.food.x && newHead.y === state.food.y;
      const newSnake = [newHead, ...state.snake];
      if (!ateFood) newSnake.pop();

      return {
        ...state,
        snake: newSnake,
        score: ateFood ? state.score + 1 : state.score,
        food: ateFood ? spawnFood(newSnake, state.gridSize) : state.food,
      };
    }

    case 'CHANGE_DIRECTION': {
      if (state.isGameOver) return state;
      if (OPPOSITE[action.direction] === state.direction) return state;
      return { ...state, direction: action.direction };
    }

    case 'SET_FOOD':
      return { ...state, food: action.position };

    case 'RESET':
      return createInitialState(state.gridSize);

    default:
      return state;
  }
}
