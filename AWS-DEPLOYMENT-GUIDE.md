# TeleARGlass AWS Ubuntu Deployment Guide

This guide provides step-by-step instructions for deploying TeleARGlass on AWS Ubuntu instances.

## 🚀 Quick Deployment

### Prerequisites
- AWS Ubuntu instance (Ubuntu 20.04 LTS or later recommended)
- Domain `telearglass.com` and `www.telearglass.com` pointing to your AWS instance IP
- SSH access to the instance
- `.env` file with all required environment variables

### Step 1: Upload Your Project
```bash
# Upload your project to AWS instance
scp -r . ubuntu@your-aws-instance-ip:/home/ubuntu/telearglass
```

### Step 2: SSH and Deploy
```bash
# SSH into your AWS instance
ssh ubuntu@your-aws-instance-ip

# Navigate to project directory
cd telearglass

# Make scripts executable
chmod +x docker/aws-deploy.sh
chmod +x docker/setup-ssl.sh

# Run the AWS deployment script
./docker/aws-deploy.sh
```

### Step 3: Setup SSL (Optional but Recommended)
```bash
# Setup SSL certificates
sudo ./docker/setup-ssl.sh

# Start with SSL
cd docker
docker-compose --profile production up -d
```

## 🔧 AWS Instance Requirements

### Minimum Requirements
- **Instance Type**: t3.medium or larger
- **RAM**: 2GB minimum (4GB recommended)
- **Storage**: 20GB minimum
- **OS**: Ubuntu 20.04 LTS or later

### Recommended AWS Instance
- **Instance Type**: t3.large
- **RAM**: 8GB
- **Storage**: 30GB
- **OS**: Ubuntu 22.04 LTS

## 🌐 AWS Security Group Configuration

Configure your AWS Security Group to allow the following ports:

| Port | Protocol | Source | Description |
|------|----------|--------|-------------|
| 22 | TCP | Your IP | SSH access |
| 80 | TCP | 0.0.0.0/0 | HTTP (for Let's Encrypt) |
| 443 | TCP | 0.0.0.0/0 | HTTPS |

### Security Group Rules
```bash
# SSH (restrict to your IP)
Type: SSH
Protocol: TCP
Port: 22
Source: Your IP/32

# HTTP
Type: HTTP
Protocol: TCP
Port: 80
Source: 0.0.0.0/0

# HTTPS
Type: HTTPS
Protocol: TCP
Port: 443
Source: 0.0.0.0/0
```

## 📋 DNS Configuration

### A Records
```
telearglass.com     A    YOUR_AWS_IP
www.telearglass.com A    YOUR_AWS_IP
```

### Alternative (CNAME)
```
telearglass.com     A    YOUR_AWS_IP
www.telearglass.com CNAME telearglass.com
```

## 🔐 Environment Variables

Ensure your `.env` file contains all required variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/telearglass

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Payment Gateway
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret

# Server
PORT=4000
NODE_ENV=production
```

## 🚀 Deployment Scripts

### aws-deploy.sh
Complete deployment script that:
- Installs Docker and Docker Compose
- Configures firewall
- Sets up directories
- Builds and starts the application
- Handles permission issues

### setup-ssl.sh
SSL certificate setup script that:
- Installs certbot
- Obtains Let's Encrypt certificates
- Sets up automatic renewal
- Configures proper permissions

## 📊 Monitoring and Maintenance

### Check Application Status
```bash
cd docker
docker-compose ps
docker-compose logs -f
```

### Update Application
```bash
cd docker
docker-compose down
docker-compose up --build -d
```

### SSL Certificate Renewal
Certificates are automatically renewed via cron job. Manual renewal:
```bash
cd docker
sudo ./renew-ssl.sh
```

## 🔧 Troubleshooting

### Common Issues

#### Docker Permission Issues
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Apply group changes
newgrp docker

# Or logout and login again
```

#### Port Already in Use
```bash
# Check what's using the port
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# Kill the process if needed
sudo kill -9 PID
```

#### SSL Certificate Issues
```bash
# Check certificate status
sudo certbot certificates

# Renew manually
sudo certbot renew

# Check nginx configuration
sudo nginx -t
```

#### Application Won't Start
```bash
# Check logs
cd docker
docker-compose logs

# Check system resources
df -h
free -h
docker system df
```

### Performance Optimization

#### Increase Swap Space
```bash
# Create swap file
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

#### Optimize Docker
```bash
# Clean up unused resources
docker system prune -a

# Limit container resources in docker-compose.yml
deploy:
  resources:
    limits:
      memory: 1G
      cpus: '0.5'
```

## 🔒 Security Best Practices

1. **Keep system updated**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Use strong passwords** and SSH keys

3. **Configure firewall**:
   ```bash
   sudo ufw enable
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```

4. **Regular backups**:
   ```bash
   # Backup application data
   tar -czf backup-$(date +%Y%m%d).tar.gz uploads/ logs/ ssl/
   ```

5. **Monitor logs**:
   ```bash
   # Set up log rotation
   sudo logrotate -f /etc/logrotate.conf
   ```

## 📞 Support

If you encounter issues:

1. Check the logs: `docker-compose logs -f`
2. Verify your `.env` file configuration
3. Ensure your domain DNS is properly configured
4. Check AWS Security Group settings
5. Verify SSL certificate status

## 🎯 Production Checklist

- [ ] AWS instance created and configured
- [ ] Security Group rules set up
- [ ] Domain DNS configured
- [ ] `.env` file created with all variables
- [ ] Project uploaded to AWS instance
- [ ] `aws-deploy.sh` executed successfully
- [ ] SSL certificates installed
- [ ] Application accessible via domain
- [ ] Monitoring and backup procedures in place


