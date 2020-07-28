/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import * as model from '../model/game';

interface CellProps {
  style: React.CSSProperties;
  cell: model.Cell;
  game: model.Game;
  dispatch: React.Dispatch<model.GameCellActions>;
}

const Cell = ({ style, cell, dispatch, game }: CellProps): JSX.Element => {
  const isOpen = cell.opened;
  const isMine = cell.mine;
  const collidingMines = cell.colindanMines;

  const currentStyle = {
    ...style,
  };

  let content = '';
  let className = ' isClosed';

  if (isOpen) {
    if (isMine) {
      className = ' mine';
    } else {
      content = collidingMines ? collidingMines.toLocaleString() : '';
      className = ' active';
      if (content) {
        className += ' number';
      }
    }
  } else {
    currentStyle.cursor = 'pointer';
    if (cell.flagged) {
      className += ' flag';
    }
  }

  if (game.ended && !cell.flagged && cell.mine) {
    className = ' mine';
  }

  if (game.ended && cell.flagged && !cell.mine) {
    className = ' badFlag';
  }

  const onFlag = (event: React.MouseEvent): void => {
    event.preventDefault();
    dispatch({type: 'flag', x: cell.x, y: cell.y });
  }

  return (
    <div
      className={`box${className}`}
      style={currentStyle}
      onClick={(): void => dispatch({ type: 'open', x: cell.x, y: cell.y })}
      onContextMenu={onFlag}
    >
      <span>{content}</span>
    </div>
  );
};

export default Cell;
