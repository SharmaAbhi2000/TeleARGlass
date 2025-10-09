# TeleARGlass Project Structure

This document outlines the organized structure of the TeleARGlass project after cleanup and organization.

## 📁 Root Directory Structure

```
TeleARGlass/
├── 📁 admin/                    # Admin React application
├── 📁 backend/                  # Backend Node.js API
├── 📁 frontend/                 # Frontend React application
├── 📁 docker/                   # Docker configuration and scripts
├── 📄 .env                      # Environment variables (your existing file)
├── 📄 .dockerignore             # Docker ignore file
├── 📄 docker-run.sh             # Easy docker command runner
├── 📄 README-DEPLOYMENT.md      # Complete deployment guide
└── 📄 PROJECT-STRUCTURE.md      # This file
```

## 🐳 Docker Directory Structure

```
docker/
├── 📄 docker-compose.yml        # Main Docker Compose configuration
├── 📄 docker-compose.override.yml # Local development overrides
├── 📄 Dockerfile                # Multi-stage Docker build
├── 📄 nginx.conf                # Production nginx configuration
├── 📄 nginx-local.conf          # Local development nginx configuration
├── 📄 nginx-frontend.conf       # Frontend nginx configuration
├── 📄 deploy.sh                 # Production deployment script
├── 📄 dev.sh                    # Local development script
└── 📄 setup-ssl.sh              # SSL certificate setup script
```

## 🚀 Quick Commands

### Local Development
```bash
# Start local development
./docker-run.sh dev

# View logs
./docker-run.sh logs

# Stop services
./docker-run.sh down
```

### Production Deployment
```bash
# Deploy to production
./docker-run.sh deploy

# Setup SSL certificates
./docker-run.sh ssl
```

## 🔧 Architecture

- **Frontend**: Exposed on domain (`https://telearglass.com`)
- **Backend + Admin**: Internal only (not exposed on domain)
- **API**: Accessible through frontend domain (`https://telearglass.com/api/*`)

## 📋 Key Features

✅ **Organized Structure**: All Docker files in dedicated directory  
✅ **Easy Commands**: Simple `docker-run.sh` script for common tasks  
✅ **Local Development**: Works seamlessly on local machines  
✅ **Production Ready**: Complete AWS Ubuntu deployment setup  
✅ **Secure Architecture**: Only frontend exposed, backend/admin internal  
✅ **SSL Support**: Automatic Let's Encrypt certificate setup  
✅ **Domain Support**: Works with `telearglass.com` and `www.telearglass.com`  

## 🗑️ Cleaned Up

- Removed unnecessary environment files
- Organized all Docker-related files into `docker/` directory
- Created easy-to-use runner script
- Updated all file references and paths
- Comprehensive documentation

## 📖 Documentation

- **README-DEPLOYMENT.md**: Complete deployment and development guide
- **PROJECT-STRUCTURE.md**: This file - project organization overview
- All scripts include helpful comments and error handling

