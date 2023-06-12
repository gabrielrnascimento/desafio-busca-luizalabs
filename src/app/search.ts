import { Analyzer } from '../analyzer';
import { CLI } from '../cli';
import { Indexer } from '../indexer';
import { Logger } from '../logger/logger';
import { Searcher } from '../searcher';
import { CONSTANTS } from '../utils/constants';
import { defaultErrorMessage, foundIndexMessage, notFoundIndexMessage } from '../utils/messages';

import { existsSync } from 'fs';
import path from 'path';

const indexPath = path.join(process.cwd(), CONSTANTS.INDEX_FILE_PATH);

const main = async (): Promise<void> => {
  const logger = new Logger(path.join(process.cwd(), CONSTANTS.LOG_FILE_PATH));
  const cli = new CLI(logger);
  const searchTerm = await cli.handleInput();
  const analyzer = new Analyzer();
  const indexer = new Indexer(analyzer, logger);
  if (!existsSync(indexPath)) {
    await logger.info(notFoundIndexMessage);
    await indexer.insertDocuments(path.join(process.cwd(), CONSTANTS.DATA_FOLDER_PATH));
    await indexer.save(indexPath);
  } else {
    await logger.info(foundIndexMessage);
    await indexer.load(indexPath);
  }
  const searcher = new Searcher(analyzer, await indexer.getInvertedIndex());
  const results = searcher.search(searchTerm);
  await cli.handleOutput(searchTerm, results);
};

main()
  .catch(err => { console.error(defaultErrorMessage, err); });
