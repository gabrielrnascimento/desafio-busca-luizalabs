# Desafio Luizalabs - Busca

* [Descrição](#descrição)
* [Setup](#setup)
* [Localmente](#localmente)
  * [Instalação](#instalando-localmente)
  * [Executando o programa](#executando-o-programa-localmente)
  * [Executando os testes](#executando-os-testes-localmente)
* [Docker](#docker)
  * [Instalação](#instalação-via-docker)
  * [Executando o programa](#executando-o-programa-via-docker)
  * [Executando os testes](#executando-os-testes-via-docker)

## Descrição

O projeto foi desenvolvido em TypeScript com o objetivo de criar um programa que receba uma sentença a partir do input do usuário e retorne a quantidade e o nome dos arquivos onde todos os termos da sentença estão presentes. O desenvolvimento foi feito através da abordagem de Test Driven Development (TDD) com a utilização de Jest para os testes.

O projeto foi containerizado utilizando Docker pela portabilidade e consistência. Também foi implementado um logger para garantir a observabilidade do projeto durante sua execução. Os dados de log são salvos no arquivo `persistence/logs.log`.

Além disso, um script de pré-processamento foi criado, onde o programa navega por todos os arquivos presentes na pasta `data/`, passando o seu conteúdo por um Analyzer que realiza a remoção de caracteres especiais, tokenização e transformação de cada conteúdo, adicionando cada token a um indice invertido juntamente com o nome do seu respectivo arquivo, o índice é salvo no arquivo `persistence/inverted-index.json`

Segue abaixo um exemplo de arquivo:

```text
nome do arquivo:  star-wars-the-clone-wars-darth-maul-returns.txt
conteúdo:         star wars the clone wars: darth maul returns 2012  george lucas
```

Segue abaixo um exemplo de como esses dados são salvos:

 ```json
 {
    "george": [
      "star-wars-the-clone-wars-darth-maul-returns.txt",
      "star-wars-the-legacy-revealed.txt"
    ],
    "lucas": [
      "star-wars-the-clone-wars-darth-maul-returns.txt",
      "star-wars-the-legacy-revealed.txt"
    ]
  }
 ```

---

## Setup

1. Clone esse repositório `git clone <repo>`.
2. Navegue até o diretório do projeto `cd desafio-busca-luizalabs`.
3. Extraia o arquivo `data_movie.zip`
4. Insira a pasta `data` na raiz do projeto
5. A estrutura do projeto deve ser a seguinte:

    ```bash
    desafio-busca-luizalabs
    ├── data/ # pasta extraída do arquivo data_movie.zip
    │   ├── arquivo-1.txt
    │   ├── arquivo-2.txt
    │   ├── arquivo-3.txt
    │   └── ....
    ├── docs/
    │   └── ....
    ├── src/
    │   └── ....
    ├── .editorconfig
    ├── .eslintrc.json
    ├── .gitignore
    ├── .npmrc
    ├── data_movie.zip
    ├── docker-compose.yaml
    ├── Dockerfile.api
    ├── jest.config.js
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── tsconfig.json
    ```

## Localmente

### Instalando localmente

1. Execute o comando para instalar as dependências necessárias:
  `npm install`
2. Após a instalação, o `build` já será realizado.
3. O script de pré-processamento dos arquivos também será executado após o `npm install`.
É possível acompanhar pelas mensagens no terminal.

    ```bash
    npm install
    Criando index.
    Index criado.
    ```

  > Caso seja necessário realizar o `build` novamente, utilize o comando:
    `npm run build` ou `npx tsc`

### Executando o programa localmente

* Para executar o programa utilize o comando:
  `npm run search <termo de busca>` ou `node dist/app/search.js <termo de busca>`

  ```bash
  > npm run search 'george lucas'
  Foram encontradas 11 ocorrências pelo termo "george lucas".
  Os arquivos que possuem "george lucas" são:
  data/01-42-1.txt
  data/captain-eo.txt
  data/electronic-labyrinth-thx-1138-4eb.txt
  data/merry-in-laws.txt
  data/milius.txt
  data/more-american-graffiti.txt
  data/star-wars-the-clone-wars-darth-maul-returns.txt
  data/star-wars-the-legacy-revealed.txt
  data/the-beginning-making-episode-i.txt
  data/the-people-vs-george-lucas.txt
  data/within-a-minute-the-making-of-episode-iii.txt
  ```

### Executando os testes localmente

* Execute o comando para rodar os testes
  `npm run test` ou `npx jest`
* Para obter o coverage dos testes, execute o comando:
  `npm run coverage` ou `npx jest --coverage`

  ![test coverage](/docs/coverage.png)
---

## Docker

### Instalação via Docker

>**Para essa instalação é necessário `Docker` e `docker compose`**

1. Execute o comando para iniciar o container
  `npm run up` ou `docker compose up -d`

> Durante setup do container o `build` já é realizado, mas caso seja necessário realizar novamente, utilize o comando:
  `npm run docker-build` ou `docker exec desafio npx tsc`

> Durante setup do container o script de pré-processamento dos arquivos é executado mas caso seja necessário realizar novamente, utilize o comando:
  `npm run docker-generate-index` ou `docker exec desafio node dist/app/createIndex.js`

### Executando o programa via Docker

* Para executar o programa utilize o comando:
  `npm run docker-search <termo de busca>` ou `docker exec desafio node dist/app/search.js <termo de busca>`

### Executando os testes via Docker

* Execute o comando para rodar os testes
  `npm run docker-test` ou `docker exec desafio npx jest`
* Para obter o coverage dos testes, execute os comandos:
  1. `docker exec -it desafio bash`
  2. `npm run coverage`
