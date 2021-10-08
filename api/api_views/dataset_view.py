from rest_framework import generics

from api.serializers.dataset_serializer import DataSetSerializer, DataSetDetailSerializer
from core.models import DataSet


class DataSetListApiView(generics.ListAPIView):
    serializer_class = DataSetSerializer
    queryset = DataSet.objects.all()


class DataSetDetailApiView(generics.RetrieveAPIView):
    serializer_class = DataSetDetailSerializer
    queryset = DataSet.objects.prefetch_related('meta_data').all()
