from django.contrib import admin
from django.urls import path, include
from song_upload import urls as song_upload_url
from song_listings import urls as song_listings_url

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('upload/', include(song_upload_url)),
    path('listings/', include(song_listings_url)),
]