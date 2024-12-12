from django.db import models

class moviesModel(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    fileName = models.FileField()
    formatVideo = models.BooleanField()
    dateCreated = models.DateTimeField()
    dateUpdate = models.DateTimeField()
    weight = models.PositiveIntegerField()

class photoModel(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    fileName = models.FileField()
    formatVideo = models.BooleanField()
    dateCreated = models.DateTimeField()
    dateUpdate = models.DateTimeField()
    weight = models.PositiveIntegerField()
