#!/bin/bash

# Setting build date to refresh the service worker
file_content=`cat ./service-worker.template.js`
output="${file_content/__BUILD_DATE__/$(date)}"
# Changing the cache version
version=v$(grep '"version": "[^"]*' ./package.json -o | cut -c13-)
output="${output/__VERSION__/$version}"

echo "$output" > ./service-worker.generated.js
echo Created stamped serwice worker file.
echo Cache version $version
