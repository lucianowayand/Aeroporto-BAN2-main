FROM node:latest

# Create app directory
WORKDIR /src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json .

RUN npm install

# Bundle app source
COPY . .

#RUN npx prisma migrate dev

EXPOSE 5000
CMD [ "npm", "start" ]
