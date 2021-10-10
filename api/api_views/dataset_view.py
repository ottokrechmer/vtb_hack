from django.contrib.auth.models import AnonymousUser
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from django_filters import rest_framework as filters
from rest_framework.viewsets import ModelViewSet

from api.filters.dataset_filter import DataSetFilter
from api.serializers.dataset_serializer import DataSetSerializer, DataSetDetailSerializer
from core.models import DataSet
from core.services.datahub_api.data_getter import DataHubDataGetter


class DataSetViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = DataSetFilter

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return DataSetDetailSerializer
        return DataSetSerializer

    def get_queryset(self):
        if not isinstance(self.request.user, AnonymousUser):
            if self.action == 'retrieve':
                return DataSet.objects.prefetch_related('meta_data', 'purchasers').filter(Q(is_private=False) | Q(owner=self.request.user))
            return DataSet.objects.prefetch_related('purchasers').filter(Q(is_private=False) | Q(owner=self.request.user))
        return DataSet.objects.prefetch_related('purchasers').filter(is_private=False)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(methods=['post'], detail=False)
    def update_datasets(self, request):
        parser = DataHubDataGetter()
        parser.parse_data()
        return Response(status=200)

    @action(methods=['post'], detail=True)
    def purchase(self, request, pk):
        dataset = get_object_or_404(DataSet, pk=pk)
        if not dataset.price:
            return Response('DataSet is free!', status=200)
        wallet = request.user.wallet
        if dataset.price > wallet.amount:
            return Response('Not enough money!', status=200)
        else:
            wallet.amount -= dataset.price
            wallet.save()
            dataset.purchasers.add(request.user)
            return Response('Done!', status=200)
