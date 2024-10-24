# !/bin/bash

# generate .env file in web directory (need to do this when pushing image to docker hub bc React loads env at build time)
source .env # .env file will be in root directory (github workflow)
printf "REACT_APP_TO_DO_SERVER_URL=$REACT_APP_TO_DO_SERVER_URL" > web/.env
echo "successfully created web/.env file"
# build for github workflow that pushes images to docker hub
sudo docker compose build