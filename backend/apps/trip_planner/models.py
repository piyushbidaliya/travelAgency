from django.db import models

# Trip planner state validation models or custom trip configurations
class TripPlannerConfig(models.Model):
    name = models.CharField(max_length=100, default='Default Configuration')
    max_destinations = models.PositiveIntegerField(default=10)
    default_style = models.CharField(max_length=100, default='Luxury Heritage')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
