FROM node:16 AS build

# установка рабочей директории для приложения внутри контейнера
WORKDIR /front

# копирование package.json и package-lock.json в контейнер
COPY ./package*.json /front

# установка зависимостей приложения
RUN npm install

# копирование всех файлов приложения в контейнер
COPY . .

# сборка проекта
RUN npm run build

EXPOSE 4173

# команда запуска приложения
CMD npm run preview
