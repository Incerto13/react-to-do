# !/bin/bash

# Note: local postgres service must be off for nest.js server to start

source ../.env
printf "REACT_APP_TO_DO_DOMAIN_SERVER=$REACT_APP_TO_DO_DOMAIN_SERVER\nTYPEORM_HOST=localhost" > web/.env
echo "successfully created web/.env file"
docker stop react-to-do_postgres react-to-do_pgweb
make -C ../ docker-clean
echo "starting postgres and pgweb containers..."
docker compose -f docker-compose.dev.yml up -d react-to-do_postgres react-to-do_pgweb
Start a new tmux session named 'myapps'
tmux new-session -d -s myapps
# Create a new window for the server app
tmux new-window -t myapps:0 -n 'server'
# Run the server app in the first window
echo "starting server..."
tmux send-keys -t myapps:0 "cd server && npm start" C-m
# Create a new window for the web app
tmux new-window -t myapps:1 -n 'web'
# Run the web app in the second window
echo "starting web app..."  
tmux send-keys -t myapps:1 "cd web && npm start" C-m
# Attach to the tmux session
tmux attach -t myapps
