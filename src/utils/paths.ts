import { NAMES } from './constants';

import path from 'path';

const rootDir = process.cwd();
export const dataFolderPath = path.join(rootDir, NAMES.DATA_FOLDER_NAME);
export const persistenceFolderPath = path.join(rootDir, NAMES.PERSISTENCE_FOLDER_NAME);
export const indexPath = path.join(persistenceFolderPath, NAMES.INDEX_FILE_NAME);
export const logFilePath = path.join(persistenceFolderPath, NAMES.LOG_FILE_NAME);
