import { type InvertedIndexType } from '../invertedIndex';

export const mockDirectoryFiles = ['random-file.txt', 'another-file.txt'];
export const mockFileContent = 'random content text';

export const mockJsonContent = (): Record<string, string[]> => {
  const mockJson: Record<string, string[]> = {};
  const terms = mockFileContent.split(' ');
  for (const term of terms) {
    mockJson[term] = mockDirectoryFiles;
  }
  return mockJson;
};

export const mockInvertedIndex = (): InvertedIndexType => {
  const mockSet = new Set<string>(mockDirectoryFiles);
  const index = new Map<string, Set<string>>();
  mockFileContent.split(' ').forEach(term => index.set(term, mockSet));
  return index;
};
