#!/bin/bash

# TeleARGlass Health Check Script
# This script checks the health of all services

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[HEALTHY]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[UNHEALTHY]${NC} $1"
}

echo "🔍 TeleARGlass Health Check"
echo "=========================="

# Check if Docker is running
if docker ps &> /dev/null; then
    print_status "Docker is running"
else
    print_error "Docker is not running or not accessible"
    exit 1
fi

# Check container status
echo ""
echo "📦 Container Status:"
if docker-compose ps | grep -q "Up"; then
    docker-compose ps
    print_status "All containers are running"
else
    print_error "Some containers are not running"
    docker-compose ps
fi

# Check if services are responding
echo ""
echo "🌐 Service Health Checks:"

# Check frontend
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    print_status "Frontend is responding (HTTP 200)"
else
    print_error "Frontend is not responding"
fi

# Check API
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api | grep -q "200\|404"; then
    print_status "API is responding"
else
    print_error "API is not responding"
fi

# Check if SSL is configured (if nginx is running with production profile)
if docker-compose ps | grep -q "nginx"; then
    if curl -s -o /dev/null -w "%{http_code}" https://telearglass.com | grep -q "200"; then
        print_status "HTTPS is working (telearglass.com)"
    else
        print_warning "HTTPS not accessible (may not be configured yet)"
    fi
fi

# Check system resources
echo ""
echo "💻 System Resources:"
echo "Available disk space: $(df -h / | tail -1 | awk '{print $4}')"
echo "Available memory: $(free -h | grep '^Mem:' | awk '{print $7}')"
echo "CPU load: $(uptime | awk -F'load average:' '{print $2}')"

# Check Docker resources
echo ""
echo "🐳 Docker Resources:"
echo "Docker images: $(docker images -q | wc -l)"
echo "Docker containers: $(docker ps -q | wc -l)"
echo "Docker volumes: $(docker volume ls -q | wc -l)"

# Check logs for errors
echo ""
echo "📋 Recent Logs (last 10 lines):"
docker-compose logs --tail=10

echo ""
echo "✅ Health check completed!"

















