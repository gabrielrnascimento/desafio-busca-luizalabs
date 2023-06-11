import { Analyzer } from '../analyzer';
import { InvertedIndex } from '../invertedIndex';
import { mockFiles, mockInvertedIndex } from '../test/mocks';
import { Searcher } from './searcher';

type SutTypes = {
  sut: Searcher
  expectedResult: string[]
  query: string
};

const makeSut = (): SutTypes => {
  const analyzer = new Analyzer();
  const invertedIndex = new InvertedIndex(analyzer);
  invertedIndex.index = mockInvertedIndex();
  const [mockFirstFile, mockSecondFile] = mockFiles;
  const [, , commonToken] = mockFirstFile.content.split(' ');
  const query = commonToken;
  const sut = new Searcher(analyzer, invertedIndex);
  const expectedResult = [mockFirstFile.title, mockSecondFile.title];

  return {
    sut,
    expectedResult,
    query
  };
};

describe('Searcher', () => {
  test('should return documents that contain keywords present in all documents', () => {
    const {
      sut,
      expectedResult,
      query
    } = makeSut();

    const result = sut.search(query);
    result.forEach(document => expectedResult.includes(document));
  });

  test('should handle duplicated words in query', () => {
    const {
      sut,
      expectedResult,
      query
    } = makeSut();

    const result = sut.search(query + ' ' + query);
    result.forEach(document => expectedResult.includes(document));
  });

  test('should handle if query has uppercase letters', () => {
    const {
      sut,
      expectedResult,
      query
    } = makeSut();

    const result = sut.search(query.toUpperCase());
    result.forEach(document => expectedResult.includes(document));
  });

  test('should return empty array if documents do not match', () => {
    const {
      sut
    } = makeSut();

    const result = sut.search('first second');
    expect(result).toStrictEqual([]);
  });

  test('should return documents sorted in ascending order', () => {
    const {
      sut,
      expectedResult,
      query
    } = makeSut();

    const result = sut.search(query);
    const sortedResult = expectedResult.sort();
    expect(result).toStrictEqual(sortedResult);
  });
});
