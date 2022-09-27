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
![Screen Shot 2022-09-26 at 11 54 47 PM](https://user-images.githubusercontent.com/39380399/192428365-05ba425b-8548-40d2-ba2a-07bad5fe8514.png)
![Screen Shot 2022-09-26 at 11 55 14 PM](https://user-images.githubusercontent.com/39380399/192428381-16c0b59d-020d-477a-afdc-d0ec312f401b.png)
