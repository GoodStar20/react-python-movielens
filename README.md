# challenge-eng-base

This starter kit supports `React` for the frontend and `Python`for the backend.

To get the project up and running:
1. Install Docker https://docs.docker.com/engine/installation/
2. In a terminal, go to the directory `challenge-eng-base-master`
3. For a backend project
    a. `docker-compose up backend`
    b. Test that it's running http://localhost:8080/test
4. For a fullstack project
    a. `docker-compose up backend site`
    b. Test that backend s running http://localhost:8080/test
    c. Test that frontend/site is running http://localhost:8090/test
       The hostname/port may be different for the frontend depending on your
       OS/docker setup. See the log messages from service startup.   

To restart the project:

    docker-compose down
    docker-compose up backend or docker-compose up backend site

Starting the backend service automatically starts the mariadb database service
as a dependency.

To see schema changes in the db, remove the old db volume by adding `-v` when
stopping:

    docker-compose down -v

If you run into issues connecting to the db on startup, try restarting (without
the `-v` flag).

To execute the data load cli command:

    docker-compose exec backend flask load-movielens


Code changes should trigger live reload of the docker services in the docker
containers by way of the volume binds specified in the compose file.
