export class Item extends Phaser.Physics.Arcade.Sprite {
  private id: number;
  private name: string;
  private spriteId: number;
  private inventorySpriteId: number;
  private descriptions: [];
  private combinations: [];
  private x: number;
  private y: number;
  private scale: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);

    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);

    this.scale = 1;

    this.setScale(this.scale );
    scene.physics.world.enableBody(this);
    this.setActive(true);
  }
}
