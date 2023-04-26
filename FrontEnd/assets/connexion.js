const btn = document.getElementById('login__button')

btn.addEventListener('click', () => {
    event.preventDefault();


const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

    fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify ({"email": email,"password": password})

    
})

.then((responseApi) => responseApi.json())
.then((dataApi) => {
    const loginToken = dataApi['token'];

    window.localStorage.setItem("loginToken", loginToken);
    setTimeout(() => {
        window.location.replace("./index.html")
    }, 1000);
})
.catch((error)=> {
    console.log(error)
})

})


    

  
