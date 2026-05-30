#!/bin/sh

echo "Starting MemoryCloud..."

# permissions (Render reset souvent)
chmod -R 775 storage bootstrap/cache

# clean Laravel cache
php artisan optimize:clear

# config cache
php artisan config:cache

# migrations auto
php artisan migrate --force

# start PHP-FPM
php-fpm -F