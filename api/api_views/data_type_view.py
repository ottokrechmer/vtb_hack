from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import DataType


class DataTypeApiView(APIView):

    def get(self, request):
        obj = [c[0] for c in DataType.choices]
        return Response(obj)
