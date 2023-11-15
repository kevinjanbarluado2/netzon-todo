# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Expose the port that your Vite application will run on
EXPOSE 8000

# Run npm run dev when the container launches
CMD ["npm", "run", "dev", "--host", "0.0.0.0"]
