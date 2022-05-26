#!/usr/bin/env bash


export DOLLAR='$'

envsubst < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf # /etc/nginx/conf.d/default.conf

nginx -g "daemon off;"

