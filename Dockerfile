# Use the official Microsoft Playwright image matching our package version
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Skip browser download during npm install (browsers are already built-in to the base image)
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

# Install project dependencies
RUN npm install

# Copy all project source code
COPY . .

# Run the Playwright tests (by default, running all tests in headless mode)
CMD ["npx", "playwright", "test"]
