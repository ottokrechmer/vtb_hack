from django.contrib.auth.models import AnonymousUser
from django_filters import rest_framework as filters
from rest_framework import exceptions


class DataSetFilter(filters.FilterSet):
    is_mine = filters.BooleanFilter(method='is_mine_filter')
    name = filters.CharFilter(lookup_expr='icontains')
    is_purchased = filters.BooleanFilter(method='is_purchased_filter')

    def is_mine_filter(self, queryset, name, value):
        if not isinstance(self.request.user, AnonymousUser):
            return queryset.filter(owner=self.request.user)
        raise exceptions.NotAuthenticated('Need to auth')

    def is_purchased_filter(self, queryset, name, value):
        if not isinstance(self.request.user, AnonymousUser):
            return queryset.filter(purchasers=self.request.user)
        raise exceptions.NotAuthenticated('Need to auth')
