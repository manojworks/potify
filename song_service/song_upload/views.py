from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.core.files.storage import default_storage
from django.conf import settings
from django.http import JsonResponse

from .models import Song


def song_repo(f):
    return settings.SONGS_REPO + f


def file_save(f_name, f_obj):
    saved_file_name = default_storage.save(song_repo(f_name), f_obj)
    print("saved_file_name " + saved_file_name)
    print("original_file_name " + f_name)
    return saved_file_name


class SongsUploadApiView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        print("here....")
        return Response(status=status.HTTP_202_ACCEPTED)

    def post(self, request, *args, **kwargs):
        f_obj = request.FILES['file']
        f_name = f_obj.name
        # TODO: handle error saving file
        saved_path = file_save(f_name, f_obj)

        s = Song()
        s.original_name = f_name
        s.file_path = saved_path
        print("save new song {orig_name} at id {id} with state {state} ".format(orig_name=s.original_name, id=s.uuid, state=s.status))
        s.save()

        data = {
            'original_file_name': s.original_name,
            'song_id': s.uuid,
            'status': s.status,
            'error': None
        }

        return JsonResponse(data, status=status.HTTP_201_CREATED)
