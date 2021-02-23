import { Image } from "../interfaces/image.interface";
import { Level } from "../interfaces/level.interface";

export class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('background', 'assets/images/background.png');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('grass:8x1', 'assets/images/grass_8x1.png');
    this.load.image('grass:6x1', 'assets/images/grass_6x1.png');
    this.load.image('grass:4x1', 'assets/images/grass_4x1.png');
    this.load.image('grass:2x1', 'assets/images/grass_2x1.png');
    this.load.image('grass:1x1', 'assets/images/grass_1x1.png');

    this.load.json('level:1', 'assets/data/level01.json')
  }

  create(): void {
    this.add.image(0, 0, 'background').setOrigin(0, 0);

    this.loadLevel(this.cache.json.get('level:1'));
  }

  loadLevel(data: Level): void {
    for (let spec of data.platforms) {
      this.addSprite(spec);
    }
  }

  addSprite(spec: Image): void {
    this.add.sprite(spec.x, spec.y, spec.texture).setOrigin(0, 0);
  }
}
