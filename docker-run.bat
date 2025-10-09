@echo off
REM TeleARGlass Docker Runner (Windows Batch)
REM This script provides easy access to docker commands from the root directory

cd docker

REM Check if .env file exists
if not exist "..\.env" (
    echo [WARNING] .env file not found in root directory!
    echo [WARNING] Please create a .env file with your environment variables.
    exit /b 1
)

echo [TeleARGlass Docker] Running Docker commands from docker/ directory

if "%1"=="" (
    echo [INFO] Available commands:
    echo   docker-run.bat dev          - Start local development
    echo   docker-run.bat deploy       - Deploy to production
    echo   docker-run.bat up           - Start services
    echo   docker-run.bat down         - Stop services
    echo   docker-run.bat logs         - View logs
    echo   docker-run.bat build        - Build services
    echo   docker-run.bat ssl          - Setup SSL certificates
    echo   docker-run.bat ^<command^>    - Run any docker-compose command
    exit /b 0
)

if "%1"=="dev" (
    echo [INFO] Starting local development environment...
    docker-compose up --build
) else if "%1"=="deploy" (
    echo [INFO] Deploying to production...
    echo [WARNING] For production deployment, please use bash deploy.sh
    echo [INFO] Running docker-compose directly...
    docker-compose up --build -d
) else if "%1"=="ssl" (
    echo [INFO] Setting up SSL certificates...
    echo [WARNING] SSL setup requires bash and sudo. Please run manually:
    echo cd docker
    echo sudo bash setup-ssl.sh
) else (
    echo [INFO] Running: docker-compose %*
    docker-compose %*
)

