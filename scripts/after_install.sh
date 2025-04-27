#!/bin/bash

# Navigate to the application directory
cd /var/www/mern-todo-app

# Install production dependencies for backend
echo "Installing backend dependencies..."
npm install --production

# Navigate to frontend directory and install dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install --production
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @tailwindcss/forms --production

# Build the frontend
echo "Building frontend..."
npm run build

# Return to the main directory
cd ..

# Set proper permissions
echo "Setting permissions..."
chown -R root:root .
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;

# Make scripts executable
chmod +x scripts/*.sh

echo "After install tasks completed" 