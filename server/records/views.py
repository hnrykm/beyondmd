from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .models import Record

@require_http_methods(["GET", "POST"])
def api_records(request):
    if request.method == "GET":
        records = Record.objects.all()
        return JsonResponse({"records": records})
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            record = Record.objects.create(**content)
            return JsonResponse(record, safe=False)
        except Record.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Record Input"}, 
                status=400
                )

@require_http_methods(["PUT", "DELETE"])
def api_record(request, id):
    if request.method == "PUT":
        try:
            content = json.loads(request.body)
            Record.objects.filter(id=id).update(**content)
            record = Record.objects.get(id=id)
            return JsonResponse(record, safe=False)
        except Record.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Record ID"},
                status=400
            )
    elif request.method == "DELETE":
        count, _ = Record.objects.filter(id=id).delete()
        if count > 0:
            return JsonResponse({"deleted": count > 0})
        else:
            return JsonResponse(
                {"message": "Invalid Record ID"}, 
                status=400
            )