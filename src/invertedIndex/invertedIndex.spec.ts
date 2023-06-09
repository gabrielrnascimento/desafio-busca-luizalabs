import { Analyzer } from '../analyzer';
import { InvertedIndex } from './invertedIndex';

type SutTypes = {
  sut: InvertedIndex
};

const makeSut = (): SutTypes => {
  const analyzer = new Analyzer();
  const sut = new InvertedIndex(analyzer);
  return {
    sut
  };
};

describe('InvertedIndex', () => {
  test('should create an empty Map', () => {
    const { sut } = makeSut();
    expect(sut.index).toStrictEqual(new Map());
  });

  test('should insert document to index', () => {
    const { sut } = makeSut();
    const mockDocument = {
      title: 'any_title.txt',
      content: 'any random content'
    };

    sut.insert(mockDocument.title, mockDocument.content);

    expect(sut.index.get('random')?.has(mockDocument.title)).toBeTruthy();
    expect(sut.index.get('any')?.has(mockDocument.title)).toBeTruthy();
  });
});
