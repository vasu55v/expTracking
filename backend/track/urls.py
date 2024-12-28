from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path("Products/",ProductListView.as_view()),
    path("AddProduct/",ProductCreateView.as_view()),
]