#!/bin/sh

echo "Starting Laravel..."

php artisan optimize:clear
rm -rf bootstrap/cache/*.php

php artisan tinker --execute="dump(env('DB_HOST'));"

php artisan migrate --force

php-fpm -D
nginx -g "daemon off;"