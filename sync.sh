ssh new-sampledge \
  'cd /home/ubuntu/Projects/turn2opinion && docker compose exec -T db mongodump --archive --gzip' \
  | docker compose exec -T db mongorestore --archive --gzip --drop