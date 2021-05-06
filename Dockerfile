FROM node:14
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production --silent
COPY ./dist/ ./dist/
EXPOSE 8081
CMD ["npm", "start"]
