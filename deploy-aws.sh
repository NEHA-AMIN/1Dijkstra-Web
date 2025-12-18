#!/bin/bash
# ============================================
# AWS Elastic Beanstalk Deployment Script
# ============================================

set -e

echo "🚀 Deploying to AWS Elastic Beanstalk..."

# Check if EB CLI is installed
if ! command -v eb &> /dev/null; then
    echo "❌ EB CLI not found. Installing..."
    pip install awsebcli --upgrade --user
fi

# Initialize EB if not already done
if [ ! -d ".elasticbeanstalk" ]; then
    echo "📦 Initializing Elastic Beanstalk..."
    eb init -p docker dijkstra-web --region us-east-1
fi

# Create environment if it doesn't exist
if ! eb list | grep -q "dijkstra-web-prod"; then
    echo "🌍 Creating production environment..."
    eb create dijkstra-web-prod \
        --instance-type t3.micro \
        --single \
        --envvars NODE_ENV=production
else
    echo "♻️  Deploying to existing environment..."
    eb deploy dijkstra-web-prod
fi

echo "✅ Deployment complete!"
echo "🔗 Access your app at: $(eb status dijkstra-web-prod | grep CNAME | awk '{print $2}')"
