let borrow = document.getElementsByClassName('borrow')[0];
let availability = document.getElementsByClassName('availability')[0];
let logged = JSON.parse(window.sessionStorage.getItem('logged'));
let id = document.getElementsByClassName('id')[0];

if(availability.innerHTML == 'Not Available'){
    borrow.disabled = true;
    borrow.style.cssText = "background-color: #eee;  cursor: default;";
    button.addEventListener("mouseover", function() {
        borrow.style.cssText = "background-color: #eee;";
    });
}

borrow.addEventListener('click', (e)=>{
    e.preventDefault();
    let xhr = new XMLHttpRequest();
	xhr.open("POST", "");
	let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("X-CSRFToken", csrftoken);
	var data = "username=" + encodeURIComponent(logged.username) + "&id=" + encodeURIComponent(id.innerHTML);
	xhr.send(data);

	xhr.onload = function () {
		if (xhr.status === 200) {
			let response = JSON.parse(xhr.responseText);
			if (response.success) {
				alert("Book Borrowed Successfully")
                location.href = '../'
			} else {
				alert("Server Error, Please Try again.");
			}
		}
	};
});



