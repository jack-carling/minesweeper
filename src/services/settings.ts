interface standardSettings {
  width: number;
  height: number;
  bombs: number;
  size?: number;
}

const settings: standardSettings = {
  width: 10,
  height: 10,
  bombs: 20,
};

const size: number = settings.width * settings.height;

settings.size = size;

export default settings;
