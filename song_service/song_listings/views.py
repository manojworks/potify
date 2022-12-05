import logging
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import status
from song_upload.models import Song


logger = logging.getLogger(__name__)


# Create your views here.
class RecentSongListingsView(APIView):

    def get(self, request, format=None):
        recent_uploaded_songs = Song.objects.filter(status=Song.SongState.UPLOADED).order_by('created_on')
        counter = 0
        response_dict = {}
        for s in recent_uploaded_songs.iterator():
            response_dict[counter] = {'song_id': s.uuid,
                                      'file_name': s.original_name,
                                      'song_status': 1, 'attributes': []}
            counter += 1
        logger.debug(f"GET recent songs returned {len(response_dict)} songs")
        return JsonResponse(response_dict, status=status.HTTP_200_OK)

