from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.api_views.data_type_view import DataTypeApiView
from api.api_views.dataset_view import DataSetViewSet
from api.api_views.metadata_view import MetaDataViewSet
from api.api_views.schema_view import SchemaViewSet
from api.api_views.user_view import UserApiView

router = DefaultRouter()
router.register('schemas', SchemaViewSet, basename='schemas')
router.register('datasets', DataSetViewSet, basename='datasets')
router.register('metadata', MetaDataViewSet, basename='metadata')

urlpatterns = [
    path('', include(router.urls)),
    path('datatypes/', DataTypeApiView.as_view()),
    path('user/', UserApiView.as_view()),
]
