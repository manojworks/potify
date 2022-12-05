from django.urls import path

from .views import (
    RecentSongListingsView,
)


urlpatterns = [
    path('recent/', RecentSongListingsView.as_view()),
]

