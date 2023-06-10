import { mockDirectoryFiles, mockFileContent, mockInvertedIndex, mockJsonContent } from '../test/mocks';
import path from 'path';
import { Analyzer } from '../analyzer';
import { Indexer } from './indexer';
import fs from 'fs/promises';

jest.mock('fs/promises', () => ({
  readdir: jest.fn().mockResolvedValue(mockDirectoryFiles),
  readFile: jest.fn().mockResolvedValue(mockFileContent),
  writeFile: jest.fn()
}));

type SutTypes = {
  sut: Indexer
};

const makeSut = (): SutTypes => {
  const analyzer = new Analyzer();
  const sut = new Indexer(analyzer);
  return { sut };
};

describe('Indexer', () => {
  test('should insert all documents from specified folder', async () => {
    const { sut } = makeSut();

    await sut.insertDocuments(path.join('any/folder/path'));
    const invertedIndex = sut.getInvertedIndex();
    const terms = mockFileContent.split(' ');

    terms.forEach(term => {
      const result = invertedIndex.find(term);
      expect(result).toStrictEqual(new Set<string>(mockDirectoryFiles));
    });
    expect(invertedIndex.index.size).toBe(terms.length);
  });

  test('should save index to a JSON file', async () => {
    const writeFileSpy = jest.spyOn(fs, 'writeFile');
    writeFileSpy.mockImplementation(jest.fn());

    const { sut } = makeSut();
    const invertedIndex = sut.getInvertedIndex();
    invertedIndex.index = mockInvertedIndex();
    const jsonFileName = 'any-file-name.json';
    await sut.save(jsonFileName);

    const mockJson = mockJsonContent();
    const expectedJsonData = JSON.stringify(mockJson, null, 2);
    expect(writeFileSpy).toHaveBeenCalledWith(jsonFileName, expectedJsonData);
  });
});
