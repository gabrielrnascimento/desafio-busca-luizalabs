import { type DocumentTitle, type Term } from './types';

export const notFoundResultsMessage = (searchTerm: Term): string => `Não foi encontrada nenhuma ocorrência pelo termo "${searchTerm}".`;
export const singleResultFirstMessage = (searchTerm: Term): string => `Foi encontrada 1 ocorrência pelo termo "${searchTerm}".`;
export const multipleResultsFirstMessage = (searchTerm: Term, documents: DocumentTitle[]): string => `Foram encontradas ${documents.length} ocorrências pelo termo "${searchTerm}".`;
export const singleResultSecondMessage = (searchTerm: Term): string => `O arquivo que possui "${searchTerm}" é:`;
export const multipleResultsSecondMessage = (searchTerm: Term, documents: DocumentTitle[]): string => `Os arquivos que possuem "${searchTerm}" são:`;

export const searchTermNotProvidedMessage = 'Insira um termo de busca.';
export const tooManyArgumentsProvidedMessage = 'Número excessivo de parâmetros. Forneça apenas um termo de busca.';
export const creatingIndexMessage = 'Criando index.';
export const loadingIndexMessage = 'Carregando index.';
export const createdIndexMessage = 'Index criado.';
export const notFoundIndexMessage = 'Index não encontrado.';
export const foundIndexMessage = 'Index encontrado.';
export const savingIndexMessage = 'Salvando index.';
export const defaultErrorMessage = 'Ocorreu um erro: ';
export const startingIndexation = 'Iniciando inserção de documentos.';
export const finishedIndexation = 'Todos os documentos foram inseridos.';
