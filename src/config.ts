import { MainScene } from './scenes/main';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Platformer-Demo',
  version: '1.0',
  width: 950,
  height: 600,
  type: Phaser.AUTO,
  parent: 'game',
  render: {
      antialias: false,
      pixelArt: true,
      roundPixels: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 1200
      }
    }
  },
  scene: [MainScene]
};
