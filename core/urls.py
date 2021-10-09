from django.urls import path

from core import views

urlpatterns = [
    path('', views.home),
    path('login/', views.login),
    path('auth/', views.auth, name='auth'),
    path('logout/', views.logout),
]
