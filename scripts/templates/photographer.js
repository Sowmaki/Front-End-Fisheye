import { isClickable } from "../utils/clickables.js";

export function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const photo = `assets/photographers/${portrait}`;
    const ville = `${city}`;
    const pays = `${country}`;
    const nom = `${name}`;
    const slogan = `${tagline}`;
    const prix = `${price}€/jour`;
    const ID = `${id}`;

    // Crée les éléments du DOM pour la card du photographe
    function createUserCardDOM() {
        const article = document.createElement('article');
        const div = document.createElement('div');
        div.className = "photographer__infos"

        const a = document.createElement('a');
        a.className = "photographer__link";
        a.setAttribute("href", `photographer.html?id=${ID}`)
        a.setAttribute('aria-label', `${nom}`)
        isClickable(a)// rend l'élément cliquable avec les touches "espace" ou "entree"

        const img = document.createElement('img');
        img.className = `photographer__pic photographer__${nom.replace(/\s+/g, '')}`
        img.setAttribute("src", photo)
        img.setAttribute("aria-label", `${nom}'s profile picture`)

        const divImg = document.createElement('div')
        divImg.classList.add('photographer__divImg')

        divImg.appendChild(img)

        const h2 = document.createElement('h2');
        h2.textContent = nom;
        h2.className = "photographer__name"

        a.appendChild(divImg)
        a.appendChild(h2)

        const villeTxt = document.createElement('p')
        villeTxt.className = "photographer__location"
        villeTxt.textContent = `${ville}, ${pays}`;

        const sloganTxt = document.createElement('p')
        sloganTxt.className = "photographer__tagline"
        sloganTxt.textContent = slogan;

        const prixTxt = document.createElement('p')
        prixTxt.className = "photographer__price"
        prixTxt.textContent = prix;

        article.appendChild(a);
        article.appendChild(div);
        div.appendChild(villeTxt);
        div.appendChild(sloganTxt);
        div.appendChild(prixTxt);

        return (article);

    }

    // Crée les éléments du DOM nécessaire au profil de la page du photographe
    function createUserProfileDOM() {
        /****************************************** Lien du logo FishEye **/
        const logos = document.querySelectorAll('.logo-fisheye')
        logos.forEach(logo => isClickable(logo))

        /****************************************** Nom dans la Modale de contact */
        const modalTitle = document.querySelector('.modal__title')
        modalTitle.textContent = `Contactez-moi ${nom}`


        //********************************************** */ Div header
        const header = document.querySelector(".hero__header");
        const divInfos = document.querySelector(".hero__infos");

        const h1 = document.createElement("h1");
        h1.textContent = nom;
        h1.className = "hero__name"

        const villeTxt = document.createElement('h2')
        villeTxt.className = "hero__city"
        villeTxt.textContent = `${ville}, ${pays}`;

        const sloganTxt = document.createElement('p')
        sloganTxt.className = "hero__tagline"
        sloganTxt.textContent = slogan;

        divInfos.appendChild(h1);
        divInfos.appendChild(villeTxt);
        divInfos.appendChild(sloganTxt);

        const imgContainer = document.createElement('div')
        imgContainer.classList.add('hero__img')
        const img = document.createElement('img');
        img.setAttribute("src", photo)
        img.setAttribute("aria-label", `${nom}'s profile picture`);
        img.className = `photographer__pic photographer__${nom.replace(/\s+/g, '')}`

        imgContainer.appendChild(img)
        header.appendChild(imgContainer);

        return header
    }

    return { createUserCardDOM, createUserProfileDOM }

}