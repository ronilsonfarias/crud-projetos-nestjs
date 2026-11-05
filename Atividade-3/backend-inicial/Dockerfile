# Backend NestJS.
# Em aula rodamos LOCALMENTE com `npm run start:dev` (recarrega ao salvar).
# Este Dockerfile serve para empacotar/entregar a API já compilada.

FROM node:22-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
