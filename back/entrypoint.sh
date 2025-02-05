#!/usr/bin/env bash
python manage.py collectstatic
python manage.py migrate
gunicorn digitalCulture.wsgi:application --bind 0.0.0.0:8001
