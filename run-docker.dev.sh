# !/bin/bash

source ../.env
echo REACT_APP_TO_DO_DOMAIN_SERVER=$REACT_APP_TO_DO_DOMAIN_SERVER TYPEORM_HOST=react-to-do_postgres > web/.env
sudo docker compose -f docker-compose.dev.yml up --build -d