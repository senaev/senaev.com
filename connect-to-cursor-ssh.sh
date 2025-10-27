# "Remote - SSH" cursor plugin is needed to run this script
SSH_CONF='{"hostName":"ubuntu@51.250.80.209 -p 22"}'
SSH_HEX_CONF=$(printf "$SSH_CONF" | od -A n -t x1 | tr -d '[\n\t ]')
cursor --folder-uri vscode-remote://ssh-remote+${SSH_HEX_CONF}/home/ubuntu