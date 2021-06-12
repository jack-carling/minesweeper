import settings from './settings';

export function checkEmptySquares(board: any, i: any) {
  const width = settings.width;

  const north = i - width;
  const northEast = i - width + 1;
  const east = i + 1;
  const southEast = i + width + 1;
  const south = i + width;
  const southWest = i + width - 1;
  const west = i - 1;
  const northWest = i - width - 1;

  const isLeftEdge = i % width === 0;
  const isRightEdge = i % width === width - 1;

  if (board[north]?.type === 'valid') {
    if (board[north]?.value === 0 && !board[north].reveal) {
      setTimeout(() => {
        checkEmptySquares(board, north);
      }, 10);
    }
    if (!board[north].flag) {
      board[north].reveal = true;
    }
  }
  if (board[northEast]?.type === 'valid' && !isRightEdge && !board[northEast].reveal) {
    if (board[northEast]?.value === 0) {
      setTimeout(() => {
        checkEmptySquares(board, northEast);
      }, 10);
    }
    if (!board[northEast].flag) {
      board[northEast].reveal = true;
    }
  }
  if (board[east]?.type === 'valid' && !isRightEdge && !board[east].reveal) {
    if (board[east]?.value === 0) {
      setTimeout(() => {
        checkEmptySquares(board, east);
      }, 10);
    }
    if (!board[east].flag) {
      board[east].reveal = true;
    }
  }
  if (board[southEast]?.type === 'valid' && !isRightEdge && !board[southEast].reveal) {
    if (board[southEast]?.value === 0) {
      setTimeout(() => {
        checkEmptySquares(board, southEast);
      }, 10);
    }
    if (!board[southEast].flag) {
      board[southEast].reveal = true;
    }
  }
  if (board[south]?.type === 'valid' && !board[south].reveal) {
    if (board[south]?.value === 0) {
      setTimeout(() => {
        checkEmptySquares(board, south);
      }, 10);
    }
    if (!board[south].flag) {
      board[south].reveal = true;
    }
  }
  if (board[southWest]?.type === 'valid' && !isLeftEdge && !board[southWest].reveal) {
    if (board[southWest]?.value === 0) {
      setTimeout(() => {
        checkEmptySquares(board, southWest);
      }, 10);
    }
    if (!board[southWest].flag) {
      board[southWest].reveal = true;
    }
  }
  if (board[west]?.type === 'valid' && !isLeftEdge && !board[west].reveal) {
    if (board[west]?.value === 0) {
      setTimeout(() => {
        checkEmptySquares(board, west);
      }, 10);
    }
    if (!board[west].flag) {
      board[west].reveal = true;
    }
  }
  if (board[northWest]?.type === 'valid' && !isLeftEdge && !board[northWest].reveal) {
    if (board[northWest]?.value === 0) {
      setTimeout(() => {
        checkEmptySquares(board, northWest);
      }, 10);
    }
    if (!board[northWest].flag) {
      board[northWest].reveal = true;
    }
  }

  return board;
}

export function revealBombs(board: any) {
  for (let i = 0; i < board.length; i++) {
    if (board[i].type === 'bomb') {
      if (board[i].flag) continue;
      board[i].reveal = true;
    } else {
      if (board[i].flag) {
        board[i].type = 'no-bomb';
        board[i].value = 0;
        board[i].reveal = true;
      }
    }
  }
  return board;
}

export function revealAllValid(board: any) {
  for (let i = 0; i < board.length; i++) {
    if (board[i].type === 'valid') {
      if (board[i].flag) continue;
      board[i].reveal = true;
    } else if (board[i].type === 'bomb') {
      if (board[i].flag) continue;
      board[i].flag = true;
    }
  }
  return board;
}
