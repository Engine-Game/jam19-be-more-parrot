import { objects } from '../constants/objects';
import { addSeamlessBackgroundImage } from '../helpers/utils';
import { WORLD_CENTER_X, WORLD_CENTER_Y } from '../constants/positions';

/**
 * Adds the following events to any Phaser.GameObjects.Image being passed in:
 * pointerover - hovering
 * pointerout - not hovering
 * pointerup - click and release
 * @param obj the object to add the events on
 * @param hoverSelector a hover selector
 * @param callback the function to trigger when pointerup event is initiated
 */
function addListenerEvents(obj: Phaser.GameObjects.Image, hoverSelector: Phaser.GameObjects.Sprite, callback: () => void) {

  obj.on('pointerover', () => {
    hoverSelector.setVisible(true);
    hoverSelector.x = obj.x - obj.width;
    hoverSelector.y = obj.y;
  });

  obj.on('pointerout', () => {
    hoverSelector.setVisible(false);
  });

  obj.on('pointerup', () => {
    callback();
  });
}

export class MenuScene extends Phaser.Scene {
  private bg: Phaser.GameObjects.TileSprite;

  constructor() {
    super({
      key: objects.scenes.menu
    });
  }

  public preload() {
    // Add using z-index
    // Add logo in the middle and 20% Y axis
    this.add.image(WORLD_CENTER_X, this.game.renderer.height * 0.2, objects.images.menu_logo).setDepth(1);

    // Add background,center and fit
    this.bg = addSeamlessBackgroundImage(this, objects.backgrounds.menu_bg);
  }

  public update() {
    this.bg.tilePositionX += 1;
  }

  public create() {
    // create the menu scene
    const continueButton = this.add
    .image(WORLD_CENTER_X - (WORLD_CENTER_X * 0.3), WORLD_CENTER_Y, objects.buttons.continue_button)
    .setDepth(0)
    .setInteractive();

    const playButton = this.add
    .image(WORLD_CENTER_X - (WORLD_CENTER_X * 0.3), WORLD_CENTER_Y + (WORLD_CENTER_Y * 0.3), objects.buttons.play_button)
    .setDepth(0)
    .setInteractive();

    const helpButton = this.add
    .image(WORLD_CENTER_X + (WORLD_CENTER_X * 0.3), WORLD_CENTER_Y, objects.buttons.help_button)
    .setDepth(0)
    .setInteractive();

    const aboutButton = this.add
    .image(WORLD_CENTER_X + (WORLD_CENTER_X * 0.3), WORLD_CENTER_Y + (WORLD_CENTER_Y * 0.3), objects.buttons.about_button)
    .setDepth(0)
    .setInteractive();

    const hoverSelector = this.add.sprite(100, 100, objects.buttons.menu_selector);
    hoverSelector.setScale(2);
    hoverSelector.setVisible(false);

    addListenerEvents(continueButton, hoverSelector, () => {
      // Todo: Fetch (from /src/state/game-state.ts) last save status and pass to the next scene (e.g coins, last mission, progress)
      // {coins: 99, mission: { id: 4, progress: 50} }
      this.scene.start(objects.scenes.scene_one, { coins: 99, mission: { id: 4, progress: 50 } });
    });

    addListenerEvents(playButton, hoverSelector, () => {
      this.scene.start(objects.scenes.scene_one);
    });

    addListenerEvents(helpButton, hoverSelector, () => {
      this.scene.start(objects.scenes.help);
    });

    addListenerEvents(aboutButton, hoverSelector, () => {
      this.scene.start(objects.scenes.about);
    });
  }
}
