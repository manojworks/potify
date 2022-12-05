import json

from django.test import RequestFactory, TestCase
from song_upload.models import Song
from .views import RecentSongListingsView


class SongListingsViewTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.song = Song.objects.create(
            original_name='test_file_1', file_path='test_file_path_1', status=1)
        self.song = Song.objects.create(
            original_name='test_file_2', file_path='test_file_path_2', status=2)

    def test_recent(self):
        request = self.factory.get('/listings/recent/')
        response = RecentSongListingsView.as_view()(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json.loads(response.content.decode('utf-8'))), 1)