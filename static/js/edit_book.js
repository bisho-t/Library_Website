let id = document.getElementsByClassName('book_id')[0];
let Bname = document.getElementsByClassName('book_name')[0];
let author = document.getElementsByClassName('author')[0];
let category = document.getElementsByClassName('category')[0];
let description = document.getElementsByClassName('description')[0];
let submit = document.getElementsByClassName('submit')[0];
let deleteB = document.getElementsByClassName('delete')[0];

submit.addEventListener('click', (e)=>{
    e.preventDefault();
    if(!Bname.value){
        alert("Please enter book name");
        return;
    }
    if(!author.value){
        alert("Please enter book author");
        return;
    }
    if(!category.value){
        alert("Please write book category")
    }
    if(!description.value){
        alert("Please write description for the book");
        return;
    }

    let xhr = new XMLHttpRequest();
	xhr.open("POST", "");
	let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("X-CSRFToken", csrftoken);
	var data = "id=" + encodeURIComponent(id.value) + "&name=" + encodeURIComponent(Bname.value)
    + "&author=" + encodeURIComponent(author.value) + "&category=" + encodeURIComponent(category.value)
    + "&description=" + encodeURIComponent(description.value);
	xhr.send(data);

	xhr.onload = function () {
		if (xhr.status === 200) {
			let response = JSON.parse(xhr.responseText);
			if (response.success) {
				alert("Book Edited Successfully")
                location.href = '../'
			} else {
				alert("Server Error, Please Try again.");
			}
		}
	};
});

deleteB.addEventListener('click', (e)=>{
    e.preventDefault();
    let xhr = new XMLHttpRequest();
	xhr.open("DELETE", "");
	let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("X-CSRFToken", csrftoken);
	var data = "id=" + encodeURIComponent(id.value);
	xhr.send(data);

	xhr.onload = function () {
		if (xhr.status === 200) {
			let response = JSON.parse(xhr.responseText);
			if (response.success) {
				alert("Book Deleted Successfully")
                location.href = '../'
			} else {
				alert("Book can't be deleted if it borrowed by user");
			}
		}
	};
})