FROM node:alpine as builder
WORKDIR /build/frontend
# copy package jsons
COPY package.json yarn.lock ./
COPY zstat-frontend/package.json zstat-frontend/yarn.lock ./zstat-frontend/
# install deps
RUN yarn --frozen-lockfile
# copy source
COPY tsconfig.json .
WORKDIR /build/frontend/zstat-frontend
COPY zstat-frontend/tsconfig.json .
COPY zstat-frontend/webpack webpack
COPY zstat-frontend/src src
# build 
RUN yarn build

# nginx deployment
FROM nginx:alpine
COPY --from=builder /build/frontend/zstat-frontend/dist /var/www/html
# copy nginx configuration
RUN rm -rf /etc/nginx/conf.d && mkdir -p /etc/nginx/conf.d
COPY zstat-frontend/nginx.conf /etc/nginx/conf.d/zstat.conf
# test configuration
RUN nginx -t
