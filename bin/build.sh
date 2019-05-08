#!/bin/bash

# Copying files
rm -rf dist/
mkdir dist
cp -R src/* dist/

# Processing CSS
postcss src/style.css -o dist/style.css --no-map -u autoprefixer -u cssnano

# Changing build date to refresh the service worker
file_content=`cat ./src/service-worker.js`
output="${file_content/__BUILD_DATE__/$(date)}"
echo "$output" > ./dist/service-worker.js
