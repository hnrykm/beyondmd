from django.urls import path
from .views import (api_records, api_record)

urlpatterns = [
    path("records/", api_records, name="api_records"), # For GET and POST requests
    path("records/<int:id>", api_record, name="api_record"), # id for PUT and DELETE requests
]