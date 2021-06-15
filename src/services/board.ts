import settings from './settings';

let emptyArray: Array<object> = [];
let bombsArray: Array<object> = [];
let board: Array<any> = [];

export function initBoard() {
  emptyArray = [];
  bombsArray = [];
  board = [];

  const width = settings.width;
  const height = settings.height;
  const bombs = settings.bombs;
  const size: Number = width * height - bombs;

  for (let i = 0; i < size; i++) {
    emptyArray.push({
      type: 'valid',
      reveal: false,
      flag: false,
      value: 0,
    });
  }

  for (let i = 0; i < bombs; i++) {
    bombsArray.push({
      type: 'bomb',
      reveal: false,
      flag: false,
      hit: false,
      value: 0,
    });
  }

  board = [...emptyArray, ...bombsArray];

  for (let i = board.length - 1; i > 0; i--) {
    const newIndex = Math.floor(Math.random() * (i + 1));
    const oldValue = board[newIndex];
    board[newIndex] = board[i];
    board[i] = oldValue;
  }

  return board;
}

export function calcBoard(index: number) {
  const width = settings.width;
  const height = settings.height;
  const size: number = width * height;

  // If the first click is placing a flag, skip the bomb checking/replacing function
  if (index !== -1) {
    if (board[index].type === 'bomb') {
      let position = index;
      do {
        position = Math.floor(Math.random() * size);
      } while (board[position].type === 'bomb');
      delete board[index].hit;
      board[index].type = 'valid';
      board[position].type = 'bomb';
      board[position].hit = false;
    }
  }

  for (let i = 0; i < board.length; i++) {
    const north = i - width;
    const northEast = i - width + 1;
    const east = i + 1;
    const southEast = i + width + 1;
    const south = i + width;
    const southWest = i + width - 1;
    const west = i - 1;
    const northWest = i - width - 1;

    let total = 0;
    const isLeftEdge = i % width === 0;
    const isRightEdge = i % width === width - 1;

    if (board[north]?.type === 'bomb') total++;
    if (board[northEast]?.type === 'bomb' && !isRightEdge) total++;
    if (board[east]?.type === 'bomb' && !isRightEdge) total++;
    if (board[southEast]?.type === 'bomb' && !isRightEdge) total++;
    if (board[south]?.type === 'bomb') total++;
    if (board[southWest]?.type === 'bomb' && !isLeftEdge) total++;
    if (board[west]?.type === 'bomb' && !isLeftEdge) total++;
    if (board[northWest]?.type === 'bomb' && !isLeftEdge) total++;

    if (board[i].type === 'valid') board[i].value = total;
  }

  return board;
}

export default board;
