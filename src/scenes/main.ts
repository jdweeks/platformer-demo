import { Image } from "../models/image";
import { Level } from "../models/level";

export class MainScene extends Phaser.Scene {
  hero: Phaser.GameObjects.Sprite;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'MainScene' });
  }

  init(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload(): void {
    this.load.image('background', 'assets/images/background.png');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('grass:8x1', 'assets/images/grass_8x1.png');
    this.load.image('grass:6x1', 'assets/images/grass_6x1.png');
    this.load.image('grass:4x1', 'assets/images/grass_4x1.png');
    this.load.image('grass:2x1', 'assets/images/grass_2x1.png');
    this.load.image('grass:1x1', 'assets/images/grass_1x1.png');
    this.load.image('hero', 'assets/images/hero_stopped.png');

    this.load.json('level:1', 'assets/data/level01.json')
  }

  create(): void {
    this.add.image(0, 0, 'background').setOrigin(0, 0);

    this.loadLevel(this.cache.json.get('level:1'));
  }

  update(): void {
    this.handleInput();
  }

  loadLevel(data: Level): void {
    for (let spec of data.platforms) {
      this.addSprite(spec);
    }

    this.spawnHero(data.hero);
  }

  addSprite(spec: Image): void {
    this.add.sprite(spec.x, spec.y, spec.texture).setOrigin(0, 0);
  }

  spawnHero(hero: Image): void {
    this.hero = this.add.sprite(hero.x, hero.y, 'hero').setOrigin(0.5, 0.5);
  }

  handleInput(): void {
    if (this.cursors.left.isDown) {
      this.hero.setX(this.hero.x -= 2.5);
    }
    else if (this.cursors.right.isDown) {
      this.hero.setX(this.hero.x += 2.5);
    }
  }
}
