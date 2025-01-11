# Этап сборки
FROM node:16 AS builder

# установка рабочей директории для приложения внутри контейнера
WORKDIR /front

# копирование package.json и package-lock.json в контейнер
COPY ./package*.json ./

# установка зависимостей приложения
RUN npm install

# копирование всех файлов приложения в контейнер
COPY . .

# сборка проекта
RUN npm run build

# Этап выполнения
FROM nginx:alpine AS runner

# Копируем собранные файлы в директорию nginx
COPY --from=builder /front/dist /usr/share/nginx/html

# Копируем файл конфигурации nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 8080
EXPOSE 8080

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
