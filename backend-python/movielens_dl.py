import flask
import argparse
import pathlib
import tempfile
from zipfile import ZipFile
import pymysql
import os
import requests
import shutil
import csv

db = pymysql.connect(
    user="root",
    password="testpass",
    host="db",
    database="challenge",
)
cur = db.cursor()

MOVIELENS_URLS = 'http://files.grouplens.org/datasets/movielens/ml-latest-small.zip'

def download_movielens(
    mkdir=True,
    verbose=False,
):
    if verbose is True:
        print(f"Downloading from {MOVIELENS_URLS}")
    output_dir = pathlib.Path('datasets').resolve()
    if not output_dir.exists():
        if mkdir:
            output_dir.mkdir(exist_ok=True)
        else:
            raise Exception(f"{output_dir} does not exist")
    else:
        for root, dirs, files in os.walk(str(output_dir)):
            for f in files:
                os.unlink(os.path.join(root, f))
            for d in dirs:
                shutil.rmtree(os.path.join(root, d))

    headers = requests.utils.default_headers()
    headers.update(
        {
            'User-Agent': 'My User Agent 1.0',
        }
    )
    with requests.get(MOVIELENS_URLS, headers=headers, stream=True) as r:
        r.raise_for_status()
        with tempfile.NamedTemporaryFile(mode="rb+") as temp_f:
            chunk_size = 8192
            for chunk in r.iter_content(chunk_size=chunk_size):
                temp_f.write(chunk)
            with ZipFile(temp_f, "r") as zipf:
                zipf.extractall(output_dir)
                if verbose is True:
                    print(f"\nUnzipped.\n\nFiles downloaded and unziped")
                store_data()

def store_data():
    cur.execute("SET FOREIGN_KEY_CHECKS=0;")
    cur.execute("DROP TABLE IF EXISTS movies;")
    cur.execute("""
        CREATE TABLE movies(
        movie_id INTEGER NOT NULL PRIMARY KEY
        ,title VARCHAR(255) NOT NULL
        ,genres VARCHAR(255) NOT NULL
    );
    """)
    cur.execute("SET FOREIGN_KEY_CHECKS=1;")

    with open('datasets/ml-latest-small/movies.csv', 'r') as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            cur.execute("INSERT INTO movies VALUES (%s, %s, %s)", row)

    cur.execute("DROP TABLE IF EXISTS tags;")
    cur.execute("""
        CREATE TABLE tags(
        id SERIAL PRIMARY KEY
        ,user_id INTEGER
        ,movie_id INTEGER
        ,tag VARCHAR(255)
        ,timestamp INTEGER
        ,FOREIGN KEY(movie_id) REFERENCES movies(movie_id)
    );
    """)
    with open('datasets/ml-latest-small/tags.csv', 'r') as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            row = [int(row[0]), int(row[1]),row[2],int(row[3])]
            cur.execute("INSERT INTO tags (user_id, movie_id, tag, timestamp) VALUES (%s, %s, %s, %s)", row)

    cur.execute("DROP TABLE IF EXISTS ratings;")
    cur.execute("""
        CREATE TABLE ratings(
        id SERIAL PRIMARY KEY
        ,user_id INTEGER
        ,movie_id INTEGER
        ,rating INTEGER
        ,timestamp INTEGER
        ,FOREIGN KEY(movie_id) REFERENCES movies(movie_id)
    );
    """)

    with open('datasets/ml-latest-small/ratings.csv', 'r') as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            cur.execute("INSERT INTO ratings (user_id, movie_id, rating, timestamp) VALUES (%s, %s, %s, %s)", row)

    cur.execute("DROP TABLE IF EXISTS links;")
    cur.execute("""
        CREATE TABLE links(
        id SERIAL PRIMARY KEY
        ,movie_id INTEGER
        ,imdb_id VARCHAR(255)
        ,tmdb_id VARCHAR(255)
        ,FOREIGN KEY(movie_id) REFERENCES movies(movie_id)
    );
    """)

    with open('datasets/ml-latest-small/links.csv', 'r') as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            cur.execute("INSERT INTO links (movie_id, imdb_id, tmdb_id) VALUES (%s, %s, %s)", row)

    db.commit()

def setup_args():
    parser = argparse.ArgumentParser(description="Download movielens")
    parser.add_argument("--verbose", default=False, action="store_true")
    parser.add_argument("--mkdir", default=False, action="store_true")
    return parser.parse_args()


if __name__ == "__main__":
    args = setup_args()
    verbose = args.verbose
    mkdir = args.mkdir
    # download_movielens( mkdir=mkdir, verbose=verbose)
    store_data()
