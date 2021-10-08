from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.api_views.data_type_view import DataTypeApiView
from api.api_views.dataset_view import DataSetListApiView, DataSetDetailApiView
from api.api_views.schema_view import SchemaViewSet

router = DefaultRouter()
router.register('schemas', SchemaViewSet, basename='schemas')

urlpatterns = [
    path('', include(router.urls)),
    path('datasets/', DataSetListApiView.as_view()),
    path('datasets/<int:pk>/', DataSetDetailApiView.as_view()),
    path('datatypes/', DataTypeApiView.as_view()),
]
