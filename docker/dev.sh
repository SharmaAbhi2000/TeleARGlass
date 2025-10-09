#!/bin/bash

# TeleARGlass Local Development Script
# This script helps with local development using Docker Compose

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}[TeleARGlass Local Development]${NC} $1"
}

# Check if .env file exists
if [ ! -f "../.env" ]; then
    print_error ".env file not found! Please create it with your environment variables."
    print_warning "You can copy from your existing .env file or create a new one."
    exit 1
fi

print_header "Starting TeleARGlass Local Development Environment"

# Stop any existing containers
print_status "Stopping existing containers..."
docker-compose down --remove-orphans || true

# Build and start services
print_status "Building and starting services..."
docker-compose up --build -d

# Wait for services to start
print_status "Waiting for services to start..."
sleep 15

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    print_status "✅ Local development environment started successfully!"
    print_status ""
    print_status "🌐 Your TeleARGlass application is now running locally!"
    print_status "   Frontend: http://localhost:3000"
    print_status "   API: http://localhost:3000/api"
    print_status "   Backend + Admin: Internal only (not accessible from localhost)"
    print_status ""
    print_status "📋 Useful commands:"
    print_status "  View logs: docker-compose logs -f"
    print_status "  Stop services: docker-compose down"
    print_status "  Restart services: docker-compose restart"
    print_status "  Rebuild: docker-compose up --build -d"
    print_status "  View container status: docker-compose ps"
else
    print_error "❌ Services failed to start. Check logs with: docker-compose logs"
    exit 1
fi

# Show container status
print_status "Container status:"
docker-compose ps

print_status "🎉 Local development environment ready!"
