from django.urls import path
from .views import (
    SongsUploadApiView,
)

urlpatterns = [
    path('', SongsUploadApiView.as_view()),
]