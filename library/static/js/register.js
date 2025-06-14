let username = document.getElementsByClassName('username')[0];
let email = document.getElementsByClassName('email')[0];
let password = document.getElementsByClassName('password')[0];
let confirmpass = document.getElementsByClassName('confirm-password')[0];
let select = document.getElementsByClassName('usertype')[0];
let submit = document.getElementsByClassName('signup-button')[0];

submit.addEventListener('click', (e) =>{
    e.preventDefault();
    
    if(!username.value){    
        alert("Please enter your username");
        return;
    }
    if(!email.value){
        alert("Please enter your email");
        return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        alert("Please enter a valid email address");
        return;
    }
    if(!password.value){
        alert("Please enter your password");
        return;
    }
    if(!confirmpass.value){
        alert("Please confirm your password");
        return;
    }
    if(password.value != confirmpass.value){
        alert("Passwords do not match");
        return;
    }

    let xhr = new XMLHttpRequest();
	xhr.open("POST", "");
	let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("X-CSRFToken", csrftoken);
	var data = "username=" + encodeURIComponent(username.value) + "&password=" + encodeURIComponent(password.value)
    + "&email=" + encodeURIComponent(email.value) + "&type=" + encodeURIComponent(select.value);
	xhr.send(data);

	xhr.onload = function () {
		if (xhr.status === 200) {
			let response = JSON.parse(xhr.responseText);
			if (response.success) {
				if(select.value === "Admin" || select.value === "admin"){
                    let logged = {'username' : username.value , 'type' : select.value}
                    window.sessionStorage.setItem("logged",JSON.stringify(logged));
                    window.location.href = "../admin_interface";
                }else{
                    let logged = {'username' : username.value , 'type' : select.value}
                    window.sessionStorage.setItem("logged",JSON.stringify(logged));
                    window.location.href = "../user_interface";
                }
			} else {
				alert("Username already exists, try another.");
			}
		}
	};
});
