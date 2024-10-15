FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV REACT_APP_API_URL="http://localhost:5010"
ENV NODE_ENV=development

CMD ["npm", "start"]
