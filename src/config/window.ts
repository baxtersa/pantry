import { BrowserWindow } from 'electron';
import ElectronStore = require('electron-store');

interface Position {
  x: number;
  y: number;
};

interface Size {
  width: number;
  height: number;
  fullscreen: boolean;
}

export interface WindowState {
  position: Position;
  size: Size;
};

export const defaults: WindowState = {
  position: { x: 50, y: 50 },
  size: { width: 500, height: 350, fullscreen: false },
};

const config = new ElectronStore({ defaults });

export function get(): WindowState {
  const position = config.get('windowPosition', defaults.position);
  const size = config.get('windowSize', defaults.size);
  return { position, size };
}

export function recordState(window: BrowserWindow): void {
  const position = window.getPosition();
  const size = window.getSize();
  config.set('windowPosition', { x: position[0], y: position[1] });
  config.set('windowSize', {
    width: size[0],
    height: size[1],
    fullscreen: window.isFullScreen(),
  });
}