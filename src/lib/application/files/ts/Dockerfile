FROM registry.gviet.vn:5000/library/node:14.16-alpine as builder

WORKDIR /app
COPY . /app
RUN yarn && yarn prebuild && yarn build

############

FROM registry.gviet.vn:5000/library/node:14.16-alpine as installer

WORKDIR /app
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
RUN yarn install --prod

#############

FROM registry.gviet.vn:5000/library/node:14.16-alpine

WORKDIR /app
COPY config /app/config
# COPY package.json /app
# COPY yarn.lock /app
COPY --from=installer /app /app
# RUN yarn install --prod

COPY  --from=builder /app/dist /app/dist
ENTRYPOINT ["yarn", "start:prod"]