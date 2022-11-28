import logging

from django.test import TestCase, Client
from django.test import override_settings


class FileUploadTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    @override_settings(MEDIA_ROOT='/home/manoj/songs_repo')
    def test_upload_song(self):
        formdata = {}
        with open('/home/manoj/potify/song_service/temp/smalljs.mp3', 'rb') as f:
            formdata['file'] = f
            response = self.client.post('/song-upload/api', data=formdata)
            self.assertEqual(response.status_code, 201)
