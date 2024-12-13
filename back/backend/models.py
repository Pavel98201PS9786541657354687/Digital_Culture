from django.db import models
from django.core.validators import RegexValidator

# Хранение видео
class moviesModel(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255, 
                             verbose_name=u"Заголовок", 
                             blank=False,
                             null=False,)
    description = models.TextField(verbose_name=u"Описание",
                                   blank=False,
                             null=False,)
    fileName = models.FileField(verbose_name=u"Файл")
    formatVideo_CHICES = [
        ("horizontal", "Горизонтальное"),
        ("vertical", "Вертикальное")
    ]
    
    formatVideo = models.CharField(max_length=50, choices=formatVideo_CHICES, 
    default="URL в млг не найден", verbose_name=u"Формат видео",
                            blank=False,
                             null=False,)
    dateCreated = models.DateTimeField(auto_now_add=True, 
                                       verbose_name=u"Дата создания")
    dateUpdate = models.DateTimeField(auto_now=True, 
                                      verbose_name=u"Дата обновления")
    weight = models.PositiveIntegerField(verbose_name=u"Сортировка",
                                         blank=False,
                                        null=False,)

    class Meta:
        verbose_name = 'Видео'
        verbose_name_plural = 'Видео'
        ordering = ('weight',)

# Хранение фото
class photoModel(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255, verbose_name=u"Заголовок",
                             blank=False,
                             null=False,)
    description = models.TextField(verbose_name=u"Описание",
                                   blank=False,
                             null=False,)
    fileName = models.FileField(verbose_name=u"Файл")
    formatPhoto_CHICES = [
        ("horizontal", "Горизонтальное"),
        ("vertical", "Вертикальное")
    ]
    
    formatPhoto = models.CharField(max_length=50, 
        choices=formatPhoto_CHICES, 
        default="URL в млг не найден"
        , verbose_name=u"Формат фото")
    dateCreated = models.DateTimeField(auto_now_add=True, 
                                       verbose_name=u"Дата создания")
    dateUpdate = models.DateTimeField(auto_now=True, 
                                      verbose_name=u"Дата обновления")
    weight = models.PositiveIntegerField(verbose_name=u"Сортировка",
                                         blank=False,
                                        null=False,)

    class Meta:
        verbose_name = 'Фото'
        verbose_name_plural = 'Фото'
        ordering = ('weight',)

# Валидатор для телефона
phone_validator = RegexValidator(r"^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$", "The phone number provided is invalid")

# Хранение заявок
class applications(models.Model):
    application_id = models.BigAutoField(primary_key=True)
    initials = models.CharField(max_length=255, 
                               verbose_name=u"ФИО",
                             blank=False, null=False)
    phone_number = models.CharField(max_length=16, 
                                    validators=[phone_validator],
                                    verbose_name=u"Телефон")
    email = models.EmailField(max_length=100,
                              verbose_name=u"E-mail")
    comments = models.TextField(verbose_name=u"Комментарии",
                                   blank=False, null=False)
    dateCreated = models.DateTimeField(auto_now_add=True, 
                                       verbose_name=u"Дата отправки заявки")
    class Meta:
        verbose_name = 'Заявки'
        verbose_name_plural = 'Заявки'
        ordering = ('application_id',)