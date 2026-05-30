#!/bin/sh

echo "Starting MemoryCloud..."


php artisan optimize:clear
rm -f bootstrap/cache/config.php

echo "DB HOST = $DB_HOST"

echo "Waiting DB..."
sleep 5

php artisan migrate --force || true

chmod -R 775 storage bootstrap/cache

php-fpm -D
nginx -g "daemon off;"