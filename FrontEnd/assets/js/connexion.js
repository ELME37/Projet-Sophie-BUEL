/**************************************************************************
* Déclarations des variables
*************************************************************************/
const login_notification = document.querySelector('.login_notification')
const email = document.getElementById('email');
const password = document.getElementById('password');
const btnLoginSubmit = document.getElementById('login__button')

/**************************************************************************
* Connexion login dans l'API
*************************************************************************/
async function getLogin () {
    return await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify ({
            "email": email.value,
            "password": password.value
        })  
    })
    .then(responseApi => responseApi.json())
    .catch(error => console.error(error))
}

/**************************************************************************
* Vérification des données de connexion au click du bouton "se connecter"
*************************************************************************/
btnLoginSubmit.addEventListener('click', async (event) => {
    event.preventDefault();
    const login = await getLogin()
    displayOnEditpage(login)
})
    
/**************************************************************************
* On retire le message d'erreur lors d'une modification des données email ou password
*************************************************************************/
email.addEventListener('input', () => {
    login_notification.innerHTML=""
})
password.addEventListener('input', () => {
    login_notification.innerHTML=""
})

/**************************************************************************
* Connexion à la page principale en mode édition
*************************************************************************/
function displayOnEditpage (dataApi) {

    //Déclarations des variables
    const loginToken = dataApi['token'];

    // Si token ok => connexion en mode édition
        if (loginToken!== undefined) {
            localStorage.setItem("loginToken", loginToken);
            setTimeout(() => {
                window.location.replace("./index.html")
            }, 1000);
        }
        else {
        
            // Si erreur identification alors message d'erreur
            window.localStorage.removeItem('loginToken')
            notification_error = document.createElement('p');
            notification_error.classList.add('notification-error');
            notification_error.innerHTML=`Erreur dans l’identifiant ou le mot de passe`;

            login_notification.appendChild(notification_error)
            window.localStorage.removeItem('loginToken')
        }
}

