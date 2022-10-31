from django.contrib import admin
from django.urls import path, include
from song_upload import urls as song_upload_url

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('song-upload/', include(song_upload_url)),
]