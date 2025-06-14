from django.shortcuts import render
from .models import LibraryUser, Book, BookBorrow
from django.http import HttpResponse, JsonResponse, QueryDict

# Create your views here.

def index(request):
    return render(request, "home_page.html")

def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        passw = request.POST.get('password')
        users = LibraryUser.objects.all()

        if users.filter(name=username, password=passw).exists():
            Name = users.get(name=username, password=passw).name
            Type = users.get(name=username, password=passw).type
            return JsonResponse({'success': True, 'name': Name, 'type': Type})
        else:
            return JsonResponse({'success': False})
    else:
        return render(request, "login.html")

def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        e_mail = request.POST.get('email')
        passw = request.POST.get('password')
        Type = request.POST.get('type')

        users = LibraryUser.objects.all()
        if users.filter(name = username).exists():
            return JsonResponse({'success': False})
        else:
            student_instance = LibraryUser(name = username, email = e_mail, password = passw, type = Type)
            student_instance.save()
            return JsonResponse({'success': True})
    else:
        return render(request, "signup.html")

def available_User(request):
    return render(request, "available_books_user.html", {'allBooks': Book.objects.all()})

def available_Admin(request):
    return render(request, "available_books_admin.html", {'allBooks': Book.objects.all()})

def user_interface(request):
    return render(request, "user_panel.html")

def admin_interface(request):
    return render(request, "admin_panel.html")

def add_book(request):
    if request.method == 'POST':
        id = request.POST.get('id')
        name = request.POST.get('name')
        author = request.POST.get('author')
        category = request.POST.get('category')
        description = request.POST.get('description')

        books = Book.objects.all()
        if books.filter(id = id).exists():
            return JsonResponse({'success': False})
        else:
            book = Book(name = name, id = id, author = author, category = category, description = description)
            book.save()
            return JsonResponse({'success': True})
    else:
        return render(request, "add_book.html")

def book_profile(request, id):
    if request.method == 'POST':
        bookid = request.POST.get('id')
        name = request.POST.get('username')

        Book.objects.filter(id = bookid).update(available = False)
        borrow = BookBorrow(username = name, bookId = bookid)
        borrow.save()
        return JsonResponse({'success': True})
    else:
        return render(request, "book_profile.html", {'book': Book.objects.get(id=id)})

def borrowed(request, username):
    if request.method == 'POST':
        bookid = request.POST.get('id')
        name = request.POST.get('username')

        Book.objects.filter(id = bookid).update(available = True)
        BookBorrow.objects.get(username = name, bookId = bookid).delete()
        return JsonResponse({'success': True})
    else:
        borrowBooks = BookBorrow.objects.filter(username = username)
        borrowed = [borrowBook.bookId for borrowBook in borrowBooks]
        return render(request, "borrowed_books.html", {'borrowed': Book.objects.filter(id__in=borrowed)})

def edit_book(request, id):
    if request.method == 'POST':
        bookid = request.POST.get('id')
        name = request.POST.get('name')
        author = request.POST.get('author')
        category = request.POST.get('category')
        description = request.POST.get('description')
        Book.objects.filter(id = bookid).update(id = bookid, name = name, author = author, category = category, description = description)
        return JsonResponse({'success': True})

    elif request.method == 'DELETE':
        bookid = QueryDict(request.body).get('id')
        if(Book.objects.get(id = bookid).available == False):
            return JsonResponse({'success': False})
        else:
            Book.objects.get(id = bookid).delete()
            return JsonResponse({'success': True})

    else:
        return render(request, "edit_book.html", {'book': Book.objects.get(id=id)})

def search(request):
    if request.method == "POST":
        searched = request.POST['searchinput']
        type = request.POST['searchtype']
        results = Book.objects.filter(name__contains = searched)
        if type == 'title':
            results = Book.objects.filter(name__contains = searched)
        elif type == 'author':
            results = Book.objects.filter(author__contains = searched)
        else:
            results = Book.objects.filter(category__contains = searched)
        return render(request, 'search.html', {'input': searched, 'type': type, 'books': results})
    else:
        return render(request, "search.html", {})

