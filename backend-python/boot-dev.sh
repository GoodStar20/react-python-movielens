#!/bin/bash

cd /app
echo "Installing challenge package for live development.."
pip install -e .

echo "Starting server.."
export FLASK_APP=app.py
export FLASK_ENV=development
flask run --host=0.0.0.0 --port=80
