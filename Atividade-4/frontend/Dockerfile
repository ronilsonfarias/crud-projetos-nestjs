# Frontend (React) containerizado.
#
# Multi-stage:
#   1) Node faz o build do React (gera a pasta dist/).
#   2) Nginx serve os arquivos estáticos e faz proxy de /api para o backend
#      que roda na máquina do aluno (veja nginx.conf).

# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# ---------- servir ----------
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
