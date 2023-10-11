from django.contrib import admin
from .models import Record

# Registers Record model to the admin panel
admin.site.register(Record)
