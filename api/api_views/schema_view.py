import json
from io import StringIO

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.serializers.schema_serializer import SchemaSerializer, SchemaDetailSerializer
from schema.models import Schema


class SchemaViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'list':
            return SchemaSerializer
        return SchemaDetailSerializer

    def get_queryset(self):
        return Schema.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(methods=['get'], detail=True)
    def download(self, request, pk):
        schema = get_object_or_404(Schema, pk=pk)
        response = HttpResponse(
            json.dumps(SchemaDetailSerializer(instance=schema).data),
            content_type='text/json',
            headers={'Content-Disposition': 'attachment; filename="schema.json"'},
        )
        return response
