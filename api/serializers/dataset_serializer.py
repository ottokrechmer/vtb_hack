from rest_framework import serializers

from api.serializers.meta_data_serializer import MetaDataSerializer
from api.serializers.user_serializer import UserSerializer
from core.models import DataSet


class DataSetSerializer(serializers.ModelSerializer):
    owner = UserSerializer(allow_null=True, read_only=True)
    is_mine = serializers.SerializerMethodField()
    is_purchased = serializers.SerializerMethodField(method_name='get_is_purchased')

    class Meta:
        model = DataSet
        fields = ['id', 'name', 'description', 'price', 'updated_at', 'is_private', 'owner', 'is_mine', 'is_purchased']

    def get_is_mine(self, obj):
        return obj.owner == self.context['request'].user

    def get_is_purchased(self, obj):
        return self.context['request'].user in obj.purchasers.all()


class DataSetDetailSerializer(serializers.ModelSerializer):
    meta_data = MetaDataSerializer(many=True)
    owner = UserSerializer(allow_null=True)
    is_mine = serializers.SerializerMethodField()
    is_purchased = serializers.SerializerMethodField(method_name='get_is_purchased')

    class Meta:
        model = DataSet
        fields = ['id', 'name', 'description', 'price', 'updated_at', 'owner', 'is_private', 'meta_data', 'is_mine', 'is_purchased']

    def get_is_mine(self, obj):
        return obj.owner == self.context['request'].user

    def get_is_purchased(self, obj):
        return self.context['request'].user in obj.purchasers.all()
