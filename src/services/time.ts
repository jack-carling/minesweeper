export function time(time: number) {
  const hours: number = Math.floor(time / 3600);
  const minutes: number = Math.floor((time - hours * 3600) / 60);
  const seconds: number = time - hours * 3600 - minutes * 60;

  let h: string, m: string, s: string;

  if (minutes < 10) {
    m = '0' + minutes.toString();
  } else {
    m = minutes.toString();
  }

  if (seconds < 10) {
    s = '0' + seconds.toString();
  } else {
    s = seconds.toString();
  }

  h = hours.toString();

  if (hours > 0) {
    return `${h}:${m}:${s}`;
  } else {
    return `${m}:${s}`;
  }
}
