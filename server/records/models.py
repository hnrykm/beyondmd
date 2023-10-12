from django.db import models


# Defines project tables so the Django ORM can generate PostgreSQL tables.
class Record(models.Model):
    exam_date = models.DateField()
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birth_year = models.SmallIntegerField()
    is_male = models.BooleanField()
    symptom_1 = models.CharField(max_length=255)
    symptom_2 = models.CharField(max_length=255)
    diagnosis = models.TextField()


# Label shown for each record in the Admin panel.
def __str__(self):
    return f"{self.exam_date} - {self.last_name}, {self.first_name}"