import { type InvertedIndexType } from '../invertedIndex';

export const mockDirectoryFiles = ['c-first-file.txt', 'a-second-file.txt', 'b-third-file.txt'];
export const mockFileContent = 'random content text';

export const mockFiles = [
  {
    title: 'c-first-file.txt',
    content: 'first random text'
  },
  {
    title: 'a-second-file.txt',
    content: 'second random text'
  },
  {
    title: 'b-third-file.txt',
    content: 'third random content'
  }
];

export const mockIndex = [
  {
    term: 'first',
    documents: ['c-first-file.txt']
  },
  {
    term: 'second',
    documents: ['a-second-file.txt']
  },
  {
    term: 'third',
    documents: ['b-third-file.txt']
  },
  {
    term: 'random',
    documents: ['c-first-file.txt', 'a-second-file.txt', 'b-third-file.txt']
  },
  {
    term: 'text',
    documents: ['c-first-file.txt', 'a-second-file.txt']
  },
  {
    term: 'content',
    documents: ['b-third-file.txt']
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
