/**
 * Déclarations des variables
 */
const login_notification = document.getElementById('login_notification')
const email = document.getElementById('email');
const password = document.getElementById('password');
const btnLoginSubmit = document.getElementById('login__button')

/**
* Connexion à la page principale en mode édition
*/
function displayOnEditpage (dataApi) {
    const loginToken = dataApi['token'];
        if (loginToken!== undefined) {
            localStorage.setItem("loginToken", loginToken);
            setTimeout(() => {
                window.location.replace("./index.html")
            }, 1000);
        }
        else {
            window.localStorage.removeItem('loginToken')
            notification_error = document.createElement('p');
            notification_error.classList.add('notification-error_login');
            notification_error.innerHTML=`Erreur dans l’identifiant ou le mot de passe`;

            login_notification.appendChild(notification_error)
            window.localStorage.removeItem('loginToken')
        }
}

/**
* Connexion login dans l'API
*/
function getLogin () {
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify ({
            "email": email.value,
            "password": password.value
        })  
    })
    .then((responseApi) => responseApi.json())
    .then((dataApi) => {
        displayOnEditpage (dataApi)
    })
    .catch((error) => {
        console.error(error)
    })
}

/**
* Vérification des données de connexion au click du bouton "se connecter"
*/
btnLoginSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    getLogin()
})
    
/**
* On retire le message d'erreur lors d'une modification des données email ou password
*/
email.addEventListener('input', () => {
    login_notification.innerHTML=""
})
password.addEventListener('input', () => {
    login_notification.innerHTML=""
})