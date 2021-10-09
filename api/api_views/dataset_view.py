from rest_framework.decorators import action
from rest_framework.response import Response

from api.parent_viewset import ListRetrieveViewSet
from api.serializers.dataset_serializer import DataSetSerializer, DataSetDetailSerializer
from core.models import DataSet
from core.services.datahub_api.data_getter import DataHubDataGetter


class DataSetListViewSet(ListRetrieveViewSet):

    def get_serializer_class(self):
        if self.action == 'list':
            return DataSetSerializer
        return DataSetDetailSerializer

    def get_queryset(self):
        if self.action == 'list':
            return DataSet.objects.all()
        return DataSet.objects.prefetch_related('meta_data').all()

    @action(methods=['post'], detail=False)
    def update_datasets(self, request):
        parser = DataHubDataGetter()
        parser.parse_data()
        return Response(status=200)
