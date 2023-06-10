import { mockDirectoryFiles, mockFileContent } from '../test/mocks';
import { Analyzer } from '../analyzer';
import { Indexer } from './indexer';
import path from 'path';

jest.mock('fs/promises', () => ({
  readdir: jest.fn().mockResolvedValue(mockDirectoryFiles),
  readFile: jest.fn().mockResolvedValue(mockFileContent)
}));

describe('Indexer', () => {
  test('should insert all documents from specified folder', async () => {
    const analyzer = new Analyzer();
    const sut = new Indexer(analyzer);

    await sut.insertDocuments(path.join('any/folder/path'));
    const invertedIndex = sut.getIndex();
    const terms = mockFileContent.split(' ');

    terms.forEach(term => {
      const result = invertedIndex.find(term);
      expect(result).toStrictEqual(new Set<string>(mockDirectoryFiles));
    });
    expect(invertedIndex.index.size).toBe(terms.length);
  });
});
