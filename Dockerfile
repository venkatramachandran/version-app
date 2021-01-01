ARG gitsha
FROM node:12-alpine AS builder
USER node
WORKDIR /app
COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY src src
RUN npm install typescript && npm run build

FROM node:12-alpine
ARG gitsha
LABEL org.opencontainers.image.source https://github.com/venkatramachandran/version-app
USER node
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --only-prod --loglevel silent
COPY --from=builder /app/build/ ./build/
EXPOSE 3000
ENV gitsha=${gitsha}
ENTRYPOINT [ "node", "build/index" ]
