#!/bin/sh

echo "Starting MemoryCloud..."

export PORT=${PORT:-10000}

rm -rf bootstrap/cache/*.php

php artisan optimize:clear

echo "Waiting DB..."
sleep 5

php artisan migrate --force || true

chmod -R 775 storage bootstrap/cache

php-fpm -D
nginx -g "daemon off;"