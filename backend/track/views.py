from django.shortcuts import render

from django.contrib.auth.models import User
from .serializers import *
from .models import *
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import make_password
from django.db import IntegrityError
from django.http import JsonResponse


# Create your views here.
class ProductListView(generics.ListAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductDetailSerializer
    permission_classes=[AllowAny]

# class ProductView(generics.ListAPIView):
#     queryset=Color_And_Photos.objects.all()
#     serializer_class=ColorAndPhotosDetailSerializer
#     permission_classes=[AllowAny]

#     def get_queryset(self):
#         qs=super().get_queryset()
#         Product_id=self.kwargs["pk"]
#         qs=qs.filter(Product=Product_id)
#         return qs
    
class ProductCreateView(generics.CreateAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer
    # permission_classes=[IsAuthenticated]
    permission_classes=[AllowAny]

class ProductUpdateViewSet(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # permission_classes = [IsAuthenticated]
    permission_classes=[AllowAny]

class ProductDeleteViewSet(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # permission_classes = [IsAuthenticated]
    permission_classes=[AllowAny]

@csrf_exempt
def User_register_view(request):
    email=request.POST.get('email')
    username=request.POST.get('username')
    password=request.POST.get('password')
    ProfileImg=request.FILES.get('ProfileImg')
    
    try:
        user=User.objects.create(
            email=email,                    
            username=username,
            password=make_password(password),
        )

        if user:
            try:
              MainUser = MainUserModel.objects.create(
                user=user,
                profile_photo=ProfileImg,
            )

              message = {
                    "bool": True,
                    "user": user.id,
                    "MainUserId": MainUser.id,
                    "message": "Thanks for registration. Now you can login",
                }
            except IntegrityError:
                message={"bool":False,"message":"visitor user something went wrong....!"}

        else:
            message={"bool":False,"message":"oops something went wrong....!"}


    except IntegrityError:
         message={"bool":False,"message":"username already exist."}

    return JsonResponse(message)



@csrf_exempt
def User_login(request):
    username=request.POST.get("username")
    password=request.POST.get("password")

    user=authenticate(username=username,password=password)
    if user:
        userObject=MainUserModel.objects.get(user=user)
        message={
            "bool":True,
            "user_id":user.id,
            "username":user.username,
            "userObjectId":userObject.id
        }
    else:
        message={"bool":False,"message":"Not Valid username or Password"}

    return JsonResponse(message)