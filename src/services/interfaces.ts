export interface SquareObject {
  flag: boolean;
  hit?: boolean;
  reveal: boolean;
  type: 'bomb' | 'bomb-hit' | 'no-bomb' | 'valid';
  value: number;
}

export interface Player {
  name: string;
  percent: string;
  size: string;
  time: string | number;
  width?: string;
  height?: string;
  bombs?: string;
}

export interface ResponseData {
  success: boolean;
  data: Player[];
}

export interface Bomb {
  hit: boolean;
  index: number;
}

export interface Data {
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
}

export interface SettingsObject {
  width: number;
  height: number;
  bombs: number;
  size?: number;
}
