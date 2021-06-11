import settings from './settings';

let width = settings.width;
let height = settings.height;
let bombs = settings.bombs;

const size: Number = width * height - bombs;

const emptyArray: Array<any> = new Array(size);
emptyArray.fill('valid');

const bombsArray: Array<any> = new Array(bombs);
bombsArray.fill('bomb');

let board: Array<string> = [...emptyArray, ...bombsArray];
board = board.sort((): any => {
  return Math.random() - 0.5;
});

export default board;
