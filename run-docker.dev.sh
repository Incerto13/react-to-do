# !/bin/bash

# generate .env file in web directory
source ../.env
printf "REACT_APP_TO_DO_DOMAIN_SERVER=$REACT_APP_TO_DO_DOMAIN_SERVER\nTYPEORM_HOST=react-to-do_postgres" > web/.env
echo "successfully created web/.env file"

# clean docker
docker stop react-to-do_postgres react-to-do_pgweb react-to-do_server react-to-do_web
docker system prune -af

# run all containers in docker
echo "starting postgres, pgweb, react-to-do_server and react-to-do_web containers..."
sudo docker compose -f docker-compose.dev.yml up --build -d

