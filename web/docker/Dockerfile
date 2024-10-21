# Step 1: Build the React app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Step 2: Create the final image
FROM nginx:alpine

# Install curl
RUN apk add --no-cache curl

# Copy local nginx config file(s) into the container
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the build output to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port on which Nginx will run
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
