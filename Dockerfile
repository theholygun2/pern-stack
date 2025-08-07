# Frontend stage
FROM node:22 AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .

# Add this line to define a build-time argument
ARG VITE_ENV_MODE=production

# Use the argument to tell Vite which mode to build for
RUN npm run build -- --mode $VITE_ENV_MODE

# Backend stage
FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY --from=frontend-builder /app/dist ./frontend/dist
CMD ["node", "server.js"]