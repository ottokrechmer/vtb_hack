# Generated by Django 3.2.8 on 2021-10-09 15:31

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0010_dataset_purchasers'),
    ]

    operations = [
        migrations.AddField(
            model_name='dataset',
            name='is_private',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='dataset',
            name='purchasers',
            field=models.ManyToManyField(blank=True, related_name='purchaser_datasets', to=settings.AUTH_USER_MODEL),
        ),
    ]
