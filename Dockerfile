# Use Node image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose Angular dev server port
EXPOSE 4200

# Start Angular
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
