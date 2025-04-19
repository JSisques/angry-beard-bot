# Stage 1: Build
FROM node:18-alpine AS builder

# Create working directory
WORKDIR /app

# Copy dependency files
COPY ../../yarn.lock ../../package.json ./

# Install dependencies
RUN yarn install

# Copy rest of project
COPY ../../ .

# Build application
RUN yarn build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from build stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Default Nest port
EXPOSE 3000

# Command to start app
CMD ["node", "dist/main"]
