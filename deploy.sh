#!/bin/bash

# 🍷 Wine Tasting Diary Deployment Script
# This script helps you build and prepare your application for deployment

echo "🍷 Wine Tasting Diary - Deployment Script"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

print_status "Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "npm version: $(npm --version)"

# Build Client
echo ""
echo "🏗️  Building Client..."
cd client

if [ ! -f "package.json" ]; then
    print_error "package.json not found in client directory"
    exit 1
fi

print_status "Installing client dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install client dependencies"
    exit 1
fi

print_status "Building client application..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Failed to build client application"
    exit 1
fi

print_status "Client build completed successfully!"

# Build Server
echo ""
echo "🏗️  Building Server..."
cd ../server

if [ ! -f "package.json" ]; then
    print_error "package.json not found in server directory"
    exit 1
fi

print_status "Installing server dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install server dependencies"
    exit 1
fi

print_status "Building server application..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Failed to build server application"
    exit 1
fi

print_status "Server build completed successfully!"

# Check for environment files
echo ""
echo "🔧 Environment Setup Check..."

cd ../client
if [ ! -f ".env" ]; then
    print_warning ".env file not found in client directory"
    print_warning "Create .env file with: REACT_APP_API_URL=http://localhost:5000"
else
    print_status "Client .env file found"
fi

cd ../server
if [ ! -f ".env" ]; then
    print_warning ".env file not found in server directory"
    print_warning "Create .env file with required variables (see DEPLOYMENT.md)"
else
    print_status "Server .env file found"
fi

# Summary
echo ""
echo "🎉 Build Process Completed!"
echo "=========================="
print_status "Client build: client/build/"
print_status "Server build: server/dist/"
echo ""
print_warning "Next steps:"
echo "1. Set up environment variables (see DEPLOYMENT.md)"
echo "2. Choose a deployment platform"
echo "3. Deploy your application"
echo ""
echo "📖 For detailed deployment instructions, see DEPLOYMENT.md"
echo "�� Happy deploying!"
