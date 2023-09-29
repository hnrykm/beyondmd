from common.json import ModelEncoder
from .models import Record

class RecordEncoder(ModelEncoder):
    model = Record
    properties = [
        "id",
        "exam_date",
        "first_name",
        "last_name",
        "birth_year",
        "is_male",
        "avatar",
        "symptom_1",
        "symptom_2",
        "symptom_3",
        "diagnosis_1",
        "diagnosis_2",
        "status",
    ]