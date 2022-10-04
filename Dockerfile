#Layer 1: link to NodeJS official docker image
FROM node:12

#Layer 2
WORKDIR /app

#Layer 3: prepare dependencies
#COPY local package.json path, destination of package.json in the container
COPY package*.json ./

#Layer 4: install dependencies
RUN npm install

#Layer 5: copy the source code into container
COPY . .

#Layer 6: set port
ENV PORT=3000

#Layer 7: expose port
EXPOSE 3000

#Layer 8: run app into container
CMD [ "npm", "start" ]