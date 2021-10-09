from rest_framework import serializers

from api.serializers.meta_data_serializer import MetaDataSerializer
from core.models import DataSet


class DataSetSerializer(serializers.ModelSerializer):

    class Meta:
        model = DataSet
        fields = ['name', 'description', 'is_toll', 'price', 'updated_at', 'owner']


class DataSetDetailSerializer(serializers.ModelSerializer):
    meta_data = MetaDataSerializer(many=True)

    class Meta:
        model = DataSet
        fields = ['name', 'description', 'is_toll', 'price', 'updated_at', 'owner', 'meta_data']
