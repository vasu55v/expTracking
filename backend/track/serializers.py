from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class UserSerializerNoPassword(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','first_name','last_name','username','email']
        extra_kwargs={"password":{"write_only":True}}
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','first_name','last_name','email','username','password']
        extra_kwargs={"password":{"write_only":True}}

class MainUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=MainUserModel
        fields=["id","User","ProfileImg"]

class MainUserSerializerDetail(serializers.ModelSerializer):
    user=UserSerializer
    class Meta:
        model=MainUserModel
        fields=["id","User","ProfileImg"]
    

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields="__all__"

class ProductDetailSerializer(serializers.ModelSerializer):
    user=UserSerializer
    class Meta:
        model=Product
        fields=["user","ProductName","ProductImg","ExpiryDate","updatedAt"]