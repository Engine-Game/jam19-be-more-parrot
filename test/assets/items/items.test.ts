import * as items from '../../../assets/items/items.json';
import { expect } from '../../unit/utils/test-utils';

describe('Items', () => {
  const keys = Object.keys(items);

  it('should verify that each item contains the required properties and the id is correct', () => {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < keys.length - 1; i++) {
      const value = items[keys[i]];
      expect(value['id']).to.exist;
      expect(value['id'].toString()).to.equal(keys[i]);
      expect(value['spriteId']).to.exist;
      expect(value['inventorySpriteId']).to.exist;
      expect(value['name']).to.exist;
      expect(value['descriptions']).to.exist;
      expect(value['combinations']).to.exist;
    }
  });

  it('should verify that each property points ot the correct translation key', () => {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < keys.length - 1; i++) {
      const value = items[keys[i]];
      const expectedNameKey = `items.${value['id']}.name`;
      const expectedDescriptionKey = `items.${value['id']}.descriptions`;

      expect(value['name']).to.eq(expectedNameKey);
      expect(value['descriptions']).to.eq(expectedDescriptionKey);

      if (value['combinations'].length) {
        for (let i = 0; i < value['combinations'].length - 1; i++) {
          const combination = value['combinations'][i];
          const expectedCombinationsKey = `items.${value['id']}.combinations.${combination.id}`;
          expect(combination.text).to.eq(expectedCombinationsKey);
        }
      }
    }
  });
});
