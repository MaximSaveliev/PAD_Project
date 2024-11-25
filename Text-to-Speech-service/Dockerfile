# Text-to-Speech Dockerfile
FROM python:3.11-alpine

# Set working directory
WORKDIR /app

# Install dependencies
RUN apk add --no-cache gcc musl-dev libffi-dev python3-dev openssl-dev
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose the port
EXPOSE 8002

# Start the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8002", "--reload"]
