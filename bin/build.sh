#!/bin/bash

# Setting build date to refresh the service worker
file_content=`cat ./lordofpasswords-sw.template.js`
output="${file_content/__BUILD_DATE__/$(date)}"
# Changing the cache version
version=$(grep '"version": "[^"]*' ./package.json -o | cut -c13-)
output="${output/__VERSION__/$version}"

echo "$output" > ./lordofpasswords-sw.generated.js
echo Created stamped serwice worker file.
echo Cache version $version
