from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet

from api.serializers.meta_data_serializer import MetaDataSerializer
from core.models import MetaData


class MetaDataViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = MetaData.objects.all()
    serializer_class = MetaDataSerializer
