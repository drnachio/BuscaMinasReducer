import * as model from 'a2r/model';
import settings from '../config/settings';

export const getNextCells = (cell: model.Cell, board: model.Board): model.Cell[] => {
  const result = new Array<model.Cell>();
  for (let y = Math.max(0, cell.y - 1); y < Math.min(cell.y + 2, settings.height); y++) {
    for (let x = Math.max(0, cell.x - 1); x < Math.min(cell.x + 2, settings.width); x++) {
      result.push(board[x + y * settings.width]);
    }
  }
  return result;
};


export const openCell = (x: number, y: number, board: model.Board): model.Board => {
  const i = x + y * settings.width;
  const cell = board[i];
  if (!cell.opened) {
    let newBoard = [...board];
    newBoard[i] = { ...cell, opened: true };
    if (cell.colindanMines === 0) {
      for (let ry = Math.max(0, y - 1); ry < Math.min(y + 2, settings.height); ry++) {
        for (let rx = Math.max(0, x - 1); rx < Math.min(x + 2, settings.width); rx++) {
          newBoard = openCell(rx,ry, newBoard);        
        }
      }
    }
    return newBoard;
  }  
  return board;
};


export const createNewBoard = (): model.Board => {
  const newBoard = new Array<model.Cell>();
  for (let y = 0; y < settings.height; y++) {
    for (let x = 0; x < settings.width; x++) {
      const cell: model.Cell = {
        x,
        y,
        opened: false,
        flagged: false,
        colindanMines: 0,
        mine: false,
      };
      newBoard.push(cell);
    }
  }
  const cellsWithMine = [...newBoard].sort((): number => Math.random() - 0.5)
    .filter((_ , i) => i < settings.totalMines);

  while (cellsWithMine.length) {
    const cell = cellsWithMine.pop();
    cell.mine = true;
    const nextCells = getNextCells(cell, newBoard);
    while (nextCells.length) {
      nextCells.pop().colindanMines += 1;
    }
  }
  return newBoard;
}

export const getNewGame = (): model.Game => ({
  board: new Array<model.Cell>(),
  ended: false,
});
