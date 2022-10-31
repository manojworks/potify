from django.urls import path
from .views import (
    SongsUploadApiView,
)

urlpatterns = [
    path('api', SongsUploadApiView.as_view()),
]