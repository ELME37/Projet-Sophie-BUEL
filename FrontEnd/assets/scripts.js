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

