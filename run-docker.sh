# !/bin/bash

source .env
echo REACT_APP_TO_DO_DOMAIN_SERVER=$REACT_APP_TO_DO_DOMAIN_SERVER > web/.env
echo '****************************** debug web/.env *********************'
cat web/.env
echo '****************************** debug web/.env **********************'
sudo docker-compose up --build -d