#!/bin/bash

echo "Starting backend services..."
docker compose -f compose.backend.yaml up -d

echo "Waiting for backend services to be ready..."
sleep 30  # Adjust this time as needed

echo "Starting presentation layer..."
docker compose -f compose.frontend.yaml up -d

echo "All services are now running!"