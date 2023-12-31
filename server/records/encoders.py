from common.json import ModelEncoder
from .models import Record


# Encoder to return all the data and the id number.
class RecordEncoder(ModelEncoder):
    model = Record
    properties = [
        "id",
        "exam_date",
        "first_name",
        "last_name",
        "birth_year",
        "is_male",
        "symptom_1",
        "symptom_2",
        "diagnosis",
    ]
