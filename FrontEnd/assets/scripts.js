const gallery = document.getElementById('gallery')

fetch("http://localhost:5678/api/works")
    .then((Response) => Response.json())
    .then((dataGallery) => {

        for (let i = 0; i < dataGallery.length; i++) {

            const article = document.createElement('article')
            article.innerHTML = `
            <img src="${dataGallery[i].imageUrl}" alt="${dataGallery[i].title}">
            <h3>${dataGallery[i].title}</h3>`

            gallery.appendChild(article)

        }
    })

const category = document.getElementById('category')


fetch("http://localhost:5678/api/categories")
    .then((Response) => Response.json())
    .then((dataCategory) => {

        const buttonAll = document.createElement('button')
        buttonAll.classList.add('button_all')
        buttonAll.innerHTML = `<span>Tous</span>`

        buttonAll.addEventListener('click', () => {
            gallery.innerHTML = "";

            fetch("http://localhost:5678/api/works")
                .then((Response) => Response.json())
                .then((dataGallery) => {

                    for (let i = 0; i < dataGallery.length; i++) {
                        const article = document.createElement('article')
                        article.innerHTML = `
                    <img src="${dataGallery[i].imageUrl}" alt="${dataGallery[i].title}">
                    <h3>${dataGallery[i].title}</h3>`

                        gallery.appendChild(article)

                    }
                })

        })

        category.appendChild(buttonAll)

        for (let j = 0; j < dataCategory.length; j++) {

            const button = document.createElement('button')
            button.classList.add('button_category')
            button.innerHTML = `
            <span>${dataCategory[j].name}</span>`

            button.addEventListener('click', () => {
                gallery.innerHTML = "";

                fetch("http://localhost:5678/api/works")
                    .then((Response) => Response.json())
                    .then((dataGallery) => {
                        for (let i = 0; i < dataGallery.length; i++) {

                            if (dataGallery[i].categoryId === dataCategory[j].id) {
                                const article = document.createElement('article')
                                article.innerHTML = `
                                <img src="${dataGallery[i].imageUrl}" alt="${dataGallery[i].title}">
                                <h3>${dataGallery[i].title}</h3>`

                                gallery.appendChild(article)
                            }
                        }
                    })
            })

            category.appendChild(button)
        }
    }
    )


const token = window.localStorage.getItem('loginToken');

if (token) {
    const edition = document.getElementById('edition')
    const button__edition = document.createElement('div')
    button__edition.classList.add('button__edition')
    const mode__edition = document.createElement('div')
    const button__publication = document.createElement('button')
    mode__edition.classList.add('mode__edition')
    mode__edition.innerHTML = `
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.90827 5.6194L7.0677 7.45996C6.3896 8.13807 5.70762 8.81617 5.03339 9.50203C4.87452 9.66477 4.7544 9.88177 4.7079 10.0949C4.46378 11.2147 4.22741 12.3346 3.99104 13.4544L3.8593 14.0744C3.7973 14.3766 3.87867 14.6789 4.08404 14.8842C4.24291 15.0431 4.46378 15.1322 4.69627 15.1322C4.76214 15.1322 4.82802 15.1245 4.89389 15.1129L5.57587 14.9695C6.66084 14.7409 7.74968 14.5084 8.83465 14.2836C9.08652 14.2294 9.29963 14.117 9.48175 13.9349C12.5274 10.8854 15.5731 7.8397 18.6187 4.79792C18.8435 4.57318 18.9675 4.30581 18.9985 3.97645C19.0023 3.9222 18.9985 3.86795 18.9868 3.81758C18.9675 3.74008 18.952 3.65871 18.9326 3.58121C18.89 3.38359 18.8435 3.15885 18.7505 2.94185C18.1809 1.63989 17.2354 0.709921 15.9412 0.186812C15.6816 0.0821901 15.4065 0.0473162 15.1662 0.0163172L15.1003 0.00856739C14.7516 -0.0340563 14.4339 0.0821901 14.1587 0.361182C12.415 2.11263 10.6597 3.86795 8.90827 5.6194ZM14.9725 0.942414C14.9802 0.942414 14.9841 0.942414 14.9918 0.942414L15.0577 0.950164C15.2592 0.973413 15.4452 0.996662 15.5924 1.05866C16.6464 1.4849 17.4214 2.24437 17.8903 3.31384C17.9445 3.43784 17.9794 3.59671 18.0142 3.76333C18.0259 3.82533 18.0414 3.88732 18.053 3.94932C18.0375 4.01907 18.0104 4.06557 17.9561 4.11594C14.9066 7.15772 11.8609 10.2073 8.81527 13.2529C8.7649 13.3033 8.7184 13.3265 8.64865 13.342C7.55981 13.5707 6.47484 13.7993 5.386 14.0279L4.81252 14.148L4.92102 13.6404C5.15738 12.5244 5.39375 11.4046 5.63399 10.2886C5.64174 10.2538 5.67274 10.1995 5.70762 10.1608C6.38185 9.47878 7.05608 8.80067 7.73418 8.12644L9.57475 6.28588C11.3301 4.53055 13.0854 2.77523 14.8368 1.01604C14.9105 0.954039 14.9453 0.942414 14.9725 0.942414Z" fill="white"/>
        <path d="M1.50733 4.22446H8.27287C8.53637 4.22446 8.74949 4.01134 8.74949 3.74785C8.74949 3.48436 8.53637 3.27124 8.27287 3.27124H1.50733C0.67423 3.27124 0 3.94934 0 4.77857V17.4649C0 18.298 0.678105 18.9723 1.50733 18.9723H14.1898C15.0229 18.9723 15.6971 18.2942 15.6971 17.4649V10.9745C15.6971 10.711 15.484 10.4979 15.2205 10.4979C14.957 10.4979 14.7439 10.711 14.7439 10.9745V17.4649C14.7439 17.7711 14.4921 18.0229 14.1859 18.0229H1.50733C1.20121 18.0229 0.949346 17.7711 0.949346 17.4649V4.78244C0.949346 4.47633 1.20121 4.22446 1.50733 4.22446Z" fill="white"/>
        </svg>
        <button>Mode édition</button>`

    button__publication.classList.add('button__publication')
    button__publication.innerHTML = `
        publier les changements`

    edition.appendChild(button__edition)
    button__edition.appendChild(mode__edition)
    button__edition.appendChild(button__publication)

    const change__figure = document.getElementById('change__figure')
    const figure = document.createElement('div')
    figure.classList.add('change__button')
    figure.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.43856 5.32321L6.69501 7.06676C6.05264 7.70912 5.40661 8.35149 4.76792 9.00119C4.61742 9.15536 4.50363 9.36091 4.45958 9.5628C4.22833 10.6236 4.00442 11.6844 3.78051 12.7452L3.65571 13.3325C3.59698 13.6189 3.67407 13.9052 3.86861 14.0997C4.01911 14.2502 4.22833 14.3346 4.44857 14.3346C4.51097 14.3346 4.57337 14.3273 4.63577 14.3163L5.28181 14.1805C6.30959 13.9639 7.34104 13.7437 8.36882 13.5308C8.60741 13.4794 8.8093 13.3729 8.98182 13.2004C11.8669 10.3116 14.7521 7.42648 17.6372 4.54503C17.8501 4.33213 17.9676 4.07886 17.9969 3.76685C18.0006 3.71546 17.9969 3.66408 17.9859 3.61636C17.9676 3.54294 17.9529 3.46586 17.9345 3.39245C17.8941 3.20524 17.8501 2.99235 17.762 2.78679C17.2224 1.55346 16.3268 0.672502 15.1008 0.176965C14.8548 0.077858 14.5942 0.0448222 14.3667 0.0154571L14.3043 0.00811581C13.9739 -0.0322613 13.6729 0.077858 13.4123 0.342144C11.7605 2.00127 10.0977 3.66408 8.43856 5.32321ZM14.1831 0.892741C14.1905 0.892741 14.1941 0.892741 14.2015 0.892741L14.2639 0.900082C14.4547 0.922106 14.6309 0.94413 14.7704 1.00286C15.7688 1.40663 16.503 2.12608 16.9471 3.13917C16.9985 3.25663 17.0315 3.40713 17.0646 3.56497C17.0756 3.6237 17.0903 3.68243 17.1013 3.74116C17.0866 3.80723 17.0609 3.85128 17.0095 3.899C14.1207 6.78045 11.2356 9.66925 8.35047 12.5544C8.30275 12.6021 8.2587 12.6241 8.19263 12.6388C7.16118 12.8554 6.1334 13.0719 5.10195 13.2885L4.55869 13.4023L4.66147 12.9214C4.88538 11.8643 5.10929 10.8035 5.33687 9.74633C5.34421 9.71329 5.37357 9.6619 5.40661 9.6252C6.0453 8.97917 6.68399 8.3368 7.32636 7.69811L9.06991 5.95456C10.7327 4.29176 12.3955 2.62895 14.0546 0.962483C14.1244 0.903753 14.1574 0.892741 14.1831 0.892741Z" fill="black"/>
        <path d="M1.42788 4.00179H7.83682C8.08643 4.00179 8.28831 3.79991 8.28831 3.55031C8.28831 3.3007 8.08643 3.09882 7.83682 3.09882H1.42788C0.638692 3.09882 0 3.74118 0 4.5267V16.5444C0 17.3336 0.642363 17.9723 1.42788 17.9723H13.4419C14.2311 17.9723 14.8698 17.3299 14.8698 16.5444V10.3961C14.8698 10.1465 14.6679 9.94456 14.4183 9.94456C14.1687 9.94456 13.9668 10.1465 13.9668 10.3961V16.5444C13.9668 16.8344 13.7282 17.073 13.4382 17.073H1.42788C1.1379 17.073 0.899308 16.8344 0.899308 16.5444V4.53037C0.899308 4.24039 1.1379 4.00179 1.42788 4.00179Z" fill="black"/>
        </svg>
        <button>modifier</button>`
    change__figure.appendChild(figure)

    const change__text = document.getElementById('change__text')
    const text = document.createElement('div')
    text.classList.add('change__button')
    text.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.43856 5.32321L6.69501 7.06676C6.05264 7.70912 5.40661 8.35149 4.76792 9.00119C4.61742 9.15536 4.50363 9.36091 4.45958 9.5628C4.22833 10.6236 4.00442 11.6844 3.78051 12.7452L3.65571 13.3325C3.59698 13.6189 3.67407 13.9052 3.86861 14.0997C4.01911 14.2502 4.22833 14.3346 4.44857 14.3346C4.51097 14.3346 4.57337 14.3273 4.63577 14.3163L5.28181 14.1805C6.30959 13.9639 7.34104 13.7437 8.36882 13.5308C8.60741 13.4794 8.8093 13.3729 8.98182 13.2004C11.8669 10.3116 14.7521 7.42648 17.6372 4.54503C17.8501 4.33213 17.9676 4.07886 17.9969 3.76685C18.0006 3.71546 17.9969 3.66408 17.9859 3.61636C17.9676 3.54294 17.9529 3.46586 17.9345 3.39245C17.8941 3.20524 17.8501 2.99235 17.762 2.78679C17.2224 1.55346 16.3268 0.672502 15.1008 0.176965C14.8548 0.077858 14.5942 0.0448222 14.3667 0.0154571L14.3043 0.00811581C13.9739 -0.0322613 13.6729 0.077858 13.4123 0.342144C11.7605 2.00127 10.0977 3.66408 8.43856 5.32321ZM14.1831 0.892741C14.1905 0.892741 14.1941 0.892741 14.2015 0.892741L14.2639 0.900082C14.4547 0.922106 14.6309 0.94413 14.7704 1.00286C15.7688 1.40663 16.503 2.12608 16.9471 3.13917C16.9985 3.25663 17.0315 3.40713 17.0646 3.56497C17.0756 3.6237 17.0903 3.68243 17.1013 3.74116C17.0866 3.80723 17.0609 3.85128 17.0095 3.899C14.1207 6.78045 11.2356 9.66925 8.35047 12.5544C8.30275 12.6021 8.2587 12.6241 8.19263 12.6388C7.16118 12.8554 6.1334 13.0719 5.10195 13.2885L4.55869 13.4023L4.66147 12.9214C4.88538 11.8643 5.10929 10.8035 5.33687 9.74633C5.34421 9.71329 5.37357 9.6619 5.40661 9.6252C6.0453 8.97917 6.68399 8.3368 7.32636 7.69811L9.06991 5.95456C10.7327 4.29176 12.3955 2.62895 14.0546 0.962483C14.1244 0.903753 14.1574 0.892741 14.1831 0.892741Z" fill="black"/>
        <path d="M1.42788 4.00179H7.83682C8.08643 4.00179 8.28831 3.79991 8.28831 3.55031C8.28831 3.3007 8.08643 3.09882 7.83682 3.09882H1.42788C0.638692 3.09882 0 3.74118 0 4.5267V16.5444C0 17.3336 0.642363 17.9723 1.42788 17.9723H13.4419C14.2311 17.9723 14.8698 17.3299 14.8698 16.5444V10.3961C14.8698 10.1465 14.6679 9.94456 14.4183 9.94456C14.1687 9.94456 13.9668 10.1465 13.9668 10.3961V16.5444C13.9668 16.8344 13.7282 17.073 13.4382 17.073H1.42788C1.1379 17.073 0.899308 16.8344 0.899308 16.5444V4.53037C0.899308 4.24039 1.1379 4.00179 1.42788 4.00179Z" fill="black"/>
        </svg>
        <button>modifier</button>`

    change__text.appendChild(text)

    const change__projet = document.getElementById('change__projet')
    const projet = document.createElement('div')
    projet.classList.add('change__button')
    projet.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.43856 5.32321L6.69501 7.06676C6.05264 7.70912 5.40661 8.35149 4.76792 9.00119C4.61742 9.15536 4.50363 9.36091 4.45958 9.5628C4.22833 10.6236 4.00442 11.6844 3.78051 12.7452L3.65571 13.3325C3.59698 13.6189 3.67407 13.9052 3.86861 14.0997C4.01911 14.2502 4.22833 14.3346 4.44857 14.3346C4.51097 14.3346 4.57337 14.3273 4.63577 14.3163L5.28181 14.1805C6.30959 13.9639 7.34104 13.7437 8.36882 13.5308C8.60741 13.4794 8.8093 13.3729 8.98182 13.2004C11.8669 10.3116 14.7521 7.42648 17.6372 4.54503C17.8501 4.33213 17.9676 4.07886 17.9969 3.76685C18.0006 3.71546 17.9969 3.66408 17.9859 3.61636C17.9676 3.54294 17.9529 3.46586 17.9345 3.39245C17.8941 3.20524 17.8501 2.99235 17.762 2.78679C17.2224 1.55346 16.3268 0.672502 15.1008 0.176965C14.8548 0.077858 14.5942 0.0448222 14.3667 0.0154571L14.3043 0.00811581C13.9739 -0.0322613 13.6729 0.077858 13.4123 0.342144C11.7605 2.00127 10.0977 3.66408 8.43856 5.32321ZM14.1831 0.892741C14.1905 0.892741 14.1941 0.892741 14.2015 0.892741L14.2639 0.900082C14.4547 0.922106 14.6309 0.94413 14.7704 1.00286C15.7688 1.40663 16.503 2.12608 16.9471 3.13917C16.9985 3.25663 17.0315 3.40713 17.0646 3.56497C17.0756 3.6237 17.0903 3.68243 17.1013 3.74116C17.0866 3.80723 17.0609 3.85128 17.0095 3.899C14.1207 6.78045 11.2356 9.66925 8.35047 12.5544C8.30275 12.6021 8.2587 12.6241 8.19263 12.6388C7.16118 12.8554 6.1334 13.0719 5.10195 13.2885L4.55869 13.4023L4.66147 12.9214C4.88538 11.8643 5.10929 10.8035 5.33687 9.74633C5.34421 9.71329 5.37357 9.6619 5.40661 9.6252C6.0453 8.97917 6.68399 8.3368 7.32636 7.69811L9.06991 5.95456C10.7327 4.29176 12.3955 2.62895 14.0546 0.962483C14.1244 0.903753 14.1574 0.892741 14.1831 0.892741Z" fill="black"/>
        <path d="M1.42788 4.00179H7.83682C8.08643 4.00179 8.28831 3.79991 8.28831 3.55031C8.28831 3.3007 8.08643 3.09882 7.83682 3.09882H1.42788C0.638692 3.09882 0 3.74118 0 4.5267V16.5444C0 17.3336 0.642363 17.9723 1.42788 17.9723H13.4419C14.2311 17.9723 14.8698 17.3299 14.8698 16.5444V10.3961C14.8698 10.1465 14.6679 9.94456 14.4183 9.94456C14.1687 9.94456 13.9668 10.1465 13.9668 10.3961V16.5444C13.9668 16.8344 13.7282 17.073 13.4382 17.073H1.42788C1.1379 17.073 0.899308 16.8344 0.899308 16.5444V4.53037C0.899308 4.24039 1.1379 4.00179 1.42788 4.00179Z" fill="black"/>
        </svg>
        <button>modifier</button>`
    change__projet.appendChild(projet)

    change__projet.addEventListener('click', () => {
    const modal = document.querySelector('.modal')
    modal.classList.add('active')
    })

    const btnclose__add = document.querySelector('.btnclose__add')
    btnclose__add.addEventListener('click', () => {
        const modal = document.querySelector('.modal')
        modal.classList.remove('active')
    })

        const modal_gallery = document.getElementById('modal-gallery')

fetch("http://localhost:5678/api/works")
    .then((Response) => Response.json())
    .then((datamodal_Gallery) => {

        for (let i = 0; i < datamodal_Gallery.length; i++) {

            const articlemodal = document.createElement('article')
            articlemodal.classList.add('modal-article')
            articlemodal.innerHTML = `
            <img src="${datamodal_Gallery[i].imageUrl}" alt="${datamodal_Gallery[i].title}">
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.6 1.8V0.9C6.6 0.402944 6.19704 0 5.7 0H3.3C2.80294 0 2.4 0.402944 2.4 0.9V1.8H0V2.4H0.6V8.1C0.6 8.59704 1.00294 9 1.5 9H7.5C7.99704 9 8.4 8.59704 8.4 8.1V2.4H9V1.8H6.6ZM3 0.9C3 0.734316 3.13432 0.6 3.3 0.6H5.7C5.86568 0.6 6 0.734316 6 0.9V1.8H3V0.9ZM4.2 4.2V7.2H4.8V4.2H4.2ZM2.4 7.2V5.4H3V7.2H2.4ZM6 5.4V7.2H6.6V5.4H6Z" fill="white"/>
            </svg>

            <p>éditer</p>`

            modal_gallery.appendChild(articlemodal)

        }
    })

    const btnadd = document.querySelector('.btnadd')
    btnadd.addEventListener('click', () => {
        const modal_photo = document.querySelector('.modal-photo')
        const modal = document.querySelector('.modal')
        modal_photo.classList.add('active')
        modal.classList.remove('active')
        })
    
        const btnclose__photo = document.querySelector('.btnclose__photo')
        btnclose__photo.addEventListener('click', () => {
            const modal_photo = document.querySelector('.modal-photo')
            modal_photo.classList.remove('active')
        })

const addphoto = document.querySelector('.btnimage')
const file = document.getElementById('file')

addphoto.addEventListener('click', () => {
    console.log('photo')
    file.click();
})












    const log = document.getElementById('log')
    log.innerHTML = `logout`

}

console.log(log.innerHTML)
if (log.innerHTML == 'login') {
    log.addEventListener('click', () => {
        console.log('ok');
        window.location.replace("./connexion.html")
    })

} else if (log.innerHTML == 'logout') {
    log.addEventListener('click', () => {
        console.log('erreur');
        window.localStorage.clear();
        log.innerHTML = `login`
    })
}



