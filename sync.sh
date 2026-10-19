ssh new-sampledge \
  'cd /home/ubuntu/Projects/turn2opinion && docker compose exec -T db mongodump --archive --gzip' \
  | docker compose exec -T db mongorestore --archive --gzip --drop

docker compose exec -T db mongosh turn2opinion --quiet --eval '
db.getCollectionNames().forEach((collection) => {
  db.getCollection(collection).updateMany(
    {},
    { $set: { origin: "t2o.sampledge.duckdns.org" } }
  );
  print(`Updated collection: ${collection}`);
});'