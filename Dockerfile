FROM node

ENV NODE_ENV="production"

COPY . /app

WORKDIR /app

CMD [ "npm", "start" ]