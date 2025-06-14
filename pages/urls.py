from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('user_interface/', views.user_interface, name='user_panel'),
    path('admin_interface/', views.admin_interface, name='admin_panel'),
    path('admin_interface/available_books_admin/', views.available_Admin, name='availableBooksAdmin'),
    path('admin_interface/add_book/', views.add_book, name='add_book'),
    path('admin_interface/available_books_admin/<int:id>/', views.edit_book, name='edit_book'),
    path('user_interface/available_books_user/', views.available_User, name='availableBooksUser'),
    path('user_interface/available_books_user/<int:id>/', views.book_profile, name='book-profile'),
    path('user_interface/borrowed_books/<str:username>/', views.borrowed, name='borrowed'),
    path('user_interface/search/', views.search, name='search'),
]