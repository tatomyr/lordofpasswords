#!/bin/bash

# Start testing server
static-server -p 8081 &
# Run tests with Cypress
cypress run --config baseUrl=http://localhost:8081
# Catch the most recent command response
RESULT=$?
# Find the testing server PID
test_server_PID=`ps -A | grep 'static-server -p 8081' | grep -v grep | awk '{print $1}'`
# Kill the process
kill -9 $test_server_PID
# Exit with error if testing has failed
$RESULT || exit $RESULT
