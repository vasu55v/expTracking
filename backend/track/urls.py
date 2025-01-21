from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path("Products/",ProductListView.as_view()),
    path("Products/<int:id>/",ProductAsPerUserView.as_view()),
    path("Products/<int:id>/<int:pk>/",OneProductAsPerUserView.as_view()),
    path("AddProduct/",ProductCreateView.as_view()),
    path("UpdateProduct/<int:pk>/",ProductDetailUpdateView.as_view()),
    path("MainUserList/<int:id>/",MainUserListView.as_view()),
    path('User/Create/',User_register_view),
    path('User/Login/',User_login),
]