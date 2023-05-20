FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
COPY scripts/setup.sh ./scripts/
RUN chmod u+x ./scripts/setup.sh && ./scripts/setup.sh

COPY . .

CMD ["node", "."]