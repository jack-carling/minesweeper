import settings from './settings';
import { capitalizeFirstLetter } from './text';

export async function saveHighscoreDatabase(time: number) {
  const name = localStorage.name;
  const difficulty = capitalizeFirstLetter(localStorage.difficulty) || 'Custom';
  const width = settings.width;
  const height = settings.height;
  const size = width * height;
  const bombs = settings.bombs;
  const percent = Number((bombs / size).toFixed(3));

  const data = {
    name,
    difficulty,
    width,
    height,
    size,
    time,
    bombs,
    percent,
  };

  const t = import.meta.env.VITE_T;

  let res = await fetch(`/api/highscore?t=${t}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  res = await res.json();
}
