import { CONSTANTS } from './constants';

import path from 'path';

const rootDir = process.cwd();
export const dataFolderPath = path.join(rootDir, CONSTANTS.DATA_FOLDER_NAME);
export const persistenceFolderPath = path.join(rootDir, CONSTANTS.PERSISTENCE_FOLDER_NAME);
export const indexPath = path.join(persistenceFolderPath, CONSTANTS.INDEX_FILE_NAME);
export const logFilePath = path.join(persistenceFolderPath, CONSTANTS.LOG_FILE_NAME);
