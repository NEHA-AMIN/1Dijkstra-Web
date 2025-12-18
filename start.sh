#!/bin/bash
# ============================================
# Quick Start Script for Docker Deployment
# ============================================

set -e

echo "🚀 Dijkstra Web - Docker Quick Start"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${RED}❌ Error: .env.local file not found${NC}"
    echo ""
    echo "Please create .env.local with:"
    echo "GEMINI_API_KEY=your_api_key_here"
    echo ""
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Docker is not running${NC}"
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo -e "${GREEN}✅ Environment check passed${NC}"
echo ""

# Parse command line arguments
COMMAND=${1:-"help"}

case $COMMAND in
    "build")
        echo "📦 Building Docker image..."
        docker build -t dijkstra-web .
        echo -e "${GREEN}✅ Build complete${NC}"
        ;;
    
    "run")
        echo "🏃 Starting container..."
        docker run -d \
            --name dijkstra-web-app \
            -p 3000:3000 \
            --env-file .env.local \
            dijkstra-web
        echo -e "${GREEN}✅ Container started${NC}"
        echo ""
        echo "🌐 Access your app at: http://localhost:3000"
        echo "🏥 Health check: http://localhost:3000/api/health"
        echo "📊 Metrics: http://localhost:3000/api/metrics"
        ;;
    
    "compose")
        echo "🐳 Starting with docker-compose..."
        docker-compose up -d
        echo -e "${GREEN}✅ Services started${NC}"
        echo ""
        echo "🌐 Access your app at: http://localhost:3000"
        ;;
    
    "stop")
        echo "🛑 Stopping container..."
        docker stop dijkstra-web-app || docker-compose down
        echo -e "${GREEN}✅ Container stopped${NC}"
        ;;
    
    "logs")
        echo "📋 Showing logs..."
        docker logs -f dijkstra-web-app || docker-compose logs -f
        ;;
    
    "clean")
        echo "🧹 Cleaning up..."
        docker stop dijkstra-web-app 2>/dev/null || true
        docker rm dijkstra-web-app 2>/dev/null || true
        docker-compose down 2>/dev/null || true
        echo -e "${GREEN}✅ Cleanup complete${NC}"
        ;;
    
    "test")
        echo "🧪 Running tests..."
        npm run test:ci
        echo -e "${GREEN}✅ Tests complete${NC}"
        ;;
    
    "health")
        echo "🏥 Checking health..."
        curl -s http://localhost:3000/api/health | jq '.'
        ;;
    
    "deploy-heroku")
        echo "🚀 Deploying to Heroku..."
        heroku container:push web
        heroku container:release web
        echo -e "${GREEN}✅ Deployed to Heroku${NC}"
        heroku open
        ;;
    
    "help")
        echo "Usage: ./start.sh [command]"
        echo ""
        echo "Commands:"
        echo "  build           - Build Docker image"
        echo "  run             - Run container locally"
        echo "  compose         - Start with docker-compose"
        echo "  stop            - Stop running container"
        echo "  logs            - View container logs"
        echo "  clean           - Remove containers and cleanup"
        echo "  test            - Run test suite"
        echo "  health          - Check application health"
        echo "  deploy-heroku   - Deploy to Heroku"
        echo "  help            - Show this help message"
        echo ""
        echo "Example:"
        echo "  ./start.sh build    # Build the image"
        echo "  ./start.sh run      # Run the container"
        ;;
    
    *)
        echo -e "${RED}❌ Unknown command: $COMMAND${NC}"
        echo "Run './start.sh help' for usage information"
        exit 1
        ;;
esac
