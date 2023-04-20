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
