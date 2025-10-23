# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (needed for build)
RUN npm ci

# Copy application source
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm prune --production && npm cache clean --force

# Expose port 5000
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production
ENV PORT=5000

# Start the application
CMD ["npm", "run", "start"]
