import {
  translateCombinations,
  translateDescriptions,
  translateName
} from '../service/translation-service';
import { AbstractItem } from './AbstractItem';

export class Item extends AbstractItem {

  public static getItemMap(scene: Phaser.Scene): Phaser.Structs.Map<number, Item> {
    const items = scene.cache.json.get('items');
    const itemMap = new Phaser.Structs.Map<number, Item>([]);

    for (const itemId in items) {
      if (items.hasOwnProperty(itemId)) {
        const itemObj = items[itemId];
        const item = new Item(
          scene,
          itemObj.id,
          translateName(itemObj.name),
          itemObj.spriteId,
          itemObj.inventorySpriteId,
          translateDescriptions(itemObj.descriptions),
          translateCombinations(itemObj.combinations));
        itemMap.set(itemObj.id, item);
      }
    }

    return itemMap;
  }

  public id: number;
  public name: string;
  public spriteId: string;
  public inventorySpriteId: string;
  public descriptions: string[];
  public combinations: {};

  constructor(scene: Phaser.Scene, id: number, name: string, spriteId: string, inventorySpriteId: string, descriptions: string[], combinations: {}) {
    super(scene, 0, 0, 'items', spriteId);
    this.id = id;
    this.name = name;
    this.spriteId = spriteId;
    this.inventorySpriteId = inventorySpriteId;
    this.descriptions = descriptions;
    this.combinations = combinations;
  }
}
