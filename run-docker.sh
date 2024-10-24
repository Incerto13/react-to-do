# !/bin/bash

source .env
printf "REACT_APP_TO_DO_SERVER_URL=$REACT_APP_TO_DO_SERVER_URL\nTYPEORM_HOST=react-to-do_postgres" > web/.env
echo "successfully created web/.env file"
sudo docker compose up --build -d