import { Image } from "../models/image";
import { Level } from "../models/level";

export class MainScene extends Phaser.Scene {
  hero: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  platforms: Phaser.Physics.Arcade.Group;
  coins: Phaser.Physics.Arcade.Group;

  constructor() {
    super({ key: 'MainScene' });
  }

  init(): void {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on('keydown-UP', () => {
      if (this.hero.body.touching.down) {
        this.hero.setVelocityY(-600);
      }
    });
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

    this.load.spritesheet('coin', 'assets/images/coin_animated.png', { frameWidth: 22,  frameHeight: 22 });

    this.load.json('level:1', 'assets/data/level01.json')
  }

  create(): void {
    this.add.image(0, 0, 'background').setOrigin(0, 0);

    this.loadLevel(this.cache.json.get('level:1'));
  }

  update(): void {
    this.handleInput();
    this.handleCollisions();
  }

  loadLevel(data: Level): void {
    this.platforms = this.physics.add.group();
    for (let platform of data.platforms) {
      this.spawnPlatform(platform);
    }

    this.spawnHero(data.hero);

    this.coins = this.physics.add.group();
    for (let coin of data.coins) {
      this.spawnCoin(coin);
    }
  }

  spawnCoin(coin: Image): void {
    let sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = this.coins.create(coin.x, coin.y, 'coin');

    sprite.setOrigin(0.5, 0.5);
    sprite.anims.create({
      key: 'rotate',
      frames: sprite.anims.generateFrameNames('coin', { frames: [0, 1, 2, 1] }),
      frameRate: 6,
      repeat: -1
    });
    sprite.play('rotate');

    sprite.body.setAllowGravity(false);
  }

  spawnPlatform(platform: Image): void {
    let sprite: Phaser.Types.Physics.Arcade.ImageWithDynamicBody = this.platforms.create(platform.x, platform.y, platform.texture.toString());

    sprite.setOrigin(0, 0);
    sprite.body.setAllowGravity(false);
    sprite.body.setImmovable(true);
  }

  spawnHero(hero: Image): void {
    this.hero = this.physics.add.sprite(hero.x, hero.y, 'hero');
    this.hero.setOrigin(0.5, 0.5);
    this.hero.setCollideWorldBounds(true);
  }

  handleInput(): void {
    if (this.cursors.left.isDown) {
      this.hero.setVelocityX(-200);
    }
    else if (this.cursors.right.isDown) {
      this.hero.setVelocityX(200);
    }
    else {
      this.hero.setVelocityX(0);
    }
  }

  handleCollisions(): void {
    this.physics.collide(this.hero, this.platforms);

    this.physics.overlap(this.hero, this.coins, (hero, coin: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) => coin.destroy());
  }
}
