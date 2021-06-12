import settings from './settings';

const width = settings.width;
const height = settings.height;
const bombs = settings.bombs;
const size: Number = width * height - bombs;

let emptyArray: Array<object> = [];
let bombsArray: Array<object> = [];

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

let board: Array<any> = [...emptyArray, ...bombsArray];
board = board.sort((): any => {
  return Math.random() - 0.5;
});

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

export default board;
