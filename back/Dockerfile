FROM python:3.10

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /back

RUN apt-get update && apt-get install -y netcat-openbsd iputils-ping postgresql-client

COPY requirements.txt /back
RUN pip install -r requirements.txt

# копирование всех файлов приложения в контейнер
COPY . .
