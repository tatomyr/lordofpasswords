#!/bin/bash

# Copying files
rm -rf public/
mkdir public
cp -R src/* public/

# Processing CSS
postcss src/style.css -o public/style.css --no-map -u autoprefixer -u cssnano

# Changing build date to refresh the service worker
file_content=`cat ./src/service-worker.js`
output="${file_content/__BUILD_DATE__/$(date)}"
echo "$output" > ./public/service-worker.js
