# Docker Setup for Qayyum's Portfolio

This Next.js portfolio application can be run using Docker for easy deployment and development.

## Prerequisites

- Docker Desktop installed on your machine
- Docker Compose (included with Docker Desktop)

## Quick Start

### Production Build

1. **Build and run the production container:**
   ```bash
   docker-compose up --build qayyum-portfolio
   ```

2. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`

### Development Setup

1. **Run in development mode:**
   ```bash
   docker-compose --profile dev up --build qayyum-portfolio-dev
   ```

2. **Access the development server:**
   Open your browser and navigate to `http://localhost:3001`

## Available Commands

### Production
```bash
# Build and start production container
docker-compose up --build qayyum-portfolio

# Start production container in background
docker-compose up -d qayyum-portfolio

# Stop production container
docker-compose down
```

### Development
```bash
# Build and start development container
docker-compose --profile dev up --build qayyum-portfolio-dev

# Start development container in background
docker-compose --profile dev up -d qayyum-portfolio-dev

# Stop development container
docker-compose --profile dev down
```

### Docker Commands (Alternative)
```bash
# Build production image
docker build -t qayyum-portfolio .

# Run production container
docker run -p 3000:3000 --name qayyum-portfolio qayyum-portfolio

# Build development image
docker build -f Dockerfile.dev -t qayyum-portfolio-dev .

# Run development container with volume mounting
docker run -p 3001:3000 -v $(pwd):/app -v /app/node_modules --name qayyum-portfolio-dev qayyum-portfolio-dev
```

## Environment Variables

Create a `.env.local` file in the project root for environment-specific variables:

```env
# Example environment variables
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Qayyum Portfolio
OPENROUTER_API_KEY=your_api_key_here
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
   - Change the port mapping in `docker-compose.yml`
   - Or stop any existing processes using ports 3000/3001

2. **Build failures:**
   - Clear Docker cache: `docker system prune -a`
   - Rebuild without cache: `docker-compose build --no-cache`

3. **File changes not reflected (development):**
   - Ensure volume mounting is working correctly
   - Restart the development container

### Logs

View container logs:
```bash
# Production logs
docker-compose logs qayyum-portfolio

# Development logs
docker-compose logs qayyum-portfolio-dev

# Follow logs in real-time
docker-compose logs -f qayyum-portfolio
```

## Production Deployment

For production deployment, you can:

1. **Build and push to a registry:**
   ```bash
   docker build -t your-registry/qayyum-portfolio:latest .
   docker push your-registry/qayyum-portfolio:latest
   ```

2. **Deploy to cloud platforms:**
   - Use the provided Dockerfile for platforms like Railway, Render, or DigitalOcean
   - Configure environment variables in your deployment platform
   - Set up proper domain and SSL certificates

## Performance Optimization

The Docker setup includes several optimizations:
- Multi-stage builds to reduce image size
- Alpine Linux base for smaller footprint
- Proper layer caching for faster builds
- Security best practices with non-root user

## Contact

For any Docker-related issues, please contact:
- Email: qayyumbokhari77@gmail.com
- GitHub: https://github.com/moqayyubok