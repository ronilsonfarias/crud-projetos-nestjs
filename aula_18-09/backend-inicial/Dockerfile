# To-Do List — imagem Docker do projeto.
#
# O projeto já "nasce" com Dockerfile. Em aula rodamos localmente com
# `npm run dev`, mas com o Docker qualquer pessoa executa sem instalar Node.

FROM node:22-alpine

WORKDIR /app

# Instala as dependências primeiro (aproveita o cache do Docker).
COPY package.json ./
RUN npm install

# Copia o restante do código.
COPY . .

EXPOSE 3000

# Em container usamos o script de produção (node), não o de dev (nodemon).
CMD ["npm", "start"]
