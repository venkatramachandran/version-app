ARG gitsha
FROM node:12-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src src
RUN npm install
RUN npm run build

FROM node:12-alpine
LABEL org.opencontainers.image.source https://github.com/venkatramachandran/version-app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --only-prod
COPY --from=builder /app/build/ ./build/
EXPOSE 3000
ENV gitsha=${gitsha}
ENTRYPOINT [ "npm", "start" ]
