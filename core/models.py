from django.contrib.auth.models import User
from django.db import models


class DataType(models.TextChoices):
    INT = 'int_type'
    STR = 'str_type'
    BOOL = 'bool_type'
    FLOAT = 'float_type'
    DATE = 'date_type'
    DATETIME = 'datetime_type'


class DataSet(models.Model):
    urn = models.CharField(max_length=200, db_index=True, null=True, blank=True, unique=True)
    name = models.CharField(max_length=300)
    description = models.TextField(null=True, blank=True)
    price = models.PositiveIntegerField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='datasets', null=True, blank=True)
    purchasers = models.ManyToManyField(User, related_name='purchaser_datasets', blank=True)
    is_private = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'DataSet'
        verbose_name_plural = 'DataSets'


class MetaData(models.Model):
    data_set = models.ForeignKey(DataSet, related_name='meta_data', on_delete=models.CASCADE)
    field_name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    data_type = models.CharField(max_length=100, choices=DataType.choices)

    def __str__(self):
        return self.field_name

    class Meta:
        verbose_name = 'MetaData'
        verbose_name_plural = 'MetaData'


class Conversion(models.Model):
    name = models.CharField(max_length=300)
    from_data_type = models.CharField(max_length=100, choices=DataType.choices)
    to_data_type = models.CharField(max_length=100, choices=DataType.choices)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Conversion'
        verbose_name_plural = 'Conversion'


class Token(models.Model):
    token = models.CharField(max_length=200, db_index=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='token')
    expires_at = models.DateTimeField()

    def __str__(self):
        return self.user.email
