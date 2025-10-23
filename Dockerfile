# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (needed for both build and runtime)
# Note: vite and other build tools are imported by the server code
RUN npm ci && npm cache clean --force

# Copy application source
COPY . .

# Build the application (builds frontend and bundles backend)
RUN npm run build

# Expose port 5000
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production
ENV PORT=5000

# Start the application
CMD ["npm", "run", "start"]
