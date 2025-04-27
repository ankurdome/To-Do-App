#!/bin/bash

# Check if the Node.js process is running
echo "Checking if application is running..."
if pgrep node > /dev/null
then
    echo "Node.js process is running"
else
    echo "Node.js process is not running"
    exit 1
fi

# Check if the application is responding
echo "Checking if application is responding..."
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000)
if [ $response -eq 200 ]
then
    echo "Application is responding correctly"
    exit 0
else
    echo "Application is not responding correctly. HTTP response code: $response"
    exit 1
fi 