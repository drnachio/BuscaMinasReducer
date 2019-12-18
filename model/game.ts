/**
 * Cell of the minesweeper board
 */
export interface Cell {
  x: number;
  y: number;
  mine: boolean;
  opened: boolean;
  flagged: boolean;
  /**
   * Number of mines surrounding the current cell
   */
  colindanMines: number;  
}

export type Board = Cell[];

export interface GameGlobalActions {
  type: 'reset' | 'undo' | 'redo';
}

export interface GameCellActions {
  type: 'open' | 'flag';
  x: number;
  y: number;
}

export type GameActions = GameGlobalActions | GameCellActions;

export interface Game {
  board: Board;
  ended: boolean;
}
