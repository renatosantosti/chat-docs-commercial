FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
#Copy - temporaly sqlite db to image
# COPY *.sqlite ./ 
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
#Copy - temporaly sqlite db to image
# COPY *.sqlite ./ 
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

EXPOSE 8000

CMD ["sh", "-c", "echo 'starting app...'; npm start; sleep 1000"]
