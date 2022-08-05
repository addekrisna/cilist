FROM node:lts-gallium

ENV NODE_ENV=development

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 5000

CMD [ "npm", "start" ]