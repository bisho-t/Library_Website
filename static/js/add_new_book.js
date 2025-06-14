let id = document.getElementsByClassName('bookid')[0];
let Bname = document.getElementsByClassName('bookname')[0];
let author = document.getElementsByClassName('author')[0];
let category = document.getElementsByClassName('category')[0];
let description = document.getElementsByClassName('description')[0];
let submit = document.getElementsByClassName('submit')[0];


submit.addEventListener('click', (e) =>{
    e.preventDefault();
    if(!id.value){
        alert("Please enter id for the book");
        return;
    }
    if(!Bname.value){
        alert("Please enter name for the book");
        return;
    }
    if(!author.value){
        alert("Please enter author for the book");
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
				alert("Book Added Successfully")
                location.href = '../'
			} else {
				alert("ID already exists, try another.");
			}
		}
	};
});