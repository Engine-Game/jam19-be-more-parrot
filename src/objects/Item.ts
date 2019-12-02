import Map = Phaser.Structs.Map;
import {AbstractItem} from "./AbstractItem";

export class Item extends AbstractItem {
  public id: number;
  public name: string;
  public spriteId: string;
  public inventorySpriteId: string;
  public descriptions: [];
  public combinations: {};

  constructor(scene: Phaser.Scene, id: number, name: string, spriteId: string, inventorySpriteId: string, descriptions: [], combinations: {}) {
    super(scene, 0, 0, 'items', spriteId);
    this.id = id;
    this.name = name;
    this.spriteId = spriteId;
    this.inventorySpriteId = inventorySpriteId;
    this.descriptions = descriptions;
    this.combinations = combinations;
  }

  static getItemMap(scene: Phaser.Scene, items: any): Phaser.Structs.Map<number, Item> {
    let itemMap = new Phaser.Structs.Map<number, Item>([]);

    for (const itemId in items) {
      let itemObj = items[itemId];
      let item = new Item(scene, itemObj.id, itemObj.name, itemObj.spriteId, itemObj.inventorySpriteId, itemObj.descriptions, itemObj.combinations);
      itemMap.set(itemObj.id, item);
    }

    return itemMap;
  }
}
