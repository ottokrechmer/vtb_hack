from rest_framework.viewsets import ModelViewSet

from api.serializers.schema_serializer import SchemaSerializer, SchemaDetailSerializer
from schema.models import Schema


class SchemaViewSet(ModelViewSet):
    queryset = Schema.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return SchemaSerializer
        return SchemaDetailSerializer
