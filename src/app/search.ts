import { Analyzer } from '../analyzer';
import { CLI } from '../cli';
import { Indexer } from '../indexer';
import { Logger } from '../logger/logger';
import { Searcher } from '../searcher';
import { Sorter } from '../sorter';
import { MESSAGES, NAMES } from '../utils/constants';
import { dataFolderPath, indexPath, logFilePath, persistenceFolderPath } from '../utils/paths';

import { existsSync } from 'fs';
import fs from 'fs/promises';

const main = async (): Promise<void> => {
  const logger = new Logger(logFilePath);
  const cli = new CLI(logger);
  const searchTerm = await cli.handleInput();
  const analyzer = new Analyzer();
  const indexer = new Indexer(analyzer, logger);
  if (!existsSync(persistenceFolderPath)) {
    await fs.mkdir(NAMES.PERSISTENCE_FOLDER_NAME);
  }
  if (!existsSync(indexPath)) {
    await logger.info(MESSAGES.NOT_FOUND_INDEX);
    await logger.info(MESSAGES.CREATING_INDEX);
    await indexer.insertDocuments(dataFolderPath);
    await indexer.save(indexPath);
  } else {
    await logger.info(MESSAGES.FOUND_INDEX);
    await indexer.load(indexPath);
  }
  const sorter = new Sorter();
  const index = await indexer.getInvertedIndex();
  const searcher = new Searcher(analyzer, index, sorter);
  const results = searcher.search(searchTerm);
  await cli.handleOutput(searchTerm, results);
};

main()
  .catch(err => { console.error(MESSAGES.DEFAULT_ERROR, err); });
