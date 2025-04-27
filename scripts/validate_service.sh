#!/bin/bash

APP_DIR="/var/www/mern-todo-app"
MAX_RETRIES=12  # Maximum number of retries (2 minutes total with 10-second intervals)
RETRY_INTERVAL=10  # Time to wait between retries in seconds

# Source the .env file to get the correct port
if [ -f "$APP_DIR/.env" ]; then
    echo "Loading environment variables..."
    source "$APP_DIR/.env"
fi

# Use PORT from .env or default to 5000
PORT=${PORT:-5000}
echo "Using port: $PORT"

# Function to check if PM2 process is running
check_pm2_process() {
    if pm2 list | grep -q "mern-todo-app.*online"; then
        echo "PM2 process is running and online"
        return 0
    else
        echo "PM2 process is not running or not online"
        return 1
    fi
}

# Function to check application health
check_application_health() {
    local response
    local curl_output
    echo "Checking application health on port $PORT..."
    
    # Capture both HTTP code and response body
    curl_output=$(curl -s -w "\n%{http_code}" http://localhost:$PORT/health 2>&1)
    response=$(echo "$curl_output" | tail -n1)
    body=$(echo "$curl_output" | head -n1)
    
    echo "Response code: $response"
    echo "Response body: $body"
    
    if [[ $response -eq 200 ]]; then
        return 0
    else
        return 1
    fi
}

echo "Starting validation checks..."

# Initial delay to allow the application to start
echo "Waiting 10 seconds for initial application startup..."
sleep 10

# Check PM2 process first
if ! check_pm2_process; then
    echo "PM2 process check failed"
    exit 1
fi

# Retry loop for application health check
for ((i=1; i<=$MAX_RETRIES; i++)); do
    echo "Health check attempt $i of $MAX_RETRIES..."
    
    if check_application_health; then
        echo "Application validation successful!"
        exit 0
    fi
    
    if [ $i -lt $MAX_RETRIES ]; then
        echo "Waiting $RETRY_INTERVAL seconds before next retry..."
        sleep $RETRY_INTERVAL
    fi
done

echo "Application failed to respond after $MAX_RETRIES attempts"
echo "Last PM2 status:"
pm2 list
echo "Checking application logs:"
pm2 logs --lines 20 mern-todo-app
exit 1 