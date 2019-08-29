##########################
# BUILD THE MICROSERVICE #
##########################
FROM node:12.9-alpine AS builder

## Install OS dependencies
RUN apk add --update alpine-sdk cmake linux-headers python2

## Copy files
COPY server .
COPY package.json .

## Install microservice dependencies and build code
RUN yarn --silent
RUN yarn build --silent

##########################
# COPY THE FILES AND RUN #
##########################
FROM node:12.9-alpine

## Copy files
COPY --from=builder dist .
COPY --from=builder node_modules .

EXPOSE 3000

CMD [ "yarn", "start" ]