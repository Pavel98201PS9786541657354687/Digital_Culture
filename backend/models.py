from django.db import models

class moviesModel(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255, verbose_name=u"Заголовок")
    description = models.TextField(verbose_name=u"Описание")
    fileName = models.FileField(verbose_name=u"Файл")
    formatVideo_CHICES = [
        ("horizontal", "Горизонтальное"),
        ("vertical", "Вертикальное")
    ]
    
    formatVideo = models.CharField(max_length=50, choices=formatVideo_CHICES, 
    default="URL в млг не найден", verbose_name=u"Формат видео")
    dateCreated = models.DateTimeField(auto_now_add=True, verbose_name=u"Дата создания")
    dateUpdate = models.DateTimeField(auto_now=True, verbose_name=u"Дата обновления")
    weight = models.PositiveIntegerField(verbose_name=u"Сортировка")

    class Meta:
        verbose_name = 'Видео'
        verbose_name_plural = 'Видео'
        ordering = ('weight',)

class photoModel(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255, verbose_name=u"Заголовок")
    description = models.TextField(verbose_name=u"Описание")
    fileName = models.FileField(verbose_name=u"Файл")
    formatPhoto_CHICES = [
        ("horizontal", "Горизонтальное"),
        ("vertical", "Вертикальное")
    ]
    
    formatPhoto = models.CharField(max_length=50, 
        choices=formatPhoto_CHICES, 
        default="URL в млг не найден"
        , verbose_name=u"Формат фото")
    dateCreated = models.DateTimeField(auto_now_add=True, verbose_name=u"Дата создания")
    dateUpdate = models.DateTimeField(auto_now=True, verbose_name=u"Дата обновления")
    weight = models.PositiveIntegerField(verbose_name=u"Сортировка")

    class Meta:
        verbose_name = 'Фото'
        verbose_name_plural = 'Фото'
        ordering = ('weight',)
