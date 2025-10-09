#!/bin/bash

# SSL Certificate Setup Script for telearglass.com
# This script sets up SSL certificates using Let's Encrypt

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

DOMAIN="telearglass.com"
WWW_DOMAIN="www.telearglass.com"

print_status "Setting up SSL certificates for $DOMAIN and $WWW_DOMAIN..."

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   print_error "This script must be run as root (use sudo)"
   exit 1
fi

# Update system packages
print_status "Updating system packages..."
apt update && apt upgrade -y

# Install certbot
print_status "Installing certbot..."
apt install -y certbot

# Stop nginx if running to free up port 80
print_status "Stopping nginx to free up port 80..."
systemctl stop nginx || true
docker-compose stop nginx || true

# Get SSL certificates
print_status "Obtaining SSL certificates from Let's Encrypt..."
certbot certonly --standalone \
    --non-interactive \
    --agree-tos \
    --email admin@telearglass.com \
    --domains $DOMAIN,$WWW_DOMAIN

# Create ssl directory
print_status "Creating SSL directory..."
mkdir -p ../ssl

# Copy certificates to ssl directory
print_status "Copying certificates to ssl directory..."
cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ../ssl/cert.pem
cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ../ssl/key.pem

# Set proper permissions
chmod 644 ../ssl/cert.pem
chmod 600 ../ssl/key.pem
chown -R $SUDO_USER:$SUDO_USER ../ssl/

# Create certificate renewal script
print_status "Creating certificate renewal script..."
cat > renew-ssl.sh << 'EOF'
#!/bin/bash
# SSL Certificate Renewal Script

set -e

DOMAIN="telearglass.com"

echo "Renewing SSL certificates..."

# Stop nginx
docker-compose stop nginx || true

# Renew certificates
certbot renew --standalone

# Copy renewed certificates
cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ../ssl/cert.pem
cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ../ssl/key.pem

# Set permissions
chmod 644 ../ssl/cert.pem
chmod 600 ../ssl/key.pem
chown -R $USER:$USER ../ssl/

# Restart nginx
docker-compose --profile production up -d

echo "SSL certificates renewed successfully!"
EOF

chmod +x renew-ssl.sh
chown $SUDO_USER:$SUDO_USER renew-ssl.sh

# Add cron job for automatic renewal
print_status "Setting up automatic certificate renewal..."
(crontab -u $SUDO_USER -l 2>/dev/null; echo "0 12 * * * /home/$SUDO_USER/telearglass/renew-ssl.sh >> /home/$SUDO_USER/telearglass/ssl-renewal.log 2>&1") | crontab -u $SUDO_USER -

print_status "✅ SSL certificates set up successfully!"
print_status ""
print_status "📋 Next steps:"
print_status "1. Start your application with SSL: docker-compose --profile production up -d"
print_status "2. Your site will be available at: https://telearglass.com"
print_status "3. Certificates will auto-renew via cron job"
print_status ""
print_status "🔧 Manual renewal: ./renew-ssl.sh"
print_status "📊 Check renewal logs: tail -f ssl-renewal.log"
