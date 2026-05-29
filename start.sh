#!/bin/sh

echo "Starting Laravel..."

php artisan optimize:clear
php artisan config:clear

chmod -R 777 storage bootstrap/cache

php artisan migrate --force

php artisan config:cache
php artisan route:cache
php artisan view:cache

php artisan tinker --execute="dump(config('database.connections.pgsql.host'))"

php-fpm -D
nginx -g "daemon off;"