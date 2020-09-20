#bz-build bz-deploy-uat
FROM node:10-alpine as build-stage
WORKDIR /react
COPY package.json /react/
RUN npm --registry http://nexus.10.100.60.228.nip.io/repository/npm-group/ install -f --silence

COPY ./ /react/
RUN npm run build

FROM nginx:1.19.1-alpine
COPY --from=build-stage /react/build/ /usr/share/nginx/html/SwaggerUI
COPY ./nginx.conf etc/nginx/conf.d/default.conf
