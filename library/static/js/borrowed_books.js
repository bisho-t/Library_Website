let ids = document.getElementsByTagName("h6");
let views = document.getElementsByClassName("view");
let returns = document.getElementsByClassName("return");

for(let i = 0 ; i < views.length ; i++){
    views[i].addEventListener('click', (e)=>{
        e.preventDefault();
        let id = ids[i].innerHTML;
        location.href = 'http://127.0.0.1:8000/user_interface/available_books_user/'+id+'/';
    })

    returns[i].addEventListener('click', (e)=>{
        e.preventDefault();
        let id = ids[i].innerHTML;
        let logged = JSON.parse(window.sessionStorage.getItem('logged')).username;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "");
        let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
        var data = "username=" + encodeURIComponent(logged) + "&id=" + encodeURIComponent(id);
        xhr.send(data);

        xhr.onload = function () {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                if (response.success) {
                    alert("Book Returned Successfully");
                    location.href = '';
                } else {
                    alert("Can't Return, Please Try Again.");
                }
            }
        };
    })
}


