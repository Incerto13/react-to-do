# !/bin/bash

# Start a new tmux session named 'myapps'
tmux new-session -d -s myapps

# Run the server app in the second window
tmux send-keys -t myapps:1 "cd server && npm start" C-m

# Create a new window for the server app
tmux new-window -t myapps:1 -n 'web'

# Run the web app in the first window
tmux send-keys -t myapps:0 "cd web && npm start" C-m

# Attach to the tmux session
tmux attach -t myapps