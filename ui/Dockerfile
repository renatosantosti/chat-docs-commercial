FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .

# Copy the custom nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy env template to correct location
COPY ./env.js.template ./env.template.js

# Install envsubst
RUN apk add --no-cache gettext

EXPOSE 8080

ENTRYPOINT []
CMD ["/bin/sh", "-c", "envsubst < ./env.template.js > ./env.js && nginx -g 'daemon off;'"]
