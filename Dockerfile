FROM node:18

WORKDIR /usr/desafio-busca-luizalabs

COPY package*.json ./
COPY tsconfig.json ./

COPY .npmrc ./
COPY jest.config.js ./

COPY src ./src
COPY data ./data

RUN npm install

RUN npm run build

CMD ["tail", "-f", "/dev/null"]