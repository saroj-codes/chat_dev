###### BUILDER STAGE #######

FROM node:22-alpine as BUILDER 
WORKDIR /app
COPY ../../package.json ../../yarn.lock ./
RUN yarn install 
COPY . . 
RUN yarn build:frontend

##### RUNNER STAGE ######

FROM node:22-alpine as RUNNER
COPY --from=BUILDER /app/dist/frontend ./
EXPOSE 3000
CMD [ "yarn", "start" ]
