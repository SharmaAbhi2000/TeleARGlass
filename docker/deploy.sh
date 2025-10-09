#!/bin/bash

# TeleARGlass Deployment Script for AWS Ubuntu
# This script sets up and deploys the application using Docker Compose

set -e

echo "🚀 Starting TeleARGlass Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root for security reasons"
   exit 1
fi

# Check if .env file exists
if [ ! -f "../.env" ]; then
    print_error ".env file not found! Please create it with your environment variables."
    exit 1
fi

# Update system packages
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker if not already installed
if ! command -v docker &> /dev/null; then
    print_status "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    
    # Start and enable Docker service
    sudo systemctl start docker
    sudo systemctl enable docker
    
    print_warning "Docker installed. You may need to log out and log back in for group changes to take effect."
    print_status "Testing Docker installation..."
    sudo docker --version
fi

# Install Docker Compose if not already installed
if ! command -v docker-compose &> /dev/null; then
    print_status "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    
    # Verify installation
    print_status "Testing Docker Compose installation..."
    docker-compose --version
fi

# Create necessary directories
print_status "Creating necessary directories..."
mkdir -p ../logs ../uploads ../ssl

# Set proper permissions
sudo chown -R $USER:$USER ../logs ../uploads ../ssl

# Stop any existing containers
print_status "Stopping existing containers..."
docker-compose down --remove-orphans || true

# Remove old images to free up space
print_status "Cleaning up old Docker images..."
docker system prune -f

# Build and start the application
print_status "Building and starting the application..."
docker-compose up --build -d

# Wait for the application to start
print_status "Waiting for application to start..."
sleep 30

# Check if Docker is accessible (handle group permission issues)
if ! docker ps &> /dev/null; then
    print_warning "Docker group permission issue detected. Trying with sudo..."
    print_warning "You may need to log out and log back in, or run: newgrp docker"
    
    # Try with sudo as fallback
    sudo docker-compose up --build -d
    sleep 30
fi

# Check if the application is running
if docker-compose ps | grep -q "Up"; then
    print_status "✅ Application deployed successfully!"
    print_status ""
    print_status "🌐 Your TeleARGlass application is now running!"
    print_status "   Frontend: https://telearglass.com (or https://www.telearglass.com)"
    print_status "   API: https://telearglass.com/api"
    print_status "   Note: www.telearglass.com redirects to telearglass.com"
    print_status "   Backend + Admin: Internal only (not exposed on domain)"
    print_status ""
    print_status "📋 Useful commands:"
    print_status "  View logs: docker-compose logs -f"
    print_status "  Stop app: docker-compose down"
    print_status "  Restart app: docker-compose restart"
    print_status "  Update app: ./deploy.sh"
    print_status "  Start with SSL: docker-compose --profile production up -d"
else
    print_error "❌ Application failed to start. Check logs with: docker-compose logs"
    exit 1
fi

# Show container status
print_status "Container status:"
docker-compose ps

print_status "🎉 Deployment completed!"
