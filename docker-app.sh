#!/bin/sh
# ENVIRONEMTN from docker-compose.yaml doesn't get through to subprocesses
# Need to explicit pass DATABASE_URL here, otherwise migration doesn't work
# Run migrations
DATABASE_URL="postgres://postgres:admin@postgres:5432/smarthome_db?schema=public" npx prisma migrate deploy
# start app
DATABASE_URL="postgres://postgres:admin@postgres:5432/smarthome_db?schema=public" node server.js