import { objects } from '../constants/objects';
import { addBackgroundImage } from '../helpers/utils';

export class About extends Phaser.Scene {
  private creditCount: number;

  constructor() {
    super({
      key: objects.scenes.about
    });
  }

  public preload() {
    addBackgroundImage(this, objects.backgrounds.menu_bg);
  }

  public create() {
    this.creditCount = 1;

    this.addCredit('Developer', 'Alejandro Baeza Gutierrez');
    this.addCredit('Developer', 'Martin Bucinskas');
    this.addCredit('Story Writer', 'Writer 1');
    this.addCredit('Story Writer', 'Writer 2');
    this.addCredit('Graphics', 'Designer 1');

    this.addAction(objects.buttons.back_button, () => {
        this.scene.start(objects.scenes.menu);
      }
    );
  }

  private addCredit(job: string, author: string) {
    const style = { font: '20px Courier', fill: '#fff', tabs: 132 };

    const input = `${job} \t ${author}`;
    this.add.text(150, (this.creditCount * 30), input, style);
    this.creditCount++;
  }

  private addAction(image: string, callback: () => void) {
    this.add.image(30, 30, image).setInteractive()
    .on('pointerup', () => {
      callback();
    });
  }

}
