import { InvertedIndex } from './invertedIndex';

type SutTypes = {
  sut: InvertedIndex
};

const makeSut = (): SutTypes => {
  const sut = new InvertedIndex();
  return {
    sut
  };
};

describe('InvertedIndex', () => {
  test('should create an empty Map', () => {
    const { sut } = makeSut();
    expect(sut.index).toStrictEqual(new Map());
  });
});
