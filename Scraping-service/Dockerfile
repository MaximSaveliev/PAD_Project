# Scraping Dockerfile
FROM python:3.11-alpine

# Set working directory
WORKDIR /app

# Install dependencies
RUN apk add --no-cache gcc musl-dev libffi-dev python3-dev openssl-dev
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port (if needed, not applicable here)
EXPOSE 8080

# Define as a passive container
CMD ["sleep", "infinity"]
