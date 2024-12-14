FROM node:16

# установка рабочей директории для приложения внутри контейнера
WORKDIR /front

# копирование package.json и package-lock.json в контейнер
COPY ./package*.json ./

# установка зависимостей приложения
RUN npm install --legacy-peer-deps

# копирование всех файлов приложения в контейнер
COPY . .

# сборка проекта
RUN npm run build

# команда запуска приложения
CMD ["npm", "run", "preview"]
