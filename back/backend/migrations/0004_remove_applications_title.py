# Generated by Django 5.0.4 on 2024-12-17 13:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_applications_company_alter_applications_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='applications',
            name='title',
        ),
    ]