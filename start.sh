#!/bin/sh

echo "Starting Laravel..."

php artisan optimize:clear

php artisan config:cache
php artisan route:cache
php artisan view:cache

php artisan migrate --force

php-fpm -D
nginx -g "daemon off;"