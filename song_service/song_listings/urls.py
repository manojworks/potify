from django.urls import path

from .views import (
    RecentSongListingsView, UserSongsListingsView,
)

urlpatterns = [
    path('category/<str:categoryid>/', UserSongsListingsView.as_view()),
    path('recent/', RecentSongListingsView.as_view()),

]
