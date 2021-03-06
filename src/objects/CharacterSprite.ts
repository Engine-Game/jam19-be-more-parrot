export class CharacterSprite extends Phaser.Physics.Arcade.Sprite {
  public hp: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);

    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    this.setScale(2);
    scene.physics.world.enableBody(this);
    this.setActive(true);
    this.hp = 100;
  }
}
