from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    wallet = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'wallet']

    def get_wallet(self, obj):
        if hasattr(obj, 'wallet'):
            return obj.wallet.amount
        return 0
