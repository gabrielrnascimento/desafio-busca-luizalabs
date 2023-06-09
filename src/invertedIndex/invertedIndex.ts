type DocumentTitle = string;
type Term = string;

export type InvertedIndexType = Map<Term, Set<DocumentTitle>>;

export class InvertedIndex {
  index: InvertedIndexType;

  constructor () {
    this.index = new Map<Term, Set<DocumentTitle>>();
  }
}
