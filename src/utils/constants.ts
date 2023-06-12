export enum NAMES {
  DATA_FOLDER_NAME = 'data',
  PERSISTENCE_FOLDER_NAME = 'persistence',
  LOG_FILE_NAME = 'logs.log',
  INDEX_FILE_NAME = 'inverted-index.json'
}

export enum MESSAGES {
  SEARCH_TERM_NOT_PROVIDED = 'Insira um termo de busca.',
  TOO_MANY_ARGUMENTS_PROVIDED = 'Número excessivo de parâmetros. Forneça apenas um termo de busca.',
  CREATING_INDEX = 'Criando index.',
  LOADING_INDEX = 'Carregando index.',
  CREATED_INDEX = 'Index criado.',
  NOT_FOUND_INDEX = 'Index não encontrado.',
  FOUND_INDEX = 'Index encontrado.',
  SAVING_INDEX = 'Salvando index.',
  DEFAULT_ERROR = 'Ocorreu um erro: ',
  STARTING_INDEXATION = 'Iniciando inserção de documentos.',
  FINISHED_INDEXATION = 'Todos os documentos foram inseridos.'
}
