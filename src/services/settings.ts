import type { SettingsObject } from './interfaces';

let settings: SettingsObject = {
  width: 0,
  height: 0,
  bombs: 0,
};

export function initSettings(w: number, h: number, b: number) {
  settings.width = w;
  settings.height = h;
  settings.bombs = b;
  const size: number = settings.width * settings.height;
  settings.size = size;
}

export default settings;
