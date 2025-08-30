#!/bin/bash

# 🍷 Wine Tasting Diary - Local Test Script
# This script tests the local setup to ensure everything is working

echo "🍷 Testing Local Wine Tasting Diary Setup"
echo "========================================="

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

# Test 1: Check if server is running
echo ""
echo "1. Testing Server Health..."
if curl -s http://localhost:5001/api/health > /dev/null; then
    print_status "Server is running on port 5001"
else
    print_error "Server is not responding on port 5001"
    exit 1
fi

# Test 2: Test user registration
echo ""
echo "2. Testing User Registration..."
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"testuser@example.com","password":"testpass123"}')

if echo "$REGISTER_RESPONSE" | grep -q "User created successfully"; then
    print_status "User registration working"
    # Extract token for login test
    TOKEN=$(echo "$REGISTER_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
else
    print_error "User registration failed"
    echo "Response: $REGISTER_RESPONSE"
fi

# Test 3: Test user login
echo ""
echo "3. Testing User Login..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"testpass123"}')

if echo "$LOGIN_RESPONSE" | grep -q "Login successful"; then
    print_status "User login working"
    # Extract token for protected route test
    TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
else
    print_error "User login failed"
    echo "Response: $LOGIN_RESPONSE"
fi

# Test 4: Test protected route
echo ""
echo "4. Testing Protected Route..."
if [ ! -z "$TOKEN" ]; then
    PROTECTED_RESPONSE=$(curl -s -X GET http://localhost:5001/api/wines \
      -H "Authorization: Bearer $TOKEN")
    
    if echo "$PROTECTED_RESPONSE" | grep -q "wines\|\[\]"; then
        print_status "Protected route working"
    else
        print_warning "Protected route may have issues"
        echo "Response: $PROTECTED_RESPONSE"
    fi
else
    print_warning "Skipping protected route test (no token)"
fi

# Test 5: Check if client is running
echo ""
echo "5. Testing Client..."
if curl -s http://localhost:3000 > /dev/null; then
    print_status "React client is running on port 3000"
else
    print_error "React client is not responding on port 3000"
fi

# Test 6: Check MongoDB connection
echo ""
echo "6. Testing Database Connection..."
if curl -s http://localhost:5001/api/health | grep -q "OK"; then
    print_status "Database connection working"
else
    print_error "Database connection failed"
fi

# Summary
echo ""
echo "🎉 Local Test Results"
echo "===================="
print_status "Server API: http://localhost:5001"
print_status "Client App: http://localhost:3000"
print_status "Health Check: http://localhost:5001/api/health"
echo ""
print_warning "Next Steps:"
echo "1. Open http://localhost:3000 in your browser"
echo "2. Test user registration and login"
echo "3. Test adding wine tasting notes"
echo "4. Test search functionality"
echo ""
echo "🍷 Your wine tasting diary is ready for testing!"
