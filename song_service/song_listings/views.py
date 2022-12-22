import logging
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import status
from song_upload.models import Song

logger = logging.getLogger(__name__)


# Create your views here.
class RecentSongListingsView(APIView):

    def get(self, request, format=None):
        logger.debug(f"GET recent songs query params {request.query_params}")

        page_num = int(request.GET.get('pageNumber', '0'))
        page_size = int(request.GET.get('pageSize', 10))
        sort_order = request.query_params.get('sortOrder', 'asc')
        if sort_order == 'asc':
            sort_order_by = 'created_on'
        else:
            sort_order_by = '-created_on'

        lb = page_num * page_size
        ub = lb + page_size
        recent_uploaded_songs = Song.objects.filter(status=Song.SongState.UPLOADED).order_by(sort_order_by)[lb:ub]
        response_dict = {"recent": []}
        for s in recent_uploaded_songs.iterator():
            val = {"id": s.uuid,
                   'file_name': s.original_name,
                   'state': 1,
                   'attr': ['new song']
                   }
            response_dict["recent"].append(val)
        logger.debug(f"GET recent songs returned {len(response_dict.values())} songs")
        return JsonResponse(response_dict, status=status.HTTP_200_OK)


class UserSongsListingsView(APIView):
    # TODO: change implementation to fetch based on category
    def get(self, request, categoryid=None):
        # user_id = request.query_params.get('categoryid')
        # logger.debug(" query params " + user_id)
        recent_uploaded_songs = Song.objects.all()[:5]
        response_dict = {"category": []}
        for s in recent_uploaded_songs.iterator():
            val = {"id": s.uuid,
                   'file_name': s.original_name,
                   'state': 1,
                   'attr': ['category']
                   }
            response_dict["category"].append(val)
        logger.debug(f"GET recent songs returned {len(response_dict.values())} songs")
        return JsonResponse(response_dict, status=status.HTTP_200_OK)
