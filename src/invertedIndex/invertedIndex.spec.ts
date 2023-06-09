import { InvertedIndex } from './invertedIndex';

describe('InvertedIndex', () => {
  test('should create an empty Map', () => {
    const invertedIndex = new InvertedIndex();
    expect(invertedIndex.index).toStrictEqual(new Map());
  });
});
