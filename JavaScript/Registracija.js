document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const registerData = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value
    };
    register(registerData);
})



function register(registerData){    
    const form = document.querySelector("#form");
    const message = document.createElement("div");

    fetch("https://www.fulek.com/data/api/user/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(registerData)
    })
    .then((response) => response.json())
    .then((result) => {
        if(result.isSuccess){
            message.style.color = "green";
            message.innerHTML = "Registracija uspješna,povratak na prijavu korisnika";
            form.after(message);
            setTimeout(() => {
                location.assign("/HTML/PrijaviSe.html");
            }, 3000);
        }
        else{
            message.style.color = "red";
            message.innerHTML = "Registracija nije uspjela";
            form.after(message);
            alert(result.errorMessages[0]);
        }  
    })
   
}