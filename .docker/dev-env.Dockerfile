FROM node:16.15.0-alpine
ENV NODE_ENV=development NODE_OPTIONS=--max_old_space_size=2048
WORKDIR /app
COPY package*.json ./
COPY yarn*.lock ./
RUN yarn
RUN npx prisma generate
COPY . .
EXPOSE 3000
CMD ["yarn", "start:dev"]
