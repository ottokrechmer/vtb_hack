from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from vtb_hack import settings

urlpatterns = [
    path('back/admin/', admin.site.urls),
    path('back/api/', include('api.urls')),
    path('back/core/', include('core.urls'))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
