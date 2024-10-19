# !/bin/bash

# Note: local postgres service must be off for nest.js server to start

source ../.env
printf "REACT_APP_TO_DO_DOMAIN_SERVER=$REACT_APP_TO_DO_DOMAIN_SERVER\nTYPEORM_HOST=localhost" > web/.env
echo "successfully created web/.env file"
docker stop react-to-do_postgres react-to-do_pgweb
make -C ../ docker-clean
echo "starting postgres and pgweb containers..."
docker compose -f docker-compose.dev.yml up -d react-to-do_postgres react-to-do_pgweb
# Start a new tmux session named 'myapps'
tmux new-session -d -s myapps
echo "starting server..."
# Run the server app in the second window
tmux send-keys -t myapps:1 "cd server && npm start" C-m
# Create a new window for the server app
tmux new-window -t myapps:1 -n 'web'
echo "starting web app..."
# Run the web app in the first window
tmux send-keys -t myapps:0 "cd web && npm start" C-m
# Attach to the tmux session
tmux attach -t myapps
