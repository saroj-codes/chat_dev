###### BUILDER STAGE ######

FROM node:22-alpine As BUILDER
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . . 
RUN npx nx reset
RUN yarn build:backend 

##### RUNNER STAGE #####

FROM node:22-alpine As RUNNER
COPY --from=BUILDER /app/node_modules ./node_modules
COPY --from=BUILDER /app/dist/apps/backend ./
EXPOSE 8080
CMD [ "node", "main.js" ]

