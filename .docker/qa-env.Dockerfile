FROM node:16.15.0-alpine As development
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
RUN npx prisma generate
COPY env.qa ./.env
RUN yarn build

#RUN npm install pm2 -g
#ENV PM2_PUBLIC_KEY r225s5hppuvqy05
#ENV PM2_SECRET_KEY 1868cnzeditsg9t
#
#CMD ["pm2-runtime", "dist/main.js", "--name va-api-qa"]
#CMD ["node", "dist/main"]
CMD [ "npm", "run" , "start:prod" ]
