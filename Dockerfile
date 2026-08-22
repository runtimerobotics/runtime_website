# syntax=docker/dockerfile:1

# Shared Node dependencies
FROM node:24-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Development server with Astro/Vite hot reload
FROM dependencies AS development
WORKDIR /app
COPY . .
EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Production static build
FROM dependencies AS build
WORKDIR /app
COPY . .

ARG SITE_URL=https://runtimerobotics.com
ARG BASE_PATH=
ENV SITE_URL=${SITE_URL}
ENV BASE_PATH=${BASE_PATH}

RUN npm run build

# Small production-like static web server
FROM nginx:1.27-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
