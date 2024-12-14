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
        ("vertical", "Вертикальное"),
        ("quadratic", "Квадратное")
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
                                    unique=True,
                                    verbose_name=u"Телефон")
    email = models.EmailField(max_length=100, unique=True,
                              verbose_name=u"E-mail")
    title = models.CharField(max_length=255, 
                             verbose_name=u"Заголовок", 
                             blank=False,
                             null=False,)
    comments = models.TextField(verbose_name=u"Комментарии",
                                   blank=False, null=False)
    dateCreated = models.DateTimeField(auto_now_add=True, 
                                       verbose_name=u"Дата отправки заявки")
    class Meta:
        verbose_name = 'Заявки'
        verbose_name_plural = 'Заявки'
        ordering = ('initials',)

# Хранение блоков
class blocks(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255, 
                             verbose_name=u"Заголовок", 
                             blank=False,
                             null=False,)
    description = models.TextField(verbose_name=u"Описание",
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
        verbose_name = 'Блоки'
        verbose_name_plural = 'Блоки'
        ordering = ('weight',)