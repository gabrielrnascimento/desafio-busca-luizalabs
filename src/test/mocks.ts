import { type Term, type DocumentTitle, type InvertedIndexType } from '../utils/types';

export const mockDirectoryFiles = ['1000-first-file.txt', '1-second-file.txt', '3-third-file.txt'];
export const mockSortedFiles = ['1-second-file.txt', '3-third-file.txt', '1000-first-file.txt'];
export const mockFileContent = 'random content text';

export enum MOCK_TOKENS {
  UNIQUE = 'first',
  RARE = 'text',
  COMMON = 'random'
}

export const mockFiles = [
  {
    title: '1000-first-file.txt',
    content: 'first random text'
  },
  {
    title: '1-second-file.txt',
    content: 'second random text'
  },
  {
    title: '3-third-file.txt',
    content: 'third random content'
  }
];

export const mockIndex = [
  {
    term: 'first',
    documents: ['1000-first-file.txt']
  },
  {
    term: 'second',
    documents: ['1-second-file.txt']
  },
  {
    term: 'third',
    documents: ['3-third-file.txt']
  },
  {
    term: 'random',
    documents: ['1000-first-file.txt', '1-second-file.txt', '3-third-file.txt']
  },
  {
    term: 'text',
    documents: ['1000-first-file.txt', '1-second-file.txt']
  },
  {
    term: 'content',
    documents: ['3-third-file.txt']
  }
];

export const mockJsonContent = (): Record<Term, DocumentTitle[]> => {
  const mockJson: Record<Term, DocumentTitle[]> = {};
  mockIndex.forEach(item => {
    mockJson[item.term] = item.documents;
  });
  return mockJson;
};

export const mockInvertedIndex = (): InvertedIndexType => {
  const index = new Map<Term, Set<DocumentTitle>>();
  mockIndex.forEach(item => index.set(item.term, new Set(item.documents)));
  return index;
};
