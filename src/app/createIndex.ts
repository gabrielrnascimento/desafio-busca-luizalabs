
import { Analyzer } from '../analyzer';
import { Indexer } from '../indexer';
import { Logger } from '../logger';
import { MESSAGES } from '../utils/constants';
import { dataFolderPath, indexPath, logFilePath, persistenceFolderPath } from '../utils/paths';

import fs from 'fs/promises';

export const createIndex = async (): Promise<void> => {
  await fs.mkdir(persistenceFolderPath);
  const analyzer = new Analyzer();
  const logger = new Logger(logFilePath);
  const indexer = new Indexer(analyzer, logger);
  await logger.info(MESSAGES.CREATING_INDEX, true);
  await indexer.insertDocuments(dataFolderPath);
  await indexer.save(indexPath);
  await logger.info(MESSAGES.CREATED_INDEX, true);
};

createIndex()
  .catch(err => { console.error(MESSAGES.DEFAULT_ERROR, err); });
