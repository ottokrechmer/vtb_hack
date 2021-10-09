from django.contrib import admin

from core.admin_classes.dataset_admin import DataSetAdmin
from core.admin_classes.metadata_admin import MetaDataAdmin
from core.models import Conversion, MetaData, DataSet

admin.site.register(DataSet, DataSetAdmin)
admin.site.register(MetaData, MetaDataAdmin)
admin.site.register(Conversion)
