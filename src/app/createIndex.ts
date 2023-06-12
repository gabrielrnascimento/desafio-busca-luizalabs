
import { Analyzer } from '../analyzer';
import { Indexer } from '../indexer';
import { Logger } from '../logger';
import { MESSAGES, NAMES } from '../utils/constants';
import { dataFolderPath, indexPath, logFilePath, persistenceFolderPath } from '../utils/paths';

import { existsSync } from 'fs';
import fs from 'fs/promises';

export const createIndex = async (): Promise<void> => {
  if (!existsSync(persistenceFolderPath)) {
    await fs.mkdir(NAMES.PERSISTENCE_FOLDER_NAME);
  }
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
