FROM node:20-alpine
# create system user to run th app
RUN  addgroup app && adduser -S -G app app
# change the user
USER app

# set working directory

WORKDIR /app

# copy necessary files to current director

COPY package*.json ./

# change user back to root user to avoid access denied

USER root

#change directory ownership to app user

RUN chown -R  app:app .

# change back to user
USER app

RUN  npm install

COPY . .

EXPOSE 5173
# cmd

CMD ["npm","run","start"]
