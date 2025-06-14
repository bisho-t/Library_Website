let username = document.getElementsByClassName('username')[0];
let password = document.getElementsByClassName('password')[0];
const submitBtn = document.getElementsByClassName("submit")[0];

submitBtn.addEventListener("click", (event) => {
	event.preventDefault();

	let xhr = new XMLHttpRequest();
	xhr.open("POST", "");
	let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("X-CSRFToken", csrftoken);
	var data = "username=" + encodeURIComponent(username.value) + "&password=" + encodeURIComponent(password.value);
	xhr.send(data);

	xhr.onload = function () {
		if (xhr.status === 200) {
			let response = JSON.parse(xhr.responseText);
			if (response.success) {
				if(response.type === "Admin" || response.type === "admin"){
                    let logged = {'username' : response.name , 'type' : response.type}
                    window.sessionStorage.setItem("logged",JSON.stringify(logged));
                    window.location.href = "../admin_interface";
                }else{
                    let logged = {'username' : response.name , 'type' : response.type}
                    window.sessionStorage.setItem("logged",JSON.stringify(logged));
                    window.location.href = "../user_interface";
                }
			} else {
				alert("Wrong Credentials. Please Try Again.");
			}
		}
	};

});