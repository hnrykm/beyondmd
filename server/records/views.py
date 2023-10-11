from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from .encoders import RecordEncoder
from .models import Record


# GET requests for all records ordered by the exam_date values.
# POST requests with JSON content and error handler for invalid input.
@require_http_methods(["GET", "POST"])
def api_records(request):
    if request.method == "GET":
        records = Record.objects.all().order_by("exam_date").values()
        return JsonResponse({"records": records}, encoder=RecordEncoder)
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            record = Record.objects.create(**content)
            return JsonResponse(record, encoder=RecordEncoder, safe=False)
        except Record.DoesNotExist:
            return JsonResponse({"message": "Invalid Record Input"}, status=400)


# PUT requests by id to update the record with JSON content plus error handler.
# DELETE requests by id and returns "deleted" response or 400 error.
@require_http_methods(["PUT", "DELETE"])
def api_record(request, id):
    if request.method == "PUT":
        try:
            content = json.loads(request.body)
            Record.objects.filter(id=id).update(**content)
            record = Record.objects.get(id=id)
            return JsonResponse(record, encoder=RecordEncoder, safe=False)
        except Record.DoesNotExist:
            return JsonResponse({"message": "Invalid Record ID"}, status=400)
    elif request.method == "DELETE":
        count, _ = Record.objects.filter(id=id).delete()
        if count > 0:
            return JsonResponse({"deleted": count > 0})
        else:
            return JsonResponse({"message": "Invalid Record ID"}, status=400)
