from rest_framework import serializers

from api.serializers.meta_data_serializer import MetaDataSerializer
from api.serializers.user_serializer import UserSerializer
from core.models import DataSet


class DataSetSerializer(serializers.ModelSerializer):
    owner = UserSerializer()

    class Meta:
        model = DataSet
        fields = ['id', 'name', 'description', 'price', 'updated_at', 'owner']


class DataSetDetailSerializer(serializers.ModelSerializer):
    meta_data = MetaDataSerializer(many=True)

    class Meta:
        model = DataSet
        fields = ['id', 'name', 'description', 'price', 'updated_at', 'owner', 'meta_data']
