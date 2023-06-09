import { InvertedIndex } from '../invertedIndex';
import { type Analyzer } from '../analyzer';
import path from 'path';
import fs from 'fs/promises';

export class Indexer {
  private invertedIndex!: InvertedIndex;

  constructor (private readonly analyzer: Analyzer) {}

  public getIndex (): InvertedIndex {
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
}
