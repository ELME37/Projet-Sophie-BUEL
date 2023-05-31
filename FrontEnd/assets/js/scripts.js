/**************************************************************************
 * Déclarations des variables
 *************************************************************************/

const categories = document.getElementById('categories');
const gallery = document.getElementById('gallery');
let buttons = null;

/**************************************************************************
* Récupération des données depuis l'API
 *************************************************************************/

/**********
* Récupère la liste des travaux depuis l'API
**********/
 async function getWorks (categoryId = null) {
    return await fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(data => {
            if(categoryId === null) return data

            let newWorks = []

            for (let i = 0; i < data.length; i++) {
                if(categoryId === data[i].categoryId){
                    newWorks.push(data[i])
                }   
            }
            return newWorks
        })
        .catch(error => console.error(error))
}

/**********
* Récupère la liste des catégories depuis l'API
**********/
async function getCategories () {

   return await fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .catch(error => console.error(error))
}

/**************************************************************************
* Affichage des données
*************************************************************************/

/**********
* Loader
**********/
function displayLoader() {
    
    // Réinitialise la liste des travaux 
    gallery.innerHTML=''

    // Création du loader
    const load = document.createElement('div')
        load.classList.add('container-loader')
        load.innerHTML=`
            <div class="loading">Loading</div>
            <div class="loader"></div>`

    gallery.appendChild(load)
}

/**********
* Affiche les catégories dans le portfolio
**********/
function displayCategoriesOnHomepage(dataCategories){

    // Réinitialise la liste des catégories
    categories.innerHTML=""

    // Ajout le bouton "Tous"
    const button_all = document.createElement('button')
        button_all.classList.add('button_categories')
        button_all.innerHTML = `<span>Tous</span>`

    categories.appendChild(button_all)

    // Affichage de tous les projets au click du bouton Tous
    button_all.addEventListener('click', async () => {
        displayLoader();
        //Affiche le loader pour le chargement des travaux
            setTimeout(async () => {
                const newWorks = await getWorks()
                displayWorksOnHomepage(newWorks)
            }, 1000)
    })

    // Affiche la liste des catégories au format boutton
    for (let j = 0; j < dataCategories.length; j++) {
        const button = document.createElement('button')
            button.classList.add('button_categories')
            button.innerHTML = `<span>${dataCategories[j].name}</span>`

        categories.appendChild(button)

        // Affichage des projets en fonction de leur catégories d'ID
        button.addEventListener('click', async () =>  {
            displayLoader();
            //Affiche le loader pour le chargement des travaux
            setTimeout(async () => {
                const newWorks = await getWorks(dataCategories[j].id)
                displayWorksOnHomepage(newWorks)
            }, 1000)
        })
    }
    
    // Gestion des couleurs des filtres
    buttons = document.querySelectorAll('.button_categories')

    button_all.classList.add('actif')

    for (let active_button of buttons) {
        active_button.addEventListener('click', () => {

            for (let inactive_button of buttons) {
                inactive_button.classList.remove('actif')
            }

            active_button.classList.add('actif')
        })
    }
}

/**********
* Affiche les travaux dans le portfolio
**********/
function displayWorksOnHomepage(dataGallery) {
    
    // Réinitialise la liste des travaux 
    gallery.innerHTML=""

    // Affiche la nouvelle liste de travaux
    for (let i = 0; i < dataGallery.length; i++) {
            const article = document.createElement('article')
            article.classList.add('gallery-article')
            article.setAttribute('id', dataGallery[i].id)
            article.innerHTML = `
                <div class="image_projet">
                <img src="${dataGallery[i].imageUrl}" alt="${dataGallery[i].title}">
                </div>
                <h3>${dataGallery[i].title}</h3>`

            gallery.appendChild(article)
    }
}

/**************************************************************************
 * Initialisation de la page d'accueil
*************************************************************************/
async function init (){
    const dataCategories = await getCategories()
    displayCategoriesOnHomepage(dataCategories)

    displayLoader();
    //Affiche le loader pour le chargement des travaux
    setTimeout(async () => {
        const dataGallery = await getWorks();
        displayWorksOnHomepage(dataGallery)
   }, 1000)
}

/**************************************************************************
 * Appel de la fonction init au démarrage du site()
*************************************************************************/
init();