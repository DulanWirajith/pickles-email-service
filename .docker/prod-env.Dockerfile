FROM node:16.15.0-alpine As development
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install --only=development
COPY . .
RUN npx prisma generate
#RUN npx prisma migrate deploy
RUN yarn build

FROM node:16.15.0-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV} NODE_OPTIONS=--max_old_space_size=2048
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install --only=production
COPY .env ./
RUN ls
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]
