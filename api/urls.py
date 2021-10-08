from django.urls import path, include

from api.api_views.data_type_view import DataTypeApiView
from api.api_views.dataset_view import DataSetListApiView, DataSetDetailApiView

urlpatterns = [
    path('datasets/', DataSetListApiView.as_view()),
    path('datasets/<int:pk>/', DataSetDetailApiView.as_view()),
    path('datatypes/', DataTypeApiView.as_view()),
]
