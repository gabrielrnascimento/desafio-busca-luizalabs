import { Analyzer } from '../analyzer';
import { InvertedIndex } from '../invertedIndex';
import { Sorter } from '../sorter';
import { MOCK_TOKENS, mockFiles, mockInvertedIndex, mockSortedFiles } from '../test/mocks';
import { type Term, type DocumentTitle } from '../utils/types';

import { Searcher } from './searcher';

type SutTypes = {
  sut: Searcher
  expectedResult: DocumentTitle[]
  query: Term
};

const makeSut = (): SutTypes => {
  const analyzer = new Analyzer();
  const sorter = new Sorter();
  const invertedIndex = new InvertedIndex(analyzer);
  invertedIndex.index = mockInvertedIndex();
  const [mockFirstFile, mockSecondFile] = mockFiles;
  const query = MOCK_TOKENS.RARE;
  const sut = new Searcher(analyzer, invertedIndex, sorter);
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
      sut
    } = makeSut();

    const result = sut.search(MOCK_TOKENS.COMMON);
    expect(result).toStrictEqual(mockSortedFiles);
  });
});
