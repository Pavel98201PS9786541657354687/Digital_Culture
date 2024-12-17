FROM node:16

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

EXPOSE 4175

# команда запуска приложения
CMD ["npm", "run", "preview",  "--", "--host", "0.0.0.0", "--port", "4175"] 