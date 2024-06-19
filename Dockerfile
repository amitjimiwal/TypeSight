#build stage
FROM node:alpine as build
WORKDIR /web
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

#production stage
FROM nginx
COPY --from=build /web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
