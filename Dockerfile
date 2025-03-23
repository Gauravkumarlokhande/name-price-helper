# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

# Expose the Vite default port (5173) for development
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]
