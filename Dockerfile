FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
COPY scripts ./scripts
RUN chmod u+x ./scripts/docker-setup.sh && ./scripts/docker-setup.sh

COPY . .

# No CMD statement as app is started from docker-entrypoint.sh script