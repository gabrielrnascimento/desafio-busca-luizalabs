#!/bin/bash

npm run postinstall

# Set the ownership and permissions for the directories
chown -R node:node /usr/desafio-busca-luizalabs/data /usr/desafio-busca-luizalabs/persistence
chmod -R 777 /usr/desafio-busca-luizalabs/data /usr/desafio-busca-luizalabs/persistence

# Execute the command passed as arguments
tail -f /dev/null
