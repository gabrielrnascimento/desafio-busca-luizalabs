import { Analyzer } from '../analyzer';
import { InvertedIndex } from '../invertedIndex';
import { mockFiles, mockInvertedIndex } from '../test/mocks';
import { Searcher } from './searcher';

describe('Searcher', () => {
  test('should search for documents that contain the provided keywords', () => {
    const analyzer = new Analyzer();
    const invertedIndex = new InvertedIndex(analyzer);
    invertedIndex.index = mockInvertedIndex();
    const [firstFile, secondFile, thirdFile] = mockFiles;
    const query = firstFile.content;
    const [specificTokenFirst, commonTokenMid, commonTokenLast] = query.split(' ');

    const searcher = new Searcher(analyzer, invertedIndex);
    const result = searcher.search(query);

    const expectedResult = {
      [specificTokenFirst]: [firstFile.title],
      [commonTokenMid]: [firstFile.title, secondFile.title, thirdFile.title],
      [commonTokenLast]: [firstFile.title, secondFile.title, thirdFile.title]
    };
    expect(result).toStrictEqual(expectedResult);
  });
});
