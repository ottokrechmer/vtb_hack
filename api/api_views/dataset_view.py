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
        if self.action == 'retrieve':
            return DataSet.objects.prefetch_related('meta_data').all()
        return DataSet.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(methods=['post'], detail=False)
    def update_datasets(self, request):
        parser = DataHubDataGetter()
        parser.parse_data()
        return Response(status=200)
