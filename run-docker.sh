# !/bin/bash

source .env
printf "REACT_APP_TO_DO_DOMAIN_SERVER=$REACT_APP_TO_DO_DOMAIN_SERVER\nTYPEORM_HOST=react-to-do_postgres" > web/.env
echo "successfully created web/.env file"
sudo docker compose up --build -d