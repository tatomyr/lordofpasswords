#!/bin/bash

# Setting build date to refresh the service worker
file_content=`cat ./service-worker.template.js`
output="${file_content/__BUILD_DATE__/$(date)}"
echo "$output" > ./.service-worker.js
echo Creating stamped serwice worker file.
