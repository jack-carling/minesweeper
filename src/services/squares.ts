import settings from './settings';

export function checkEmptySquares(board: any, i: number) {
  const { north, northEast, east, southEast, south, southWest, west, northWest, isRightEdge, isLeftEdge } =
    getPositionData(i);

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

export function checkAdjacentFlags(board: any, i: number, value: number) {
  const { north, northEast, east, southEast, south, southWest, west, northWest, isRightEdge, isLeftEdge } =
    getPositionData(i);

  let total: number = 0;

  if (board[north]?.flag) total++;
  if (board[northEast]?.flag && !isRightEdge) total++;
  if (board[east]?.flag && !isRightEdge) total++;
  if (board[southEast]?.flag && !isRightEdge) total++;
  if (board[south]?.flag) total++;
  if (board[southWest]?.flag && !isLeftEdge) total++;
  if (board[west]?.flag && !isLeftEdge) total++;
  if (board[northWest]?.flag && !isLeftEdge) total++;

  if (total === value) {
    return true;
  } else {
    return false;
  }
}

export function checkAdjacentSquares(board: any, i: number) {
  const { north, northEast, east, southEast, south, southWest, west, northWest, isRightEdge, isLeftEdge } =
    getPositionData(i);

  type Bomb = {
    hit: boolean;
    index: number;
  };

  let bomb = { hit: false } as Bomb;

  if (board[north] && !board[north]?.flag) {
    if (board[north]?.value === 0 && !board[north].reveal && board[north].type !== 'bomb') {
      setTimeout(() => {
        checkEmptySquares(board, north);
      }, 10);
    }
    board[north].reveal = true;
    if (board[north].type === 'bomb') {
      bomb.hit = true;
      bomb.index = north;
    }
  }
  if (board[northEast] && !board[northEast]?.flag && !isRightEdge) {
    if (board[northEast]?.value === 0 && !board[northEast].reveal && board[northEast].type !== 'bomb') {
      setTimeout(() => {
        checkEmptySquares(board, northEast);
      }, 10);
    }
    board[northEast].reveal = true;
    if (board[northEast].type === 'bomb') {
      bomb.hit = true;
      bomb.index = northEast;
    }
  }
  if (board[east] && !board[east]?.flag && !isRightEdge) {
    if (board[east]?.value === 0 && !board[east].reveal && board[east].type !== 'bomb') {
      setTimeout(() => {
        checkEmptySquares(board, east);
      }, 10);
    }
    board[east].reveal = true;
    if (board[east].type === 'bomb') {
      bomb.hit = true;
      bomb.index = east;
    }
  }
  if (board[southEast] && !board[southEast]?.flag && !isRightEdge) {
    if (board[southEast]?.value === 0 && !board[southEast].reveal && board[southEast].type !== 'bomb') {
      setTimeout(() => {
        checkEmptySquares(board, southEast);
      }, 10);
    }
    board[southEast].reveal = true;
    if (board[southEast].type === 'bomb') {
      bomb.hit = true;
      bomb.index = southEast;
    }
  }
  if (board[south] && !board[south]?.flag) {
    if (board[south]?.value === 0 && !board[south].reveal && board[south].type !== 'bomb') {
      setTimeout(() => {
        checkEmptySquares(board, south);
      }, 10);
    }
    board[south].reveal = true;
    if (board[south].type === 'bomb') {
      bomb.hit = true;
      bomb.index = south;
    }
  }
  if (board[southWest] && !board[southWest]?.flag && !isLeftEdge) {
    if (board[southWest]?.value === 0 && !board[southWest].reveal && board[southWest].type !== 'bomb') {
      setTimeout(() => {
        checkEmptySquares(board, southWest);
      }, 10);
    }
    board[southWest].reveal = true;
    if (board[southWest].type === 'bomb') {
      bomb.hit = true;
      bomb.index = southWest;
    }
  }
  if (board[west] && !board[west]?.flag && !isLeftEdge) {
    if (board[west]?.value === 0 && !board[west].reveal && board[west].type !== 'bomb') {
      setTimeout(() => {
        checkEmptySquares(board, west);
      }, 10);
    }
    board[west].reveal = true;
    if (board[west].type === 'bomb') {
      bomb.hit = true;
      bomb.index = west;
    }
  }
  if (board[northWest] && !board[northWest]?.flag && !isLeftEdge) {
    if (board[northWest]?.value === 0 && !board[northWest].reveal && board[northWest].type !== 'bomb') {
      setTimeout(() => {
        checkEmptySquares(board, northWest);
      }, 10);
    }
    board[northWest].reveal = true;
    if (board[northWest].type === 'bomb') {
      bomb.hit = true;
      bomb.index = northWest;
    }
  }

  return { board, bomb };
}

function getPositionData(i: number) {
  const width = settings.width;

  type Data = {
    north: number;
    northEast: number;
    east: number;
    southEast: number;
    south: number;
    southWest: number;
    west: number;
    northWest: number;
    isLeftEdge: Boolean;
    isRightEdge: Boolean;
  };

  let data = {} as Data;

  data.north = i - width;
  data.northEast = i - width + 1;
  data.east = i + 1;
  data.southEast = i + width + 1;
  data.south = i + width;
  data.southWest = i + width - 1;
  data.west = i - 1;
  data.northWest = i - width - 1;

  data.isLeftEdge = i % width === 0;
  data.isRightEdge = i % width === width - 1;

  return data;
}
