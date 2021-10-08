from rest_framework import serializers

from schema.models import Schema


class SchemaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Schema
        fields = ['owner', 'name', 'description']


class SchemaDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Schema
        fields = '__all__'
