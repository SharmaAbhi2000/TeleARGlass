# TeleARGlass Docker Runner (PowerShell)
# This script provides easy access to docker commands from the root directory

param(
    [Parameter(Position=0)]
    [string]$Command = ""
)

# Colors for output
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"

function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Green
}

function Write-Header {
    param([string]$Message)
    Write-Host "[TeleARGlass Docker] $Message" -ForegroundColor $Blue
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Yellow
}

# Change to docker directory
Set-Location docker

# Check if .env file exists
if (-not (Test-Path "../.env")) {
    Write-Warning ".env file not found in root directory!"
    Write-Warning "Please create a .env file with your environment variables."
    exit 1
}

Write-Header "Running Docker commands from docker/ directory"

# Execute the command passed as arguments
if ([string]::IsNullOrEmpty($Command)) {
    Write-Status "Available commands:"
    Write-Host "  .\docker-run.ps1 dev          - Start local development"
    Write-Host "  .\docker-run.ps1 deploy       - Deploy to production"
    Write-Host "  .\docker-run.ps1 up           - Start services"
    Write-Host "  .\docker-run.ps1 down         - Stop services"
    Write-Host "  .\docker-run.ps1 logs         - View logs"
    Write-Host "  .\docker-run.ps1 build        - Build services"
    Write-Host "  .\docker-run.ps1 ssl          - Setup SSL certificates"
    Write-Host "  .\docker-run.ps1 <command>    - Run any docker-compose command"
    exit 0
}

switch ($Command.ToLower()) {
    "dev" {
        Write-Status "Starting local development environment..."
        if (Test-Path "dev.sh") {
            # Try to run with bash if available, otherwise show instructions
            try {
                bash ./dev.sh
            } catch {
                Write-Warning "Bash not available. Please run manually:"
                Write-Host "cd docker"
                Write-Host "docker-compose up --build"
            }
        } else {
            Write-Warning "dev.sh not found. Running docker-compose directly..."
            docker-compose up --build
        }
    }
    "deploy" {
        Write-Status "Deploying to production..."
        if (Test-Path "deploy.sh") {
            Write-Warning "deploy.sh requires bash. Please run manually:"
            Write-Host "cd docker"
            Write-Host "bash deploy.sh"
        } else {
            Write-Warning "deploy.sh not found. Running docker-compose directly..."
            docker-compose up --build -d
        }
    }
    "ssl" {
        Write-Status "Setting up SSL certificates..."
        if (Test-Path "setup-ssl.sh") {
            Write-Warning "setup-ssl.sh requires bash and sudo. Please run manually:"
            Write-Host "cd docker"
            Write-Host "sudo bash setup-ssl.sh"
        } else {
            Write-Warning "setup-ssl.sh not found."
        }
    }
    default {
        Write-Status "Running: docker-compose $Command"
        docker-compose $Command
    }
}

