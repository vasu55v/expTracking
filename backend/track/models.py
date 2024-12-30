from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class MainUserModel(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    ProfileImg=models.ImageField(upload_to='ProfilePhotos')

    def __str__(self):
        return f"{self.user.username}-----{self.ProfileImg}"


class Product(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    ProductName=models.CharField(max_length=200)
    description=models.TextField(default="No description")
    ProductImg=models.ImageField(upload_to="Product_image")
    ExpiryDate=models.DateField()
    updatedAt=models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}---------{self.ProductName}"
    

