# Generated by Django 5.0.4 on 2024-12-12 18:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='moviesModel',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('fileName', models.FileField(upload_to='')),
                ('formatVideo', models.BooleanField()),
                ('dateCreated', models.DateTimeField()),
                ('dateUpdate', models.DateTimeField()),
                ('weight', models.PositiveIntegerField()),
            ],
        ),
    ]