from django.db import models


class DataType(models.TextChoices):
    INT = 'int_type'
    STR = 'str_type'
    BOOL = 'bool_type'
    FLOAT = 'float_type'
    DATE = 'date_type'
    DATETIME = 'datetime_type'


class DataSet(models.Model):
    name = models.CharField(max_length=300)
    description = models.TextField(null=True, blank=True)
    is_toll = models.BooleanField(default=False)
    price = models.PositiveIntegerField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'DataSet'
        verbose_name_plural = 'DataSets'


class MetaData(models.Model):
    data_set = models.ForeignKey(DataSet, related_name='meta_data', on_delete=models.CASCADE)
    filed_name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    data_type = models.CharField(max_length=100, choices=DataType.choices)

    def __str__(self):
        return self.filed_name

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
