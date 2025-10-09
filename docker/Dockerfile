# Multi-stage Dockerfile for TeleARGlass Application
# Frontend: Exposed on domain
# Backend + Admin: Internal only

# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
# Use Docker-specific environment file for build
COPY frontend/.env.docker ./.env
# Set environment variable for dynamic host detection
ENV VITE_BACKEND_URL=AUTO_DETECT
RUN npm run build

# Stage 2: Build Admin
FROM node:18-alpine AS admin-builder
WORKDIR /app/admin
COPY admin/package*.json ./
RUN npm ci
COPY admin/ ./
RUN npm run build

# Stage 3: Frontend Image (Exposed on domain)
FROM node:18-alpine AS frontend
WORKDIR /app
RUN npm install -g serve
COPY --from=frontend-builder /app/frontend/dist ./dist
EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]

# Stage 4: Admin Image (Internal only)
FROM node:18-alpine AS admin
WORKDIR /app
RUN npm install -g serve
COPY --from=admin-builder /app/admin/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]

# Stage 5: Backend Image (Internal only)
FROM node:18-alpine AS backend

# Install system dependencies
RUN apk add --no-cache \
    dumb-init \
    && addgroup -g 1001 -S nodejs \
    && adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install backend dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy backend source code
COPY backend/ ./

# Create a proper server.js file with line breaks
RUN echo 'import express from "express"' > server.js && \
    echo 'import cors from "cors"' >> server.js && \
    echo 'import "dotenv/config"' >> server.js && \
    echo 'import connectDB from "./config/mongodb.js"' >> server.js && \
    echo 'import connectCloudinary from "./config/cloudinary.js"' >> server.js && \
    echo 'import userRouter from "./routes/userRoute.js"' >> server.js && \
    echo 'import productRouter from "./routes/productRoute.js"' >> server.js && \
    echo 'import cartRouter from "./routes/cartRoute.js"' >> server.js && \
    echo 'import orderRouter from "./routes/orderRoute.js"' >> server.js && \
    echo 'import { jobRouter } from "./routes/jobRouter.js"' >> server.js && \
    echo 'import { contactRouter } from "./routes/contact.js"' >> server.js && \
    echo '' >> server.js && \
    echo '// App Config' >> server.js && \
    echo 'const app = express()' >> server.js && \
    echo 'const port = process.env.PORT || 4000' >> server.js && \
    echo 'connectDB()' >> server.js && \
    echo 'connectCloudinary()' >> server.js && \
    echo '' >> server.js && \
    echo '// middlewares' >> server.js && \
    echo 'app.use(express.json())' >> server.js && \
    echo 'app.use(cors())' >> server.js && \
    echo '' >> server.js && \
    echo '// api endpoints' >> server.js && \
    echo 'app.use("/api/user", userRouter)' >> server.js && \
    echo 'app.use("/api/product", productRouter)' >> server.js && \
    echo 'app.use("/api/cart", cartRouter)' >> server.js && \
    echo 'app.use("/api/order", orderRouter)' >> server.js && \
    echo 'app.use("/api/v1/application", jobRouter)' >> server.js && \
    echo 'app.use("/api/v1/contact", contactRouter)' >> server.js && \
    echo '' >> server.js && \
    echo '// API health check' >> server.js && \
    echo 'app.get("/", (req, res) => {' >> server.js && \
    echo '  res.json({ message: "Backend API is running", status: "ok" })' >> server.js && \
    echo '})' >> server.js && \
    echo '' >> server.js && \
    echo 'app.listen(port, () => console.log("Backend server started on PORT : " + port))' >> server.js

# Admin is now served separately

# Create a startup script
RUN echo '#!/bin/sh' > start.sh && \
    echo 'set -e' >> start.sh && \
    echo 'echo "Starting Backend (Internal)..."' >> start.sh && \
    echo 'node server.js' >> start.sh && \
    chmod +x start.sh

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["./start.sh"]
