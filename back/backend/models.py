from django.db import models
from django.core.validators import RegexValidator
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError
import traceback
from django.core.validators import URLValidator

# Хранение видео
class moviesModel(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255, 
                             unique=True,
                             verbose_name=u"Заголовок",
                             blank=False,
                             null=False,)
    title_en = models.CharField(max_length=255, 
                             unique=True,
                             verbose_name=u"Заголовок (англ.)",
                             blank=False,
                             null=False, default="")
    description = models.TextField(verbose_name=u"Описание",
                                   blank=False,
                             null=False,)
    description_en = models.TextField(verbose_name=u"Описание  (англ.)",
                                   blank=False,
                                null=False, default="")
    fileName = models.FileField(verbose_name=u"Файл", 
                                # validators=[FileExtensionValidator(['pdf'])]
                                )
    formatVideo_CHICES = [
        ("horizontal", "Горизонтальное"),
        ("vertical", "Вертикальное"),
        ("quadratic", "Квадратное")
    ]
    formatVideo = models.CharField(max_length=50, choices=formatVideo_CHICES, 
                              default="Горизонтальное", 
                              verbose_name=u"Формат файла",
                              blank=False,
                              null=False,)
    limit_keys = models.PositiveIntegerField(verbose_name=u"Лимит файлов в проекте", default=5)
    dateCreated = models.DateTimeField(auto_now_add=True, 
                                       verbose_name=u"Дата создания")
    dateUpdate = models.DateTimeField(auto_now=True, 
                                      verbose_name=u"Дата обновления")
    weight = models.PositiveIntegerField(verbose_name=u"Сортировка",
                                         blank=False,
                                        null=False,)
    def delete(self, *args, **kwargs):
        storage, path = self.fileName.storage, self.fileName.path
        super(moviesModel, self).delete(*args, **kwargs)
        storage.delete(path)
    
    def __str__(self):
        return self.title
    class Meta:
        verbose_name = 'Видео'
        verbose_name_plural = 'Видео'
        ordering = ('weight',)

class projectsFilesModel(models.Model):
    id = models.BigAutoField(primary_key=True)
    projectsId = models.ForeignKey('moviesModel', on_delete=models.CASCADE,
                                   blank=False, default='',
                                   verbose_name=u"Проект")
    name = models.CharField(max_length=255, 
                             verbose_name=u"Имя", 
                             blank=False,
                             null=False,)
    fileName = models.FileField(verbose_name=u"Файл")
    formatVideo_CHICES = [
        ("horizontal", "Горизонтальное"),
        ("vertical", "Вертикальное"),
        ("quadratic", "Квадратное")
    ]
    
    format = models.CharField(max_length=50, choices=formatVideo_CHICES,
                              default="Горизонтальное", 
                              verbose_name=u"Формат файла",
                              blank=False,
                              null=False,)
    dateCreated = models.DateTimeField(auto_now_add=True, 
                                       verbose_name=u"Дата создания")
    dateUpdate = models.DateTimeField(auto_now=True, 
                                      verbose_name=u"Дата обновления")
    weight = models.PositiveIntegerField(verbose_name=u"Сортировка",
                                         blank=False, null=False,)
    def __str__(self):
        return self.name
    
    def clean(self): 
        project_id = self.projectsId 
        count_keys = len(projectsFilesModel.objects.filter(projectsId = project_id).values_list("name")) 
        try:
            limit_keys = moviesModel.objects.filter(title = project_id).values_list("limit_keys")[0][0]
        except:
            print(str(traceback.format_exc()))
            limit_keys = 5
        if count_keys > limit_keys:
            raise ValidationError({"name":(f"К выбранному проекту нельзя прикрепить файлы. На текущий момент превышен лимит - {limit_keys} файлов.")})
    
    def delete(self, *args, **kwargs):
        storage, path = self.fileName.storage, self.fileName.path
        super(projectsFilesModel, self).delete(*args, **kwargs)
        storage.delete(path)
    
    class Meta:
        verbose_name = 'Проектные файлы'
        verbose_name_plural = 'Проектные файлы'
        ordering = ('weight',)


# Валидатор для телефона
phone_validator = RegexValidator(r"^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$", "The phone number provided is invalid")

# Хранение заявок
class applications(models.Model):
    application_id = models.BigAutoField(primary_key=True)
    initials = models.CharField(max_length=255, 
                               verbose_name=u"Имя",
                             blank=False, null=False)
    phone_number = models.CharField(max_length=16, 
                                    validators=[phone_validator], 
                                    unique=True,
                                    verbose_name=u"Телефон")
    company = models.CharField(max_length=1000,
                               verbose_name=u"Организация",
                               blank=True, null=True,
                               default="")
    sphere_activity = models.CharField(max_length=255, 
                             verbose_name=u"Сфера деятельности", 
                             blank=True, null=True,
                             default='')
    url_links = models.CharField(max_length=1000,
                                 validators=[URLValidator()],
                                 verbose_name=u"Соц. сети организации",
                                 blank=True, null=True, default='')
    comments = models.TextField(max_length=1000,
                                verbose_name=u"Комментарии",
                                blank=True, null=True,)
    dateCreated = models.DateTimeField(auto_now_add=True, 
                                       verbose_name=u"Дата отправки заявки")
    class Meta:
        verbose_name = 'Заявки'
        verbose_name_plural = 'Заявки'
        ordering = ('dateCreated',)

# Хранение блоков
class blocks(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255, 
                             verbose_name=u"Заголовок", 
                             blank=False,
                             null=False,)
    title_en = models.CharField(max_length=255, 
                             verbose_name=u"Заголовок  (англ.)", 
                             blank=False,
                             null=False, default="")
    description = models.TextField(verbose_name=u"Описание",
                                   blank=False,
                             null=False,)
    description_en = models.TextField(verbose_name=u"Описание  (англ.)",
                                   blank=False,
                             null=False, default="")
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