from django.contrib import admin

from core.admin_classes.metadata_admin import MetaDataInline


class DataSetAdmin(admin.ModelAdmin):
    inlines = (MetaDataInline, )
    list_display = ('name', 'id', 'price', 'owner')
    search_fields = ('name',)
