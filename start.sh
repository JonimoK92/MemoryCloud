#!/bin/sh

echo "Starting Laravel..."
echo "DB HOST = $DB_HOST"


php artisan optimize:clear
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

php artisan migrate --force

php-fpm -D
nginx -g "daemon off;"