FROM node:14.16.1

WORKDIR /usr/src/api

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

CMD ["sh","-c","npm run test&&npm run start"]



