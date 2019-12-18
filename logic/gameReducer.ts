import * as model from 'a2r/model';
import { createNewBoard, openCell } from './gameFunctions';
import settings from '../config/settings';

const undo = new Array<model.Game>();
const redo = new Array<model.Game>();

const addToUndo = (game: model.Game): void => {
  undo.push(game);
  redo.length = 0;
};

const gameReducer = (game: model.Game, action: model.GameActions): model.Game => {
  switch (action.type) {
    case 'reset':
      redo.length = 0;
      undo.length = 0;
      return {
        board: createNewBoard(),
        ended: false,
      };
    case 'undo': {
      if (undo.length) {
        const lastStep = undo.pop();
        redo.push(game);
        return lastStep;
      }
      break;
    }
    case 'redo': {      
      if (redo.length) {
        console.log(redo.length);
        const nextStep = redo.pop();
        undo.push(game);
        return nextStep;
      }
      break;
    }
    case 'open':
      if (!game.ended) {
        const i = action.x + action.y * settings.width;
        const cell = game.board[i];
        const newGame = { ...game };
        newGame.board = openCell(action.x, action.y, game.board);
        if (cell.mine) {
          newGame.ended = true;
        }
        addToUndo(game);
        return newGame;
      }
      break;
    case 'flag':
      if (!game.ended) {
        const i = action.x + action.y * settings.width;
        const cell = game.board[i];
        if (!cell.opened) {
          const newGame = { ...game };
          newGame.board = [...game.board];
          newGame.board[i] = {
            ...cell,
            flagged: !cell.flagged,
          };
          addToUndo(game);
          return newGame;
        }
      }
      break;
    default:
      throw new Error('Unknown action');
  }
  return game;
};

export default gameReducer;
