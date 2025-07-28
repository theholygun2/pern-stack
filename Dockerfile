# Frontend stage
FROM node:22 AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Backend stage
FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY --from=frontend-builder /app/dist ./frontend/dist
CMD ["node", "server.js"]
