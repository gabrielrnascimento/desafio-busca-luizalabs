
import { Analyzer } from '../analyzer';
import { Indexer } from '../indexer';
import { Logger } from '../logger';
import { createdIndexMessage, creatingIndexMessage, defaultErrorMessage } from '../utils/messages';
import { dataFolderPath, indexPath, logFilePath, persistenceFolderPath } from '../utils/paths';

import fs from 'fs/promises';

export const createIndex = async (): Promise<void> => {
  await fs.mkdir(persistenceFolderPath);
  const analyzer = new Analyzer();
  const logger = new Logger(logFilePath);
  const indexer = new Indexer(analyzer, logger);
  await logger.info(creatingIndexMessage, true);
  await indexer.insertDocuments(dataFolderPath);
  await indexer.save(indexPath);
  await logger.info(createdIndexMessage, true);
};

createIndex()
  .catch(err => { console.error(defaultErrorMessage, err); });
