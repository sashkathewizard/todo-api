# Use a lightweight Node.js image
FROM node:20-alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Install Prisma CLI globally
RUN npm install -g prisma

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Move the prisma directory into the working directory
COPY prisma /app/prisma

# Copy the rest of the application code to the working directory
COPY . .

RUN npx prisma generate

# Build the application
RUN npm run build

# Run Prisma generate, apply migrations, and then start the application
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate dev && npm start"]