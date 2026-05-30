#!/bin/sh

echo "Starting MemoryCloud..."

rm -rf bootstrap/cache/*.php

php artisan optimize:clear
php artisan config:clear

php artisan migrate --force

php-fpm -D
nginx -g "daemon off;"