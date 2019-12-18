import React, { useReducer, useEffect } from 'a2r/react';
import { useWindowSize } from 'a2r/hooks';
import gameReducer from '../logic/gameReducer';
import { getNewGame } from '../logic/gameFunctions';
import settings from '../config/settings';
import CellUI from './CellUI';

const Board = (): JSX.Element => {  
  const size = useWindowSize();
  const [game, dispatch] = useReducer(gameReducer, getNewGame());

  useEffect(() => {
    dispatch({type: 'reset'});
  }, []);

  const side = Math.min(size.width - 40, size.height - 40);
  const style: React.CSSProperties = {
    position: 'absolute',
    left: (size.width - side) / 2,
    top: (size.height - side) / 2,
    color: '#fff',
    width: side,
    height: side,
    backgroundColor: '#555',
  };

  const cells = game.board;

  const drawCell = (cell): JSX.Element => {
    const cellStyle: React.CSSProperties = {
      position: 'absolute',
      width: side / settings.width,
      height: side / settings.height,
      left: (side / settings.width) * cell.x,
      top: (side / settings.height) * cell.y,
      zIndex: cell.x * settings.height + cell.y,
    };
    return <CellUI key={`${cell.x}-${cell.y}`} style={cellStyle} cell={cell} dispatch={dispatch} game={game} />;
  };

  return (
    <React.Fragment>    
      &nbsp;/&nbsp;
      <button type="button" className="reset" onClick={(): void => dispatch({type: 'reset'}) }>
        Reiniciar
      </button>
      &nbsp;/&nbsp;
      <button type="button" className="reset" onClick={(): void => dispatch({type: 'undo'}) }>
        Deshacer
      </button>
      &nbsp;/&nbsp;
      <button type="button" className="reset" onClick={(): void => dispatch({type: 'redo'}) }>
        Rehacer
      </button>
      <div style={style}>{cells.map(drawCell)}</div>
    </React.Fragment>
  );
};

export default Board;
