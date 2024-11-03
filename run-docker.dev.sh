# !/bin/bash

# generate .env file in web directory
source ../.env
printf "REACT_APP_TO_DO_SERVER_URL=$REACT_APP_TO_DO_SERVER_URL" > web/.env
# printf "REACT_TO_DO_TYPEORM_HOST=$REACT_TO_DO_TYPEORM_HOST\nREACT_TO_DO_POSTGRES_PORT=$REACT_TO_DO_POSTGRES_PORT\n" > server/.env
echo "successfully created web/.env and server/.env files"

# clean docker
docker stop react-to-do_postgres react-to-do_pgweb react-to-do_server react-to-do_web
docker system prune -af

# run all containers in docker
echo "starting postgres, pgweb, react-to-do_server and react-to-do_web containers..."
sudo docker compose -f docker-compose.dev.yml --env-file ../.env up -d

