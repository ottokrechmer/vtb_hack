from django.contrib import admin

from core.models import MetaData


class MetaDataInline(admin.TabularInline):
    model = MetaData
    fields = ('field_name', 'description', 'data_type')
    extra = 0


class MetaDataAdmin(admin.ModelAdmin):
    list_display = ('field_name', 'data_type')
    search_fields = ('field_name',)
    list_filter = ('data_set',)
