# Etapa 03 — Laravel + Blade (Server-Side Rendering).
#
# Estratégia: em vez de versionar centenas de arquivos do Laravel no
# repositório, o próprio build cria um projeto Laravel novo e limpo com o
# Composer e depois SOBRESCREVE apenas os dois arquivos que interessam para
# a aula: a rota (routes/web.php) e a view (resources/views/ola.blade.php).
#
# Assim o professor só precisa do Docker — não é necessário ter PHP,
# Composer ou Laravel instalados na máquina.

FROM php:8.3-cli

# Dependências que o Composer precisa para baixar/extrair pacotes.
RUN apt-get update \
    && apt-get install -y --no-install-recommends unzip git libzip-dev \
    && docker-php-ext-install zip \
    && rm -rf /var/lib/apt/lists/*

# Copiamos o binário oficial do Composer da imagem oficial.
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Cria um projeto Laravel novo e estável.
# Este passo já copia o .env e gera automaticamente a APP_KEY.
RUN composer create-project laravel/laravel . --no-interaction --prefer-dist

# Sobrescreve a rota e a view com o conteúdo didático da aula.
COPY routes/web.php routes/web.php
COPY resources/views/ola.blade.php resources/views/ola.blade.php

EXPOSE 8000

# php artisan serve levanta o servidor de aplicação do Laravel.
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
