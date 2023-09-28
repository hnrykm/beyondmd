from django.db import models

class Record(models.Model):
    exam_date = models.DateField(auto_now=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birth_year = models.SmallIntegerField()
    is_male = models.BooleanField()
    avatar = models.CharField(max_length=255)
    symptom_1 = models.CharField(max_length=100)
    symptom_2 = models.CharField(max_length=100)
    symptom_3 = models.CharField(max_length=100)
    diagnosis_1 = models.CharField(max_length=100)
    diagnosis_2 = models.CharField(max_length=100)
    status = models.CharField(max_length=100, default="Examined")