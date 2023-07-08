FROM node:16-alpine

# ENV NODE_ENV=production

WORKDIR /app/client

COPY package.json .
COPY package-lock.json .

RUN npm install

RUN npm run build


COPY . .

EXPOSE 3000

CMD ["npm", "start"]