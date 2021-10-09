from django.contrib.auth.models import AnonymousUser
from django_filters import rest_framework as filters

from core.models import DataSet


class DataSetFilter(filters.FilterSet):
    is_mine = filters.BooleanFilter(method='is_mine_filter')
    name = filters.CharFilter(lookup_expr='icontains')

    # class Meta:
    #     model = DataSet
    #     fields = ['name']

    def is_mine_filter(self, queryset, name, value):
        if not isinstance(self.request.user, AnonymousUser):
            return queryset.filter(owner=self.request.user)
        return queryset
