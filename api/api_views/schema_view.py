from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet

from api.serializers.schema_serializer import SchemaSerializer, SchemaDetailSerializer
from schema.models import Schema


class SchemaViewSet(ModelViewSet):
    queryset = Schema.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'list':
            return SchemaSerializer
        return SchemaDetailSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
