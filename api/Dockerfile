FROM node:16-alpine

# ENV NODE_ENV=production

WORKDIR /app/api

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npm run build

COPY . .

EXPOSE 8000

CMD ["node", "dist/main"]
