from django.contrib import admin

from core.models import Conversion, MetaData, DataSet

admin.site.register(DataSet)
admin.site.register(MetaData)
admin.site.register(Conversion)
