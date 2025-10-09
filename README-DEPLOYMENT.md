# TeleARGlass Deployment Guide

This guide explains how to deploy the TeleARGlass application using Docker. The application is designed with a secure architecture where only the frontend is exposed on the domain, while the backend and admin panel remain internal.

## Architecture

- **Frontend**: Exposed on domain (`https://telearglass.com`)
- **Backend + Admin**: Internal only (not exposed on domain)
- **API**: Accessible through frontend domain (`https://telearglass.com/api/*`)

## Prerequisites

### For Production (AWS Ubuntu):
- AWS Ubuntu instance (Ubuntu 20.04 LTS or later recommended)
- SSH access to the instance
- Domain `telearglass.com` and `www.telearglass.com` pointing to your AWS instance IP
- `.env` file with all required environment variables

### For Local Development:
- Docker and Docker Compose installed
- `.env` file with all required environment variables

## Local Development

### Quick Start (Local):

#### For Linux/macOS:
```bash
# Clone and navigate to project
cd TeleARGlass

# Ensure you have a .env file with your environment variables
# Copy from your existing .env or create one

# Option 1: Use the docker runner script (recommended)
chmod +x docker-run.sh
./docker-run.sh dev

# Option 2: Manual Docker Compose
cd docker
docker-compose up --build
```

#### For Windows:
```cmd
# Clone and navigate to project
cd TeleARGlass

# Ensure you have a .env file with your environment variables
# Copy from your existing .env or create one

# Option 1: Use the Windows batch file (recommended)
.\docker-run.bat dev

# Option 2: Use PowerShell script
.\docker-run.ps1 dev

# Option 3: Manual Docker Compose
cd docker
docker-compose up --build
```

#### Access your application:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api
- **Admin**: Internal only (not accessible from localhost)

### Local Development Commands:
```bash
# Using docker runner (from root directory)
./docker-run.sh dev          # Start local development
./docker-run.sh up           # Start services
./docker-run.sh down         # Stop services
./docker-run.sh logs         # View logs
./docker-run.sh build        # Build services

# Manual commands (from docker/ directory)
cd docker
docker-compose up -d         # Start services in background
docker-compose logs -f       # View logs
docker-compose down          # Stop services
docker-compose up --build -d # Rebuild and restart
```

### Project Structure:
```
TeleARGlass/
├── docker/                  # Docker configuration
│   ├── docker-compose.yml   # Main compose file
│   ├── docker-compose.override.yml # Local development overrides
│   ├── Dockerfile           # Multi-stage Docker build
│   ├── nginx.conf           # Production nginx config
│   ├── nginx-local.conf     # Local development nginx config
│   ├── nginx-frontend.conf  # Frontend nginx config
│   ├── deploy.sh            # Production deployment script
│   ├── dev.sh               # Local development script
│   └── setup-ssl.sh         # SSL certificate setup
├── docker-run.sh            # Easy docker command runner
├── .env                     # Environment variables
├── frontend/                # Frontend React app
├── admin/                   # Admin React app
└── backend/                 # Backend Node.js API
```

## Production Deployment (AWS Ubuntu)

### Quick Deployment:
1. **Upload your project to the AWS instance:**
   ```bash
   scp -r . ubuntu@your-aws-instance-ip:/home/ubuntu/telearglass
   ```

2. **SSH into your AWS instance:**
   ```bash
   ssh ubuntu@your-aws-instance-ip
   cd telearglass
   ```

3. **Run the AWS deployment script:**
   ```bash
   chmod +x docker/aws-deploy.sh
   ./docker/aws-deploy.sh
   ```

4. **Setup SSL (recommended):**
   ```bash
   sudo ./docker/setup-ssl.sh
   cd docker
   docker-compose --profile production up -d
   ```

### Detailed AWS Guide:
For comprehensive AWS deployment instructions, see **[AWS-DEPLOYMENT-GUIDE.md](AWS-DEPLOYMENT-GUIDE.md)**

## Manual Deployment

If you prefer to deploy manually:

1. **Install Docker and Docker Compose:**
   ```bash
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

2. **Create necessary directories:**
   ```bash
   mkdir -p logs uploads ssl
   ```

3. **Build and start the application:**
   ```bash
   cd docker
   docker-compose up --build -d
   ```

## Environment Variables

Make sure your `.env` file contains all required variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/telearglass

# JWT
JWT_SECRET=your-jwt-secret

# Cloudinary (for image uploads)
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

## Accessing the Application

### Production (AWS Ubuntu):
- **Frontend:** `https://telearglass.com`
- **API:** `https://telearglass.com/api`
- **Admin Panel:** Internal only (not exposed on domain)
- **www redirect:** `www.telearglass.com` → `telearglass.com`

### Local Development:
- **Frontend:** `http://localhost:3000`
- **API:** `http://localhost:3000/api`
- **Admin Panel:** Internal only (not accessible from localhost)

### Security Note:
The admin panel and backend are intentionally kept internal for security. They are not exposed on the domain and can only be accessed through internal Docker networking.

## Production Setup with SSL

For production with SSL and better performance:

1. **Set up SSL certificates for your domain:**
   ```bash
   # Using docker runner
   ./docker-run.sh ssl
   
   # Or manually
   cd docker
   sudo ./setup-ssl.sh
   ```

2. **Start with production profile:**
   ```bash
   cd docker
   docker-compose --profile production up -d
   ```

The SSL setup script will:
- Install certbot
- Obtain SSL certificates from Let's Encrypt for both `telearglass.com` and `www.telearglass.com`
- Set up automatic certificate renewal
- Configure proper file permissions

## Useful Commands

```bash
# Using docker runner (from root directory)
./docker-run.sh logs         # View logs
./docker-run.sh down         # Stop application
./docker-run.sh restart      # Restart application
./docker-run.sh build        # Update application

# Manual commands (from docker/ directory)
cd docker
docker-compose logs -f       # View logs
docker-compose down          # Stop application
docker-compose restart       # Restart application
docker-compose up --build -d # Update application
docker-compose ps            # View container status
docker-compose exec telearglass-backend sh # Access backend container shell
```

## Troubleshooting

### Application won't start
- Check logs: `./docker-run.sh logs` or `cd docker && docker-compose logs`
- Verify `.env` file exists and has correct variables
- Ensure ports 3000 and 4000 are not in use

### Database connection issues
- Verify MongoDB URI in `.env` file
- Check if MongoDB is accessible from the container

### Permission issues
- Ensure the user is in the docker group: `sudo usermod -aG docker $USER`
- Log out and log back in after adding to docker group

### Port conflicts
- Check if ports are already in use: `sudo netstat -tulpn | grep :3000`
- Modify ports in `docker/docker-compose.override.yml` if needed

### Local Development Issues
- **Port 3000 already in use**: Change the port in `docker/docker-compose.override.yml`
- **Frontend not loading**: Check if `telearglass-frontend` container is running
- **API calls failing**: Verify `telearglass-backend` container is healthy
- **Build failures**: Ensure `.env` file exists and has correct variables

### Windows-Specific Issues
- **"docker-run.sh not working"**: Use `.\docker-run.bat` or `.\docker-run.ps1` instead
- **"Docker Desktop not running"**: Start Docker Desktop application
- **"Cannot connect to Docker engine"**: Ensure Docker Desktop is running and started
- **"Bash not found"**: Use the Windows batch file or PowerShell script instead

## Domain Configuration

### DNS Setup
Make sure your domain DNS is properly configured:

1. **A Record:** Point `telearglass.com` to your AWS instance IP
2. **CNAME Record:** Point `www.telearglass.com` to `telearglass.com`

### AWS Security Groups
Configure your AWS Security Group to allow:
- Port 80 (HTTP) - for Let's Encrypt verification and redirects
- Port 443 (HTTPS) - for secure traffic
- Port 22 (SSH) - for server access

## Security Considerations

1. **Firewall:** Configure AWS Security Groups to only allow necessary ports (80, 443, 22)
2. **SSL:** Automatic SSL certificates with Let's Encrypt and auto-renewal
3. **Environment Variables:** Never commit `.env` file to version control
4. **Updates:** Regularly update Docker images and system packages
5. **Domain Security:** Both `telearglass.com` and `www.telearglass.com` are properly configured

## Monitoring

Monitor your application using:

```bash
# Check container health
./docker-run.sh ps
# Or: cd docker && docker-compose ps

# Monitor resource usage
docker stats

# View application logs
./docker-run.sh logs
# Or: cd docker && docker-compose logs -f
```

## Backup

Regularly backup your data:

```bash
# Backup uploads
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz uploads/

# Backup logs
tar -czf logs-backup-$(date +%Y%m%d).tar.gz logs/

# Backup SSL certificates
tar -czf ssl-backup-$(date +%Y%m%d).tar.gz ssl/
```
