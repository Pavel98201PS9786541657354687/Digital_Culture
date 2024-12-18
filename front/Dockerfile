FROM node:16 AS builder

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

FROM busybox:1.30 AS runner
WORKDIR /front
COPY --from=builder /front/dist /var/www/html/
EXPOSE 8080

CMD ["busybox", "httpd", "-f", "-v", "-p", "8080"]