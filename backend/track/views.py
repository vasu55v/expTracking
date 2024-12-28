from django.shortcuts import render

from django.contrib.auth.models import User
from .serializers import *
from .models import *
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404


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