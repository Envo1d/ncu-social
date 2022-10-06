FROM node:18.9.0 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json yarn.lock nest-cli.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN yarn

COPY . .

RUN yarn build

FROM node:18.9.0

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/nest-cli.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 7070
CMD [ "yarn", "start:prod:prisma" ]