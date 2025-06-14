from django.db import models

# Create your models here.

class Book(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    description = models.TextField()
    available = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['id']

class LibraryUser(models.Model):
    id = models.IntegerField(primary_key=True, auto_created=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    type = models.CharField(max_length=5)
    email = models.CharField(max_length=255, default="")

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['id']

class BookBorrow(models.Model):
    username = models.CharField(max_length=255)
    bookId = models.IntegerField()

    def __str__(self):
        return self.username
    
    class Meta:
        ordering = ['username']