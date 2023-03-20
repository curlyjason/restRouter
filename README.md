# restRouter
Node and Express router experiment

command line template to build the image (with a tag)
 docker build --tag router-nm .

command line template to run container after build (with mount)
docker run -d -it --mount type=bind,source=/Users/dondrake/Sites/restRouter/working/,target=/output -p 8088:8080 router-v4

command line template to restart a container
docker restart fervent_swirles


