# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-02 11:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0003_auto_20170902_1058'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='nickname',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]
