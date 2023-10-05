from django.db import models

class Record(models.Model):
    exam_date = models.DateField(auto_now=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birth_year = models.SmallIntegerField()
    is_male = models.BooleanField()
    symptom_1 = models.CharField(max_length=100)
    symptom_2 = models.CharField(max_length=100)
    diagnosis = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.exam_date} - {self.last_name}, {self.first_name}"