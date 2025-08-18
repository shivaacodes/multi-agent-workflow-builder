# Use Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock file first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose frontend port
EXPOSE 3000

# Run Next.js dev server
CMD ["npm", "run", "dev"]
