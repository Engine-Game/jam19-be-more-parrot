import { objects } from '../constants/objects';
import { WORLD_CENTER_X, WORLD_CENTER_Y } from '../constants/positions';

export class LoadingScene extends Phaser.Scene {
  constructor() {
    super({
      key: objects.scenes.loading
    });
  }

  /**
   * Loads all buttons under the path using the constants file
   */
  public loadButtons() {
    this.load.setPath('/assets/buttons');
    // tslint:disable-next-line:forin
    for (const prop in objects.buttons) {
      this.load.image(objects.buttons[prop], objects.buttons[prop]);
    }
  }

  /**
   * Loads all images under the path using the constants file
   */
  public loadImages() {
    this.load.setPath('/assets/images');
    // tslint:disable-next-line:forin
    for (const prop in objects.images) {
      this.load.image(objects.images[prop], objects.images[prop]);
    }
  }

  /**
   * Loads all sprites (32x48) under the path using the constants file
   */
  public loadSprites(frameConfig: any) {
    this.load.setPath('./assets/sprites/32x48');

    // tslint:disable-next-line:forin
    for (const prop in objects.sprites.medium) {
      this.load.spritesheet(objects.sprites.medium[prop], objects.sprites.medium[prop], frameConfig);
    }
  }

  /**
   * Loads all sprites small size (16x16) under the path using the constants file
   */
  public loadSpritesSmall(frameConfig: any) {
    this.load.setPath('./assets/sprites/16x16');

    // tslint:disable-next-line:forin
    for (const prop in objects.sprites.small) {
      this.load.spritesheet(objects.sprites.small[prop], objects.sprites.small[prop], frameConfig);
    }
  }

  public preload() {
    this.loadButtons();
    this.loadImages();
    this.loadSprites({
      frameWidth: 32,
      frameHeight: 48
    });
    this.loadSpritesSmall({
      frameWidth: 16,
      frameHeight: 16
    });
    // Create loading bar
    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff, // white
        alpha: 1
      }
    });

    const loadingBox = this.add.graphics({
      fillStyle: {
        color: 0x222222,
        alpha: 0.8
      }
    });

    loadingBox.fillRect(WORLD_CENTER_X - 20, WORLD_CENTER_Y - 20, 340, 70);

    // Loader events:
    // progress - loader progress in decimal
    // complete - when finished loading the assets
    this.load.on('progress', percent => {
      loadingBar.clear();
      loadingBar.fillStyle(0xffffff, 1);
      loadingBar.fillRect(WORLD_CENTER_X, WORLD_CENTER_Y, 300 * percent, 30);
    });

    this.load.on('complete', () => {
      this.scene.start(objects.scenes.menu);
    });
  }

  public create() {
    console.log('This is the Loader Scene');
  }
}
