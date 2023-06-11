import { type Analyzer } from '../analyzer';
import { InvertedIndex } from '../invertedIndex';
import { type Term, type DocumentTitle } from '../utils/types';

import fs from 'fs/promises';
import path from 'path';

export class Indexer {
  private invertedIndex!: InvertedIndex;

  constructor (private readonly analyzer: Analyzer) {}

  public getInvertedIndex (): InvertedIndex {
    if (!this.invertedIndex) {
      return this.createInvertedIndex();
    }
    return this.invertedIndex;
  }

  private createInvertedIndex (): InvertedIndex {
    this.invertedIndex = new InvertedIndex(this.analyzer);
    return this.invertedIndex;
  }

  public async insertDocuments (folderPath: string): Promise<void> {
    this.invertedIndex = new InvertedIndex(this.analyzer);

    const files = await fs.readdir(folderPath);
    const promises: Array<Promise<void>> = [];

    for (const file of files) {
      const contentPromise = fs.readFile(path.join(folderPath, file), { encoding: 'utf-8' })
        .then(content => { this.invertedIndex.insert(file, content); });
      promises.push(contentPromise);
    }
    await Promise.all(promises);
  }

  private convertToJSON (): string {
    const indexData: Record<Term, DocumentTitle[]> = {};
    for (const [term, documents] of this.invertedIndex.index) {
      indexData[term] = Array.from(documents);
    }
    return JSON.stringify(indexData, null, 2);
  }

  public async save (filePath: string): Promise<void> {
    const convertedIndex = this.convertToJSON();
    await fs.writeFile(filePath, convertedIndex);
  }

  public async load (filePath: string): Promise<void> {
    const indexJson = await fs.readFile(filePath, 'utf-8');
    const indexData: Record<Term, DocumentTitle[]> = JSON.parse(indexJson);

    const invertedIndex = new InvertedIndex(this.analyzer);
    for (const [term, documents] of Object.entries(indexData)) {
      invertedIndex.index.set(term, new Set<DocumentTitle>(documents));
    }
    this.invertedIndex = invertedIndex;
  }
}
