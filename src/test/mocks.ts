import { type InvertedIndexType } from '../invertedIndex';

export const mockDirectoryFiles = ['first-file.txt', 'second-file.txt', 'third-file.txt'];
export const mockFileContent = 'random content text';

export const mockFiles = [
  {
    title: 'first-file.txt',
    content: 'first random text'
  },
  {
    title: 'second-file.txt',
    content: 'second random text'
  },
  {
    title: 'third-file.txt',
    content: 'third random content'
  }
];

export const mockIndex = [
  {
    term: 'first',
    documents: ['first-file.txt']
  },
  {
    term: 'second',
    documents: ['second-file.txt']
  },
  {
    term: 'third',
    documents: ['third-file.txt']
  },
  {
    term: 'random',
    documents: ['first-file.txt', 'second-file.txt', 'third-file.txt']
  },
  {
    term: 'text',
    documents: ['first-file.txt', 'second-file.txt']
  },
  {
    term: 'content',
    documents: ['third-file.txt']
  }
];

export const mockJsonContent = (): Record<string, string[]> => {
  const mockJson: Record<string, string[]> = {};
  mockIndex.forEach(item => {
    mockJson[item.term] = item.documents;
  });
  return mockJson;
};

export const mockInvertedIndex = (): InvertedIndexType => {
  const index = new Map<string, Set<string>>();
  mockIndex.forEach(item => index.set(item.term, new Set(item.documents)));
  return index;
};
