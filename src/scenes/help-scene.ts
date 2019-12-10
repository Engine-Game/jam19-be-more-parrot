import { objects } from '../constants/objects';
import { addBackgroundImage } from '../helpers/utils';

export class Help extends Phaser.Scene {

  constructor() {
    super({
      key: objects.scenes.help
    });
  }

  public preload() {
    addBackgroundImage(this, objects.backgrounds.menu_bg);

  }

  public create() {
    this.addHelpText();

    this.addAction(objects.buttons.back_button, () => {
      this.scene.start(objects.scenes.menu);
    }
    );
  }

  private addAction(image: string, callback: () => void) {

    this.add.image(30, 30, image).setInteractive()
    .on('pointerup', () => {
      callback();
    });
  }

  private addHelpText() {
    // TODO Add help text or story text from i18n
    const style = { font: '20px Courier', fill: '#fff', tabs: 132 };
    const input = `Some Context or help text should go here`;
    this.add.text(150, 100, input, style);
  }
}
