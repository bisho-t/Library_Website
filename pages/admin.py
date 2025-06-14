from django.contrib import admin
from .models import Book, LibraryUser, BookBorrow
# Register your models here.

admin.site.register(Book)
admin.site.register(LibraryUser)
admin.site.register(BookBorrow)