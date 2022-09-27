# Movielens (React, Python, Flask)

## Getting Started

Install Docker https://docs.docker.com/engine/installation/

### Clone this repo

```bash
$ git clone https://https://github.com/GoodStar20/react-python-movielens
```

```bash
$ cd react-python-movielens
$ docker-compose up backend site
```

To download MovieLens dataset `ml-latest-small.zip` from https://grouplens.org/datasets/movielens/latest/ and store zip data into database.

```bash
docker-compose exec backend flask load-movielens
```

## Run Project

http://localhost:8090
