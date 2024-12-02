FROM node:20-alpine 
WORKDIR /app

COPY package*.json ./
COPY . .

RUN yarn 

ENV PORT = 50100
EXPOSE 50100

CMD ["yarn", "ndemon"]