from django.db import models
from django.contrib.auth.models import User

class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=20)
    email = models.EmailField(max_length=60)
    avatar = models.ImageField(default=False)


class Grid(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='grids')
    grid_name = models.CharField(max_length=100)
    grid_data = models.JSONField()

    def __str__(self):
        return f"{self.user.username}'s {self.user.grid_name} Grid"