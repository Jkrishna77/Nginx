# Use latest LTS version of Node
FROM node:20

# Set working directory
WORKDIR /app

# Copy only package files first (for caching dependencies)
COPY package.json .

# Install dependencies
RUN npm install

# Copy rest of the application
COPY server.js .
COPY index.html .
COPY images ./images

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
