# just available in dev stage, not for production

## chmod +x run.sh for the first time only
## ./run.sh to run the application

Echo "Starting the application..."


# Start the backend
cd BE
docker-compose down
docker-compose up -d --build

# Wait for the backend to be ready

