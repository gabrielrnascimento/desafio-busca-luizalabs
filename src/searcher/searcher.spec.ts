import { Analyzer } from '../analyzer';
import { InvertedIndex } from '../invertedIndex';
import { mockFiles, mockInvertedIndex } from '../test/mocks';
import { Searcher } from './searcher';

type SutTypes = {
  sut: Searcher
  expectedResult: Record<string, string[]>
  query: string
};

const makeSut = (): SutTypes => {
  const analyzer = new Analyzer();
  const invertedIndex = new InvertedIndex(analyzer);
  invertedIndex.index = mockInvertedIndex();
  const [mockFirstFile, mockSecondFile, mockThirdFile] = mockFiles;
  const query = mockFirstFile.content;
  const [specificQueryToken, commonQueryToken, anotherCommonQueryToken] = query.split(' ');
  const sut = new Searcher(analyzer, invertedIndex);

  const expectedResult = {
    [specificQueryToken]: [mockFirstFile.title],
    [commonQueryToken]: [mockFirstFile.title, mockSecondFile.title, mockThirdFile.title],
    [anotherCommonQueryToken]: [mockFirstFile.title, mockSecondFile.title, mockThirdFile.title]
  };

  return {
    sut,
    expectedResult,
    query
  };
};

describe('Searcher', () => {
  test('should search for documents that contain the provided keywords', () => {
    const {
      sut,
      expectedResult,
      query
    } = makeSut();

    const result = sut.search(query);
    expect(result).toStrictEqual(expectedResult);
  });

  test('should handle duplicated words in query', () => {
    const {
      sut,
      expectedResult,
      query
    } = makeSut();

    const result = sut.search(query + ' ' + query);

    expect(result).toStrictEqual(expectedResult);
  });
});
