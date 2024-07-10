###### BUILDER STAGE ######

FROM node:22-alpine As BUILDER
WORKDIR /app
COPY ../../package.json ../../yarn.lock ./
RUN yarn install
COPY . . 
RUN yarn build:frontend

##### RUNNER STAGE #####

FROM node:22-alpine As RUNNER
COPY --from=BUILDER /app/dist/frontend ./
CMD [ "node", "main.js" ]

