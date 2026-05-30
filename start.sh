#!/bin/sh

echo "Starting MemoryCloud..."

chmod -R 775 storage bootstrap/cache

echo "Waiting for DB..."

sleep 5

php artisan config:clear
php artisan cache:clear

php artisan config:cache

php artisan migrate --force

php-fpm -F