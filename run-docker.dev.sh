# !/bin/bash

source ../.env
echo REACT_APP_TO_DO_DOMAIN_SERVER=$REACT_APP_TO_DO_DOMAIN_SERVER > web/.env
sudo docker compose -f docker-compose.dev.yml up --build -d