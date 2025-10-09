#!/bin/bash

# TeleARGlass Docker Runner
# This script provides easy access to docker commands from the root directory

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_header() {
    echo -e "${BLUE}[TeleARGlass Docker]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Change to docker directory
cd docker

# Check if .env file exists
if [ ! -f "../.env" ]; then
    print_warning ".env file not found in root directory!"
    print_warning "Please create a .env file with your environment variables."
    exit 1
fi

print_header "Running Docker commands from docker/ directory"

# Execute the command passed as arguments
if [ $# -eq 0 ]; then
    print_status "Available commands:"
    echo "  ./docker-run.sh dev          - Start local development"
    echo "  ./docker-run.sh deploy       - Deploy to production"
    echo "  ./docker-run.sh up           - Start services"
    echo "  ./docker-run.sh down         - Stop services"
    echo "  ./docker-run.sh logs         - View logs"
    echo "  ./docker-run.sh build        - Build services"
    echo "  ./docker-run.sh ssl          - Setup SSL certificates"
    echo "  ./docker-run.sh <command>    - Run any docker-compose command"
    exit 0
fi

case "$1" in
    "dev")
        print_status "Starting local development environment..."
        ./dev.sh
        ;;
    "deploy")
        print_status "Deploying to production..."
        ./deploy.sh
        ;;
    "ssl")
        print_status "Setting up SSL certificates..."
        sudo ./setup-ssl.sh
        ;;
    *)
        print_status "Running: docker-compose $@"
        docker-compose "$@"
        ;;
esac

