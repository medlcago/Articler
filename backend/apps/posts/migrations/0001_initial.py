# Generated by Django 5.0.6 on 2024-07-05 11:53

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, validators=[django.core.validators.MinLengthValidator(5), django.core.validators.MaxLengthValidator(255)])),
                ('description', models.TextField(validators=[django.core.validators.MinLengthValidator(128)])),
                ('is_published', models.BooleanField(choices=[(False, 'Черновик'), (True, 'Опубликовано')], default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ('-created_at',),
            },
        ),
    ]
