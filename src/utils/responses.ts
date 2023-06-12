import { type DocumentTitle, type Term } from './types';

export const notFoundResultsMessage = (searchTerm: Term): string => `Não foi encontrada nenhuma ocorrência pelo termo "${searchTerm}".`;
export const singleResultFirstMessage = (searchTerm: Term): string => `Foi encontrada 1 ocorrência pelo termo "${searchTerm}".`;
export const multipleResultsFirstMessage = (searchTerm: Term, documents: DocumentTitle[]): string => `Foram encontradas ${documents.length} ocorrências pelo termo "${searchTerm}".`;
export const singleResultSecondMessage = (searchTerm: Term): string => `O arquivo que possui "${searchTerm}" é:`;
export const multipleResultsSecondMessage = (searchTerm: Term, documents: DocumentTitle[]): string => `Os arquivos que possuem "${searchTerm}" são:`;
