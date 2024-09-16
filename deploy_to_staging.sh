docker pull terahs/micd-webapp:latest
docker stop micd_webapp
docker rm micd_webapp
docker run --name micd_webapp --network micd_network -d terahs/micd-webapp:latest
echo "y" | docker image prune -a
