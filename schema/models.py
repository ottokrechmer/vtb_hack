from django.contrib.auth.models import User
from django.db import models


class Schema(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='schemas', null=True, blank=True)
    name = models.CharField(max_length=300)
    description = models.TextField(null=True, blank=True)
    json_field = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.name


class Wallet(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name='wallet')
    amount = models.PositiveIntegerField(default=0)

    def __str__(self):
        return str(self.amount)
