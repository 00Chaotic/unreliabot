# Unreliabot

A multipurpose, personal Twitch chatbot.

# First Checkout

Make a copy of the `.env.sample` file and rename to `.env` using `$ cp .env.sample .env` and fill out the relevant fields.

# Running the project

Simply run the project through docker:

```
docker-compose up --build -d
```

The `app` container waits until the `postgres` database is accepting connections before starting, and then runs migrations automatically.
