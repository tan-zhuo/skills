import { describe, it, expect } from 'vitest';
import { gameReducer, createInitialState, nextPosition } from './engine';

describe('createInitialState', () => {
  it('creates state with snake of length 3 at center', () => {
    const state = createInitialState(20);
    expect(state.snake).toHaveLength(3);
    expect(state.snake[0]).toEqual({ x: 10, y: 10 });
    expect(state.direction).toBe('RIGHT');
    expect(state.score).toBe(0);
    expect(state.isGameOver).toBe(false);
  });

  it('spawns food not on snake', () => {
    const state = createInitialState(20);
    const snakeSet = new Set(state.snake.map((p) => `${p.x},${p.y}`));
    expect(snakeSet.has(`${state.food.x},${state.food.y}`)).toBe(false);
  });
});

describe('nextPosition', () => {
  it('moves up', () => {
    expect(nextPosition({ x: 5, y: 5 }, 'UP')).toEqual({ x: 5, y: 4 });
  });
  it('moves down', () => {
    expect(nextPosition({ x: 5, y: 5 }, 'DOWN')).toEqual({ x: 5, y: 6 });
  });
  it('moves left', () => {
    expect(nextPosition({ x: 5, y: 5 }, 'LEFT')).toEqual({ x: 4, y: 5 });
  });
  it('moves right', () => {
    expect(nextPosition({ x: 5, y: 5 }, 'RIGHT')).toEqual({ x: 6, y: 5 });
  });
});

describe('gameReducer — TICK', () => {
  it('moves snake one step in current direction', () => {
    const state = createInitialState(20);
    const next = gameReducer(state, { type: 'TICK' });
    expect(next.snake[0]).toEqual({ x: 11, y: 10 });
    expect(next.snake).toHaveLength(3);
  });

  it('grows snake and increments score on eating food', () => {
    const state = createInitialState(20);
    // Place food directly ahead
    const head = state.snake[0];
    const foodPos = nextPosition(head, state.direction);
    const withFood = gameReducer(state, { type: 'SET_FOOD', position: foodPos });
    const next = gameReducer(withFood, { type: 'TICK' });
    expect(next.snake).toHaveLength(4);
    expect(next.score).toBe(1);
  });

  it('detects wall collision (right boundary)', () => {
    let state = createInitialState(5);
    // Move right until wall
    for (let i = 0; i < 10; i++) {
      state = gameReducer(state, { type: 'TICK' });
    }
    expect(state.isGameOver).toBe(true);
  });

  it('detects wall collision (top boundary)', () => {
    let state = createInitialState(5);
    state = gameReducer(state, { type: 'CHANGE_DIRECTION', direction: 'UP' });
    for (let i = 0; i < 10; i++) {
      state = gameReducer(state, { type: 'TICK' });
    }
    expect(state.isGameOver).toBe(true);
  });

  it('does not move after game over', () => {
    let state = createInitialState(5);
    for (let i = 0; i < 10; i++) {
      state = gameReducer(state, { type: 'TICK' });
    }
    expect(state.isGameOver).toBe(true);
    const frozen = gameReducer(state, { type: 'TICK' });
    expect(frozen.snake).toEqual(state.snake);
  });
});

describe('gameReducer — CHANGE_DIRECTION', () => {
  it('changes direction', () => {
    const state = createInitialState(20);
    const next = gameReducer(state, { type: 'CHANGE_DIRECTION', direction: 'UP' });
    expect(next.direction).toBe('UP');
  });

  it('prevents reverse direction', () => {
    const state = createInitialState(20); // direction: RIGHT
    const next = gameReducer(state, { type: 'CHANGE_DIRECTION', direction: 'LEFT' });
    expect(next.direction).toBe('RIGHT'); // unchanged
  });

  it('ignores direction change after game over', () => {
    let state = createInitialState(5);
    for (let i = 0; i < 10; i++) {
      state = gameReducer(state, { type: 'TICK' });
    }
    const next = gameReducer(state, { type: 'CHANGE_DIRECTION', direction: 'UP' });
    expect(next.direction).toBe(state.direction);
  });
});

describe('gameReducer — RESET', () => {
  it('resets to initial state', () => {
    let state = createInitialState(20);
    state = gameReducer(state, { type: 'TICK' });
    state = gameReducer(state, { type: 'TICK' });
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset.score).toBe(0);
    expect(reset.isGameOver).toBe(false);
    expect(reset.snake).toHaveLength(3);
    expect(reset.direction).toBe('RIGHT');
  });
});
