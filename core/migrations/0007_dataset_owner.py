# Generated by Django 3.2.8 on 2021-10-09 11:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0006_token_expires_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='dataset',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='datasets', to='auth.user'),
            preserve_default=False,
        ),
    ]