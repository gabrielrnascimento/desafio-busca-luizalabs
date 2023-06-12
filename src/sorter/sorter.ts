import { type DocumentTitle } from '../utils/types';

export class Sorter {
  public sort (documents: DocumentTitle[]): DocumentTitle[] {
    return documents.sort();
  }
}
