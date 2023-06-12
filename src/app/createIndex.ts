
import { Analyzer } from '../analyzer';
import { Indexer } from '../indexer';
import { Logger } from '../logger';
import { CONSTANTS } from '../utils/constants';
import { createdIndexMessage, creatingIndexMessage, defaultErrorMessage } from '../utils/messages';

import path from 'path';

export const createIndex = async (): Promise<void> => {
  const analyzer = new Analyzer();
  const logger = new Logger(path.join(process.cwd(), CONSTANTS.LOG_FILE_PATH));
  const indexer = new Indexer(analyzer, logger);
  await logger.info(creatingIndexMessage);
  await indexer.insertDocuments(path.join(process.cwd(), CONSTANTS.DATA_FOLDER_PATH));
  await indexer.save(CONSTANTS.INDEX_FILE_PATH);
  await logger.info(createdIndexMessage);
};

createIndex()
  .catch(err => { console.error(defaultErrorMessage, err); });
