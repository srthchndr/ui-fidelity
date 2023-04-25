# FROM node as build

# WORKDIR /app

# COPY package*.json ./
# RUN npm install
# COPY ./ ./

# EXPOSE 3000

# CMD ["npm", "start"]
FROM node as build

WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .

RUN npm run build
FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
