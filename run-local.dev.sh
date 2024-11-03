# !/bin/bash

# Note: local postgres service must be off for nest.js server to start

nvm use 16

# generate .env file in web and server directories
source ../.env
printf "REACT_APP_TO_DO_SERVER_URL=$REACT_APP_TO_DO_SERVER_URL" > web/.env
printf "REACT_TO_DO_TYPEORM_HOST=$REACT_TO_DO_TYPEORM_HOST\nREACT_TO_DO_POSTGRES_PORT=$REACT_TO_DO_POSTGRES_PORT\n" > server/.env
echo "successfully created web/.env and server/.env files"

# clean docker
docker stop react-to-do_postgres react-to-do_pgweb
docker system prune -af

# run postgres and pgweb in docker
echo "starting postgres and pgweb containers..."
docker compose -f docker-compose.dev.yml --env-file ../.env up -d react-to-do_postgres react-to-do_pgweb

# run server and web locally via tmux
Start a new tmux session named 'react-to-do'
tmux new-session -d -s react-to-do

# Create a new window for the server app
tmux new-window -t react-to-do:0 -n 'server'

# Run the server app in the first window
echo "starting server..."
tmux send-keys -t react-to-do:0 "cd server && npm start" C-m

# Create a new window for the web app
tmux new-window -t react-to-do:1 -n 'web'

# Run the web app in the second window
echo "starting web app..."  
tmux send-keys -t react-to-do:1 "cd web && npm start" C-m

# Attach to the tmux session
tmux attach -t react-to-do
