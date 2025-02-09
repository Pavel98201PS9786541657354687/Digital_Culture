# Используем официальный образ Python
FROM python:3.10

# Устанавливаем переменные окружения
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Устанавливаем рабочую директорию
WORKDIR /back

# Устанавливаем зависимости
COPY requirements.txt /back/
RUN pip install --no-cache-dir -r requirements.txt

# Копируем все файлы приложения в контейнер
COPY . .

# Сборка статических файлов
RUN python manage.py collectstatic --noinput

#CMD ["gunicorn", "--bind", "0.0.0.0:8001", "-k", "sync", "--workers", "3", "--error-logfile", "-", "--log-level", "debug", "digitalCulture.wsgi:application"]
CMD ["gunicorn", "digitalCulture.wsgi:application", "--bind", "0.0.0.0:8001"]