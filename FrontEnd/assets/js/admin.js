
/**************************************************************************
 * Déclarations des variables
 *************************************************************************/

const token = window.localStorage.getItem('loginToken');

const edition = document.getElementById('edition');

const modal_projets = document.querySelector('.modal')
const modal_addprojet = document.querySelector('.modal-photo')
let containerModalProjet = null

const change__figure = document.getElementById('change__figure')
const change__text = document.getElementById('change__text')
const change__projet = document.getElementById('change__projet')

let image = null;
let title_image = null;
let categories_imageId = null;
let modal_image = null;
let dataNewProjet = null;

let category_image = null;
let modal_gallery = null;
let container_image = null;
let btnfile = null;
let myfile = null;
let file_notification = null;

/**************************************************************************
* Envoi ou suppression des données dans l'API
 *************************************************************************/

/**********
* Suppression des travaux dans l'API
**********/
async function deleteWorks (workID, workName) {

    return await fetch(`http://localhost:5678/api/works/${workID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
    })
    .then(response => {
        removeWorkOnModalProjets(workID)
        removeWorkOnHomeProjets(workID)
        alert(`Le projet ${workName} n°${workID} a été supprimé`)
    })
    .catch(error => console.error(error))
}

/**********
* Envoi de nouveaux travaux dans l'API
**********/
async function newWorks () {

    image = document.getElementById('file').files[0];
    imageUrl = document.querySelector('.modal_image').src;
    title_image = document.getElementById('title_image').value;
    categories_imageId = document.getElementById('category_image').value;

    const formData = new FormData();
        formData.append('image' , image);
        formData.append('title' , title_image );
        formData.append('category' , categories_imageId );
    
        return await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {"Authorization" : `Bearer ${token}`},
            body: formData
        })
        .then(response => response.json())
        .catch(error => console.log(error))
}

/**************************************************************************
 * Vérification si token est ok
*************************************************************************/
const isEditMode = () => {
    return token !== null && token !== 'undefined'   
}

if (isEditMode()) {

    // Appel de la fonction pour que la page principale soit en mode édition
    displayEditModeOnHomepage()
    
    const log = document.getElementById('log')
    log.innerHTML = `logout`
}

/**************************************************************************
 * Login / Logout
*************************************************************************/
function loginlogout (){
    if (log.innerHTML == 'login') {
        window.location.replace("./connexion.html")
    }
    else if(log.innerHTML == 'logout') {
        window.localStorage.clear();
        log.innerHTML = `login`
        document.location.href='index.html'
    } 
}

// Se connecte ou déconnecte au click
log.addEventListener('click', () => {loginlogout()})

/**************************************************************************
 * Initialisation de la page principal en mode édition
 *************************************************************************/
function displayEditModeOnHomepage() {

    // Création du bandeau édition en haut de page
    const button__edition = document.createElement('div')
        button__edition.classList.add('button__edition')
        edition.appendChild(button__edition)


    // Création du bouton "Mode édition" du bandeau édition en haut de page    
    const mode__edition = document.createElement('div')
        mode__edition.classList.add('mode__edition')
        mode__edition.innerHTML = `
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.90827 5.6194L7.0677 7.45996C6.3896 8.13807 5.70762 8.81617 5.03339 9.50203C4.87452 9.66477 4.7544 9.88177 4.7079 10.0949C4.46378 11.2147 4.22741 12.3346 3.99104 13.4544L3.8593 14.0744C3.7973 14.3766 3.87867 14.6789 4.08404 14.8842C4.24291 15.0431 4.46378 15.1322 4.69627 15.1322C4.76214 15.1322 4.82802 15.1245 4.89389 15.1129L5.57587 14.9695C6.66084 14.7409 7.74968 14.5084 8.83465 14.2836C9.08652 14.2294 9.29963 14.117 9.48175 13.9349C12.5274 10.8854 15.5731 7.8397 18.6187 4.79792C18.8435 4.57318 18.9675 4.30581 18.9985 3.97645C19.0023 3.9222 18.9985 3.86795 18.9868 3.81758C18.9675 3.74008 18.952 3.65871 18.9326 3.58121C18.89 3.38359 18.8435 3.15885 18.7505 2.94185C18.1809 1.63989 17.2354 0.709921 15.9412 0.186812C15.6816 0.0821901 15.4065 0.0473162 15.1662 0.0163172L15.1003 0.00856739C14.7516 -0.0340563 14.4339 0.0821901 14.1587 0.361182C12.415 2.11263 10.6597 3.86795 8.90827 5.6194ZM14.9725 0.942414C14.9802 0.942414 14.9841 0.942414 14.9918 0.942414L15.0577 0.950164C15.2592 0.973413 15.4452 0.996662 15.5924 1.05866C16.6464 1.4849 17.4214 2.24437 17.8903 3.31384C17.9445 3.43784 17.9794 3.59671 18.0142 3.76333C18.0259 3.82533 18.0414 3.88732 18.053 3.94932C18.0375 4.01907 18.0104 4.06557 17.9561 4.11594C14.9066 7.15772 11.8609 10.2073 8.81527 13.2529C8.7649 13.3033 8.7184 13.3265 8.64865 13.342C7.55981 13.5707 6.47484 13.7993 5.386 14.0279L4.81252 14.148L4.92102 13.6404C5.15738 12.5244 5.39375 11.4046 5.63399 10.2886C5.64174 10.2538 5.67274 10.1995 5.70762 10.1608C6.38185 9.47878 7.05608 8.80067 7.73418 8.12644L9.57475 6.28588C11.3301 4.53055 13.0854 2.77523 14.8368 1.01604C14.9105 0.954039 14.9453 0.942414 14.9725 0.942414Z" fill="white"/>
            <path d="M1.50733 4.22446H8.27287C8.53637 4.22446 8.74949 4.01134 8.74949 3.74785C8.74949 3.48436 8.53637 3.27124 8.27287 3.27124H1.50733C0.67423 3.27124 0 3.94934 0 4.77857V17.4649C0 18.298 0.678105 18.9723 1.50733 18.9723H14.1898C15.0229 18.9723 15.6971 18.2942 15.6971 17.4649V10.9745C15.6971 10.711 15.484 10.4979 15.2205 10.4979C14.957 10.4979 14.7439 10.711 14.7439 10.9745V17.4649C14.7439 17.7711 14.4921 18.0229 14.1859 18.0229H1.50733C1.20121 18.0229 0.949346 17.7711 0.949346 17.4649V4.78244C0.949346 4.47633 1.20121 4.22446 1.50733 4.22446Z" fill="white"/>
            </svg>
            <button>Mode édition</button>`
        button__edition.appendChild(mode__edition)


    // Création du bouton "Publication des changements" du bandeau édition en haut de page
    const button__publication = document.createElement('button')
        button__publication.classList.add('button__publication')
        button__publication.innerHTML = `publier les changements`
        button__edition.appendChild(button__publication)


    // Edition de la photo de présentation
    const btnfigure = document.createElement('div')
        btnfigure.classList.add('change__button')
        btnfigure.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.43856 5.32321L6.69501 7.06676C6.05264 7.70912 5.40661 8.35149 4.76792 9.00119C4.61742 9.15536 4.50363 9.36091 4.45958 9.5628C4.22833 10.6236 4.00442 11.6844 3.78051 12.7452L3.65571 13.3325C3.59698 13.6189 3.67407 13.9052 3.86861 14.0997C4.01911 14.2502 4.22833 14.3346 4.44857 14.3346C4.51097 14.3346 4.57337 14.3273 4.63577 14.3163L5.28181 14.1805C6.30959 13.9639 7.34104 13.7437 8.36882 13.5308C8.60741 13.4794 8.8093 13.3729 8.98182 13.2004C11.8669 10.3116 14.7521 7.42648 17.6372 4.54503C17.8501 4.33213 17.9676 4.07886 17.9969 3.76685C18.0006 3.71546 17.9969 3.66408 17.9859 3.61636C17.9676 3.54294 17.9529 3.46586 17.9345 3.39245C17.8941 3.20524 17.8501 2.99235 17.762 2.78679C17.2224 1.55346 16.3268 0.672502 15.1008 0.176965C14.8548 0.077858 14.5942 0.0448222 14.3667 0.0154571L14.3043 0.00811581C13.9739 -0.0322613 13.6729 0.077858 13.4123 0.342144C11.7605 2.00127 10.0977 3.66408 8.43856 5.32321ZM14.1831 0.892741C14.1905 0.892741 14.1941 0.892741 14.2015 0.892741L14.2639 0.900082C14.4547 0.922106 14.6309 0.94413 14.7704 1.00286C15.7688 1.40663 16.503 2.12608 16.9471 3.13917C16.9985 3.25663 17.0315 3.40713 17.0646 3.56497C17.0756 3.6237 17.0903 3.68243 17.1013 3.74116C17.0866 3.80723 17.0609 3.85128 17.0095 3.899C14.1207 6.78045 11.2356 9.66925 8.35047 12.5544C8.30275 12.6021 8.2587 12.6241 8.19263 12.6388C7.16118 12.8554 6.1334 13.0719 5.10195 13.2885L4.55869 13.4023L4.66147 12.9214C4.88538 11.8643 5.10929 10.8035 5.33687 9.74633C5.34421 9.71329 5.37357 9.6619 5.40661 9.6252C6.0453 8.97917 6.68399 8.3368 7.32636 7.69811L9.06991 5.95456C10.7327 4.29176 12.3955 2.62895 14.0546 0.962483C14.1244 0.903753 14.1574 0.892741 14.1831 0.892741Z" fill="black"/>
            <path d="M1.42788 4.00179H7.83682C8.08643 4.00179 8.28831 3.79991 8.28831 3.55031C8.28831 3.3007 8.08643 3.09882 7.83682 3.09882H1.42788C0.638692 3.09882 0 3.74118 0 4.5267V16.5444C0 17.3336 0.642363 17.9723 1.42788 17.9723H13.4419C14.2311 17.9723 14.8698 17.3299 14.8698 16.5444V10.3961C14.8698 10.1465 14.6679 9.94456 14.4183 9.94456C14.1687 9.94456 13.9668 10.1465 13.9668 10.3961V16.5444C13.9668 16.8344 13.7282 17.073 13.4382 17.073H1.42788C1.1379 17.073 0.899308 16.8344 0.899308 16.5444V4.53037C0.899308 4.24039 1.1379 4.00179 1.42788 4.00179Z" fill="black"/>
            </svg>
            <button>modifier</button>`
        change__figure.appendChild(btnfigure)


    // Edition du texte de présentation
    const btntext = document.createElement('div')
        btntext.classList.add('change__button')
        btntext.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.43856 5.32321L6.69501 7.06676C6.05264 7.70912 5.40661 8.35149 4.76792 9.00119C4.61742 9.15536 4.50363 9.36091 4.45958 9.5628C4.22833 10.6236 4.00442 11.6844 3.78051 12.7452L3.65571 13.3325C3.59698 13.6189 3.67407 13.9052 3.86861 14.0997C4.01911 14.2502 4.22833 14.3346 4.44857 14.3346C4.51097 14.3346 4.57337 14.3273 4.63577 14.3163L5.28181 14.1805C6.30959 13.9639 7.34104 13.7437 8.36882 13.5308C8.60741 13.4794 8.8093 13.3729 8.98182 13.2004C11.8669 10.3116 14.7521 7.42648 17.6372 4.54503C17.8501 4.33213 17.9676 4.07886 17.9969 3.76685C18.0006 3.71546 17.9969 3.66408 17.9859 3.61636C17.9676 3.54294 17.9529 3.46586 17.9345 3.39245C17.8941 3.20524 17.8501 2.99235 17.762 2.78679C17.2224 1.55346 16.3268 0.672502 15.1008 0.176965C14.8548 0.077858 14.5942 0.0448222 14.3667 0.0154571L14.3043 0.00811581C13.9739 -0.0322613 13.6729 0.077858 13.4123 0.342144C11.7605 2.00127 10.0977 3.66408 8.43856 5.32321ZM14.1831 0.892741C14.1905 0.892741 14.1941 0.892741 14.2015 0.892741L14.2639 0.900082C14.4547 0.922106 14.6309 0.94413 14.7704 1.00286C15.7688 1.40663 16.503 2.12608 16.9471 3.13917C16.9985 3.25663 17.0315 3.40713 17.0646 3.56497C17.0756 3.6237 17.0903 3.68243 17.1013 3.74116C17.0866 3.80723 17.0609 3.85128 17.0095 3.899C14.1207 6.78045 11.2356 9.66925 8.35047 12.5544C8.30275 12.6021 8.2587 12.6241 8.19263 12.6388C7.16118 12.8554 6.1334 13.0719 5.10195 13.2885L4.55869 13.4023L4.66147 12.9214C4.88538 11.8643 5.10929 10.8035 5.33687 9.74633C5.34421 9.71329 5.37357 9.6619 5.40661 9.6252C6.0453 8.97917 6.68399 8.3368 7.32636 7.69811L9.06991 5.95456C10.7327 4.29176 12.3955 2.62895 14.0546 0.962483C14.1244 0.903753 14.1574 0.892741 14.1831 0.892741Z" fill="black"/>
            <path d="M1.42788 4.00179H7.83682C8.08643 4.00179 8.28831 3.79991 8.28831 3.55031C8.28831 3.3007 8.08643 3.09882 7.83682 3.09882H1.42788C0.638692 3.09882 0 3.74118 0 4.5267V16.5444C0 17.3336 0.642363 17.9723 1.42788 17.9723H13.4419C14.2311 17.9723 14.8698 17.3299 14.8698 16.5444V10.3961C14.8698 10.1465 14.6679 9.94456 14.4183 9.94456C14.1687 9.94456 13.9668 10.1465 13.9668 10.3961V16.5444C13.9668 16.8344 13.7282 17.073 13.4382 17.073H1.42788C1.1379 17.073 0.899308 16.8344 0.899308 16.5444V4.53037C0.899308 4.24039 1.1379 4.00179 1.42788 4.00179Z" fill="black"/>
            </svg>
            <button>modifier</button>`
        change__text.appendChild(btntext)


    // Edition des projets
    const btnProjet = document.createElement('div')
        btnProjet.classList.add('change__button')
        btnProjet.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.43856 5.32321L6.69501 7.06676C6.05264 7.70912 5.40661 8.35149 4.76792 9.00119C4.61742 9.15536 4.50363 9.36091 4.45958 9.5628C4.22833 10.6236 4.00442 11.6844 3.78051 12.7452L3.65571 13.3325C3.59698 13.6189 3.67407 13.9052 3.86861 14.0997C4.01911 14.2502 4.22833 14.3346 4.44857 14.3346C4.51097 14.3346 4.57337 14.3273 4.63577 14.3163L5.28181 14.1805C6.30959 13.9639 7.34104 13.7437 8.36882 13.5308C8.60741 13.4794 8.8093 13.3729 8.98182 13.2004C11.8669 10.3116 14.7521 7.42648 17.6372 4.54503C17.8501 4.33213 17.9676 4.07886 17.9969 3.76685C18.0006 3.71546 17.9969 3.66408 17.9859 3.61636C17.9676 3.54294 17.9529 3.46586 17.9345 3.39245C17.8941 3.20524 17.8501 2.99235 17.762 2.78679C17.2224 1.55346 16.3268 0.672502 15.1008 0.176965C14.8548 0.077858 14.5942 0.0448222 14.3667 0.0154571L14.3043 0.00811581C13.9739 -0.0322613 13.6729 0.077858 13.4123 0.342144C11.7605 2.00127 10.0977 3.66408 8.43856 5.32321ZM14.1831 0.892741C14.1905 0.892741 14.1941 0.892741 14.2015 0.892741L14.2639 0.900082C14.4547 0.922106 14.6309 0.94413 14.7704 1.00286C15.7688 1.40663 16.503 2.12608 16.9471 3.13917C16.9985 3.25663 17.0315 3.40713 17.0646 3.56497C17.0756 3.6237 17.0903 3.68243 17.1013 3.74116C17.0866 3.80723 17.0609 3.85128 17.0095 3.899C14.1207 6.78045 11.2356 9.66925 8.35047 12.5544C8.30275 12.6021 8.2587 12.6241 8.19263 12.6388C7.16118 12.8554 6.1334 13.0719 5.10195 13.2885L4.55869 13.4023L4.66147 12.9214C4.88538 11.8643 5.10929 10.8035 5.33687 9.74633C5.34421 9.71329 5.37357 9.6619 5.40661 9.6252C6.0453 8.97917 6.68399 8.3368 7.32636 7.69811L9.06991 5.95456C10.7327 4.29176 12.3955 2.62895 14.0546 0.962483C14.1244 0.903753 14.1574 0.892741 14.1831 0.892741Z" fill="black"/>
            <path d="M1.42788 4.00179H7.83682C8.08643 4.00179 8.28831 3.79991 8.28831 3.55031C8.28831 3.3007 8.08643 3.09882 7.83682 3.09882H1.42788C0.638692 3.09882 0 3.74118 0 4.5267V16.5444C0 17.3336 0.642363 17.9723 1.42788 17.9723H13.4419C14.2311 17.9723 14.8698 17.3299 14.8698 16.5444V10.3961C14.8698 10.1465 14.6679 9.94456 14.4183 9.94456C14.1687 9.94456 13.9668 10.1465 13.9668 10.3961V16.5444C13.9668 16.8344 13.7282 17.073 13.4382 17.073H1.42788C1.1379 17.073 0.899308 16.8344 0.899308 16.5444V4.53037C0.899308 4.24039 1.1379 4.00179 1.42788 4.00179Z" fill="black"/>
            </svg>
            <button>modifier</button>`
        change__projet.appendChild(btnProjet)

    // Affiche la modal avec les projets en cours
    btnProjet.addEventListener('click' , () => {
        openModalProjets()
        closeClickExceptModalProjets()
})
        
    // on retire les filtres
    //categories.classList.add('inactive')

    //Initialisation des variables
    category_image = document.getElementById('category_image')
    modal_gallery = document.getElementById('modal-gallery')
}

/**************************************************************************
 * Affichage des données dans la modal projets
 *************************************************************************/

/**********
* Loader modal projets
**********/
function displayLoaderModalProjets() {
    
    // Initialisation des variables
    modal_gallery = document.getElementById('modal-gallery')

    // Réinitialise la liste des travaux 
    modal_gallery.innerHTML=''

    // Création du loader
    const load = document.createElement('div')
        load.classList.add('container-loaderModalProjets')
        load.innerHTML=`
            <div class="loading">Loading</div>
            <div class="loader"></div>`

    modal_gallery.appendChild(load)
}

/**********
* Initialisation de la modal projets
**********/
function displayEditModalProjets () {

    //Affichage de la modal projets
    modal_projets.classList.add('active')

    // Création des élements de la modal projets
    const modal_projets_container = document.createElement('div')
    modal_projets_container.classList.add('modal-container__add')

    modal_projets_container.innerHTML=`
    <button class="btnclose__add"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.41 7L12.71 2.71C12.8983 2.5217 13.0041 2.2663 13.0041 2C13.0041 1.7337 12.8983 1.47831 12.71 1.29C12.5217 1.1017 12.2663 0.995911 12 0.995911C11.7337 0.995911 11.4783 1.1017 11.29 1.29L7 5.59L2.71 1.29C2.5217 1.1017 2.2663 0.995911 2 0.995911C1.7337 0.995911 1.4783 1.1017 1.29 1.29C1.1017 1.47831 0.995908 1.7337 0.995908 2C0.995908 2.2663 1.1017 2.5217 1.29 2.71L5.59 7L1.29 11.29C1.19627 11.383 1.12188 11.4936 1.07111 11.6154C1.02034 11.7373 0.994202 11.868 0.994202 12C0.994202 12.132 1.02034 12.2627 1.07111 12.3846C1.12188 12.5064 1.19627 12.617 1.29 12.71C1.38296 12.8037 1.49356 12.8781 1.61542 12.9289C1.73728 12.9797 1.86799 13.0058 2 13.0058C2.13201 13.0058 2.26272 12.9797 2.38458 12.9289C2.50644 12.8781 2.61704 12.8037 2.71 12.71L7 8.41L11.29 12.71C11.383 12.8037 11.4936 12.8781 11.6154 12.9289C11.7373 12.9797 11.868 13.0058 12 13.0058C12.132 13.0058 12.2627 12.9797 12.3846 12.9289C12.5064 12.8781 12.617 12.8037 12.71 12.71C12.8037 12.617 12.8781 12.5064 12.9289 12.3846C12.9797 12.2627 13.0058 12.132 13.0058 12C13.0058 11.868 12.9797 11.7373 12.9289 11.6154C12.8781 11.4936 12.8037 11.383 12.71 11.29L8.41 7Z"
                        fill="black" />
                </svg>
            </button>
            <p class="modal-titre">Galerie photo</p>
            <div id="modal-gallery"></div>
            <div class="lign"></div>
            <button class="btnadd">Ajouter une photo</button>
            <button class="btndeleate">Suprimer la galerie</button>`

    modal_projets.appendChild(modal_projets_container)

    // Initialisation de la fermeture de la modal projets
    modal_projets_container.querySelector('.btnclose__add').addEventListener('click', () => {
        closeModalProjets()
    })

    // Affiche la modal pour ajouter un nouveau projet
    modal_projets_container.querySelector('.btnadd').addEventListener('click' , () => {
       // closeModalProjets()
       modal_projets.classList.remove('active')
        openModalNewProjet()
        closeClickExceptModalNewProjet()
    })
}

/**********
* Affichage les projets en cours dans la modal projets
**********/
function displayWorksOnModalProjets (dataGallery) {

    // Initialisation des variables
    modal_gallery = document.getElementById('modal-gallery')

    // Réinitialise la liste des travaux dans la modal projets
    modal_gallery.innerHTML = ''
    
    // Affiche la liste des projets
    for (let i = 0; i < dataGallery.length; i++) {
        const articlemodal = document.createElement('article')
        articlemodal.classList.add('modal-article')
        articlemodal.setAttribute('id', dataGallery[i].id)
        articlemodal.innerHTML = `
            <div class="image_gallery">
                <img src="${dataGallery[i].imageUrl}" alt="${dataGallery[i].title}">
                <button class="btndeleteprojet">
                    <svg class="image_delete" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.6 1.8V0.9C6.6 0.402944 6.19704 0 5.7 0H3.3C2.80294 0 2.4 0.402944 2.4 0.9V1.8H0V2.4H0.6V8.1C0.6 8.59704 1.00294 9 1.5 9H7.5C7.99704 9 8.4 8.59704 8.4 8.1V2.4H9V1.8H6.6ZM3 0.9C3 0.734316 3.13432 0.6 3.3 0.6H5.7C5.86568 0.6 6 0.734316 6 0.9V1.8H3V0.9ZM4.2 4.2V7.2H4.8V4.2H4.2ZM2.4 7.2V5.4H3V7.2H2.4ZM6 5.4V7.2H6.6V5.4H6Z" fill="white"/>
                    </svg>
                </button>
            </div>
            <p class="text">éditer</p>`
    
        modal_gallery.appendChild(articlemodal)

        // Suppression des travaux sur le site
        articlemodal.querySelector('button').addEventListener('click', async (event) => {
            //event.preventDefault()
            await deleteWorks(dataGallery[i].id, dataGallery[i].title);
        })
    }
}

/**********
* Supprime le projet dans la galerie
**********/
function removeWorkOnHomeProjets(workID) {
    const selectProjetGallery = document.querySelector(`#gallery .gallery-article[id="${workID}"]`);
    selectProjetGallery.remove()
}

/**********
* Supprime le projet dans la modal
**********/
function removeWorkOnModalProjets(workID) {
    const selectProjetModal = document.querySelector(`#modal-gallery .modal-article[id="${workID}"]`);
    selectProjetModal.remove()
}

/**********
* Ferme la modal projets avec la croix
**********/
async function closeModalProjets () {
    modal_projets.innerHTML = ""
    modal_projets.classList.remove('active')
}

/**********
* Ferme la modal projets en cliquant hors de la modal
**********/
function closeClickExceptModalProjets() {
    modal_projets.addEventListener("click", event => closeModalProjets())
    modal_projets.querySelector('.modal-container__add').addEventListener("click", stopPropagationProjet)
}    

/**********
* Stop la propagation du click pour la fermeture de la modal projets
**********/
function stopPropagationProjet (event) {
    event.stopPropagation()
}

/**********
* Ouverture de la modal projets
**********/
async function openModalProjets (){

    // Appel de la fonction pour initialiser la modal projets
    displayEditModalProjets()

    // Appel du loader modal projets
    displayLoaderModalProjets()

    //Appel de la fonction pour afficher les travaux dans la modal projets
    setTimeout(async () => {
        const works = await getWorks();
        displayWorksOnModalProjets(works)
    }, 1000) 
}

/**************************************************************************
 * Affichage des données dans la modal new projet
 *************************************************************************/

/**********
* Initialisation de la modal new projet
**********/
function displayEditModalNewProjet () {

    //Affichage de la modal new projet
    modal_addprojet.classList.add('active')

    // Création des élements de la modal new projet
    const modal_addprojet_container = document.createElement('div')
        modal_addprojet_container.classList.add('modal-container__photo')
        modal_addprojet_container.innerHTML=`
            <button class="btnbacktrack" ><svg width="21" height="15" viewBox="0 0 21 15" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.3459 6.91164H2.14392L7.58919 1.48731C7.84495 1.23155 7.84495 0.817527 7.58919 0.562423C7.33343 0.306666 6.9194 0.306666 6.6643 0.562423L0.188882 7.03724C-0.0629605 7.28908 -0.0629605 7.71028 0.188882 7.96213L6.66436 14.4376C6.92011 14.6934 7.33414 14.6934 7.58924 14.4376C7.845 14.1818 7.845 13.7678 7.58924 13.5127L2.14392 8.21979H20.3459C20.7069 8.21979 20.9999 7.92673 20.9999 7.56571C20.9999 7.2047 20.7069 6.91164 20.3459 6.91164Z"
                        fill="black" />
                </svg>
            </button>
            <button class="btnclose__photo"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.41 7L12.71 2.71C12.8983 2.5217 13.0041 2.2663 13.0041 2C13.0041 1.7337 12.8983 1.47831 12.71 1.29C12.5217 1.1017 12.2663 0.995911 12 0.995911C11.7337 0.995911 11.4783 1.1017 11.29 1.29L7 5.59L2.71 1.29C2.5217 1.1017 2.2663 0.995911 2 0.995911C1.7337 0.995911 1.4783 1.1017 1.29 1.29C1.1017 1.47831 0.995908 1.7337 0.995908 2C0.995908 2.2663 1.1017 2.5217 1.29 2.71L5.59 7L1.29 11.29C1.19627 11.383 1.12188 11.4936 1.07111 11.6154C1.02034 11.7373 0.994202 11.868 0.994202 12C0.994202 12.132 1.02034 12.2627 1.07111 12.3846C1.12188 12.5064 1.19627 12.617 1.29 12.71C1.38296 12.8037 1.49356 12.8781 1.61542 12.9289C1.73728 12.9797 1.86799 13.0058 2 13.0058C2.13201 13.0058 2.26272 12.9797 2.38458 12.9289C2.50644 12.8781 2.61704 12.8037 2.71 12.71L7 8.41L11.29 12.71C11.383 12.8037 11.4936 12.8781 11.6154 12.9289C11.7373 12.9797 11.868 13.0058 12 13.0058C12.132 13.0058 12.2627 12.9797 12.3846 12.9289C12.5064 12.8781 12.617 12.8037 12.71 12.71C12.8037 12.617 12.8781 12.5064 12.9289 12.3846C12.9797 12.2627 13.0058 12.132 13.0058 12C13.0058 11.868 12.9797 11.7373 12.9289 11.6154C12.8781 11.4936 12.8037 11.383 12.71 11.29L8.41 7Z"
                        fill="black" />
                </svg>
            </button>
            <p class="modal-titre">Ajout photo</p>
            <div class="container-image">

                <input type="file" id="file" name="file" accept="images/*" hidden >
                <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M57 6H1C0.448 6 0 6.447 0 7V51C0 51.553 0.448 52 1 52H57C57.552 52 58 51.553 58 51V7C58 6.447 57.552 6 57 6ZM56 50H2V8H56V50Z"
                        fill="#B9C5CC" />
                    <path
                        d="M16 28.138C19.071 28.138 21.569 25.64 21.569 22.57C21.569 19.498 19.071 17 16 17C12.929 17 10.431 19.498 10.431 22.569C10.431 25.64 12.929 28.138 16 28.138ZM16 19C17.968 19 19.569 20.602 19.569 22.569C19.569 24.536 17.968 26.138 16 26.138C14.032 26.138 12.431 24.537 12.431 22.57C12.431 20.603 14.032 19 16 19Z"
                        fill="#B9C5CC" />
                    <path
                        d="M7.00004 46C7.23404 46 7.47004 45.918 7.66004 45.751L23.973 31.389L34.275 41.69C34.666 42.081 35.298 42.081 35.689 41.69C36.08 41.299 36.08 40.667 35.689 40.276L30.882 35.469L40.063 25.415L51.324 35.738C51.731 36.111 52.364 36.083 52.737 35.676C53.11 35.269 53.083 34.636 52.675 34.263L40.675 23.263C40.479 23.084 40.218 22.995 39.955 23.001C39.69 23.013 39.44 23.13 39.261 23.326L29.467 34.053L24.724 29.31C24.35 28.937 23.752 28.918 23.356 29.266L6.33904 44.249C5.92404 44.614 5.88404 45.246 6.24904 45.661C6.44704 45.886 6.72304 46 7.00004 46Z"
                        fill="#B9C5CC" />
                </svg>
                <button class="btnimage">+ Ajouter photo</button>
                <p class="infomax">jpg, png : 4mo max</p>

            </div>
            <div class="file_notification"></div>
            <form class="form-photo" action="#" method="post"> 
                <label class="photo__label" for="title_image">Titre</label>
                <input class="photo__input" type="text" name="title" id="title_image">
                <label class="photo__label" for="category_image">Catégorie</label>
                <select class="photo__input" type="text" name="category" id="category_image">
                </select>
                <div class="lign"></div>
                <div class="file_notificationvalidation"></div>
                <button class="btnvalidation">Valider</button>
            </form>`

    modal_addprojet.appendChild(modal_addprojet_container)

    // Initialisation des Event Listener aux boutons de la modal new projets
    modal_addprojet_container.querySelector('.btnbacktrack').addEventListener('click', () => {backModalProjets()})
    modal_addprojet_container.querySelector('.btnclose__photo').addEventListener('click', () => {
        closeModalNewProjet()
        modal_projets.innerHTML=""
    })
    modal_addprojet_container.querySelector('.btnimage').addEventListener('click', () => {
        modal_addprojet_container.querySelector('#file').click()})
    modal_addprojet_container.querySelector('#file').addEventListener('change', () => {uploadImage()})

    // Vérification des champs de la modal new projet
    modal_addprojet_container.querySelector('#title_image').addEventListener('change', () => {
        if (modal_addprojet_container.querySelector('#title_image').value != "" && 
        modal_addprojet_container.querySelector('#file').value != "" ) {
            modal_addprojet_container.querySelector('.btnvalidation').classList.add('actif')
        }
        else {
            modal_addprojet_container.querySelector('.btnvalidation').classList.remove('actif')
        }
    })

    // Gestion de la notification d'erreur dans le formulaire
    modal_addprojet_container.querySelector('#file').addEventListener('change', () => {
        if (modal_addprojet_container.querySelector('#file').value != "" &&
        modal_addprojet_container.querySelector('#title_image').value != "") {
            modal_addprojet_container.querySelector('.btnvalidation').classList.add('actif')
            modal_addprojet_container.querySelector('.file_notificationvalidation').innerHTML=""
        }
    })
    modal_addprojet_container.querySelector('#title_image').addEventListener('input', () => {
        modal_addprojet_container.querySelector('.file_notificationvalidation').innerHTML=""
    })
    modal_addprojet_container.querySelector('#file').addEventListener('input', () => {
        modal_addprojet_container.querySelector('.file_notificationvalidation').innerHTML=""
    })

    //Check data new projet
    modal_addprojet_container.querySelector('.btnvalidation').addEventListener('click', (event) => {
       event.preventDefault()
        checkDataNewProjet()
        resetFormNewProjet()
        resetImageNewProjet()
    })
}

/**********
* Gestion de l'image dans la modal new projet
**********/
function uploadImage () {

    // Initialisation des variables
    container_image = document.querySelector('.container-image')
    btnfile = document.querySelector('#file')
    myfile = btnfile.files[0];
    file_notification = document.querySelector('.file_notification')
 
    //Création de l'image
    modal_image = document.createElement('img');
    modal_image.classList.add('modal_image')
    container_image.appendChild(modal_image)
    
    //Lecture de l'image
    const reader = new FileReader();

    // Réinitialise la notification
    file_notification.innerHTML = ""

    if (myfile) {

        // Vérification que le fichier est inférieur à 4 mo max
        const SIZE_4MO = 4194304;

        // Vérification que le fichier à JPG/JPEG et PNG en format UNIQUEMENT
        const type_JPG = "image/jpg"
        const type_JPEG = "image/jpeg"
        const type_PNG = "image/png"

        //Vérification si le fichier est au bon format et taille
        if(myfile.type == type_PNG || myfile.type == type_JPG || myfile.type == type_JPEG){
            if(myfile.size <= SIZE_4MO ){

            //Lecture du fichier
            reader.readAsDataURL(myfile);
            file_notification.innerHTML = ""
            container_image.querySelector('svg').remove()
            container_image.querySelector('.btnimage').remove()
            container_image.querySelector('.infomax').remove()
            }
            else {

            // Reset de l'input et notification de l'erreur sur la taille du fichier
            btnfile.value = "" 
            //modal_image.remove()
            notification_error = document.createElement('p')
            notification_error.classList.add('notification-error')
            notification_error.innerHTML=`La taille du fichier dépasse 4Mo`;
            file_notification.appendChild(notification_error)
            }

        } else {
        
            // Reset de l'input et notification de l'erreur sur le format du fichier
            btnfile.value = ""
            modal_image.remove()
            notification_error = document.createElement('p')
            notification_error.classList.add('notification-error')
            notification_error.innerHTML=`Le fichier n'est pas au format JPG/JPEG ou PNG`;
            file_notification.appendChild(notification_error)   
        }

    } else {
        // Si il n'y a pas de fichier on vide la source de l'image est réinitialisée
        modal_image.remove();
    }

    // Lanchement de l'Event quand le fichier a fini d'être lu
   reader.onloadend = function () {
    // On remplace la source de l'image par le contenu du fichier en base 64
       modal_image.src = reader.result;
   }
}

/**********
* Affichage des catégories dans la modal new projet
**********/
function displayCategoriesOnModalNewProjet (dataCategories) {

    //Initialisation des variables
    category_image = document.getElementById('category_image')

    // Réinitialisation des catégories
    category_image.innerHTML = ""

    //Affiche les catégories dans la modal new projet
    for (let j = 0; j < dataCategories.length; j++) {
        const option = document.createElement('option')
        option.setAttribute('value', dataCategories[j].id)
        option.innerHTML = `<span>${dataCategories[j].name}</span>`

        category_image.appendChild(option)
    }    
}

/**********
* Vérifie les imput avant envoi
**********/
async function checkDataNewProjet () {

    // Déclarations des variables
    image = document.getElementById('file');
    title_image = document.getElementById('title_image');
    file_notificationvalidation = document.querySelector('.file_notificationvalidation')

    //Réinitialisation de la notification d'erreur
    file_notificationvalidation.innerHTML=""

    // Vérifie que tous les input sont remplis
        if (title_image.value == "" || image.value == "" ){
            notification_error = document.createElement('p')
                notification_error.classList.add('notification-error')
                notification_error.innerHTML=`Tous les champs ne sont pas complétés`;
                
                file_notificationvalidation.appendChild(notification_error)
        }
        else{
            viewNewProjet()
        }
}

/**********
* Fermeture de la modal new projet avec la croix
**********/
function closeModalNewProjet () {
    modal_addprojet.innerHTML = ""
    modal_addprojet.classList.remove('active')
}

/**********
* Ferme la modal projets en cliquant hors de la modal
**********/
function closeClickExceptModalNewProjet() {
    modal_addprojet.addEventListener("click", event => {
        closeModalNewProjet()
        closeModalProjets()
    })
    modal_addprojet.querySelector('.modal-container__photo').addEventListener("click", stopPropagationNewProjet)
}    

/**********
* Stop la propagation du click pour la fermeture de la modal projets
**********/
function stopPropagationNewProjet (event) {
    event.stopPropagation()
}

/**********
* Retour à la modal projets
**********/
function backModalProjets () {
    closeModalNewProjet()
    modal_projets.classList.add('active')
}

/**********
* Ouverture de la modal new projet
**********/
async function openModalNewProjet (){

    // Appel de la fonction pour initialiser la modal projets
    displayEditModalNewProjet()

    //Appel de la fonction pour afficher les travaux dans la modal projets
    const categories = await getCategories();
    displayCategoriesOnModalNewProjet(categories)   
}

/**********
* Ajout du nouveau projet dans la galerie + modal projets
**********/
async function viewNewProjet (){
    const data = await newWorks();
    displayNewWorkOnHomepage(data)
    displayNewWorkOnModalProjets(data)
}

/**********
* Affiche le nouveau projet dans la galerie
**********/
function displayNewWorkOnHomepage (data) {
    //Déclarations des variables
    const article = document.createElement('article')
    // Affiche le nouveau projet dans la galerie
        article.classList.add('gallery-article')
        article.setAttribute('id', data.id)
        article.innerHTML = `
            <img src="${data.imageUrl}" alt="${data.title}">
            <h3>${data.title}</h3>`

        gallery.appendChild(article)
}

/**********
* Affiche le nouveau projet dans la modal projets
**********/
function displayNewWorkOnModalProjets (data) {
    //Déclarations des variables
    const articlemodal = document.createElement('article')
    // Affiche le nouveau projet dans la modal projets
        articlemodal.classList.add('modal-article')
        articlemodal.setAttribute('id', data.id)
        articlemodal.innerHTML = `
            <div class="image_gallery">
                <img src="${data.imageUrl}" alt="${data.title}">
                <button class="btndeleteprojet">
                    <svg class="image_delete" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.6 1.8V0.9C6.6 0.402944 6.19704 0 5.7 0H3.3C2.80294 0 2.4 0.402944 2.4 0.9V1.8H0V2.4H0.6V8.1C0.6 8.59704 1.00294 9 1.5 9H7.5C7.99704 9 8.4 8.59704 8.4 8.1V2.4H9V1.8H6.6ZM3 0.9C3 0.734316 3.13432 0.6 3.3 0.6H5.7C5.86568 0.6 6 0.734316 6 0.9V1.8H3V0.9ZM4.2 4.2V7.2H4.8V4.2H4.2ZM2.4 7.2V5.4H3V7.2H2.4ZM6 5.4V7.2H6.6V5.4H6Z" fill="white"/>
                    </svg>
                </button>
            </div>
            <p class="text">éditer</p>`
    
        modal_gallery.appendChild(articlemodal)

        // Réinitialise la suppression des travaux sur le site
        articlemodal.querySelector('button').addEventListener('click', async (event) => {
            //event.preventDefault()
            await deleteWorks(data.id, data.title);
        })
}

/**********
* Reset le formulaire
**********/
function resetFormNewProjet () {
    document.querySelector('.form-photo').reset()
    document.querySelector('.btnvalidation').classList.remove('actif')
}

/**********
* Reset l'image du nouveau projet
**********/
function resetImageNewProjet() {
    
    // Déclaration des variables
    const modal_addprojet_container =document.querySelector('.modal-container__photo')
    const newImage = document.querySelector('.container-image')

    // Modification de la valeur du html image
    newImage.innerHTML=`
    <input type="file" id="file" name="file" accept="images/*" hidden >
                <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M57 6H1C0.448 6 0 6.447 0 7V51C0 51.553 0.448 52 1 52H57C57.552 52 58 51.553 58 51V7C58 6.447 57.552 6 57 6ZM56 50H2V8H56V50Z"
                        fill="#B9C5CC" />
                    <path
                        d="M16 28.138C19.071 28.138 21.569 25.64 21.569 22.57C21.569 19.498 19.071 17 16 17C12.929 17 10.431 19.498 10.431 22.569C10.431 25.64 12.929 28.138 16 28.138ZM16 19C17.968 19 19.569 20.602 19.569 22.569C19.569 24.536 17.968 26.138 16 26.138C14.032 26.138 12.431 24.537 12.431 22.57C12.431 20.603 14.032 19 16 19Z"
                        fill="#B9C5CC" />
                    <path
                        d="M7.00004 46C7.23404 46 7.47004 45.918 7.66004 45.751L23.973 31.389L34.275 41.69C34.666 42.081 35.298 42.081 35.689 41.69C36.08 41.299 36.08 40.667 35.689 40.276L30.882 35.469L40.063 25.415L51.324 35.738C51.731 36.111 52.364 36.083 52.737 35.676C53.11 35.269 53.083 34.636 52.675 34.263L40.675 23.263C40.479 23.084 40.218 22.995 39.955 23.001C39.69 23.013 39.44 23.13 39.261 23.326L29.467 34.053L24.724 29.31C24.35 28.937 23.752 28.918 23.356 29.266L6.33904 44.249C5.92404 44.614 5.88404 45.246 6.24904 45.661C6.44704 45.886 6.72304 46 7.00004 46Z"
                        fill="#B9C5CC" />
                </svg>
                <button class="btnimage">+ Ajouter photo</button>
                <p class="infomax">jpg, png : 4mo max</p>
    `
    // Réinitialisation des fonctions des boutons image
    modal_addprojet_container.querySelector('.btnimage').addEventListener('click', () => {
        modal_addprojet_container.querySelector('#file').click()})
    modal_addprojet_container.querySelector('#file').addEventListener('change', () => {uploadImage()})
}