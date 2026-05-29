#!/bin/sh

echo "Starting Laravel..."

php artisan optimize:clear
rm -rf bootstrap/cache/*.php


php artisan tinker --execute="dump(env('DB_HOST'));"

php artisan migrate --force


php artisan config:cache
php artisan route:cache
php artisan view:cache

php-fpm -D
nginx -g "daemon off;"