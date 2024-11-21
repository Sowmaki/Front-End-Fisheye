import { isClickable } from "../utils/clickables.js";

export function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const photo = `assets/photographers/${portrait}`;
    const localisation = `${city}, ${country}`;
    const nom = `${name}`;
    const slogan = `${tagline}`;
    const prix = `${price}€/jour`;
    const ID = `${id}`;

    // Crée les éléments du DOM pour la card du photographe
    function createUserCardDOM() {
        const article = document.createElement('article');


        const a = document.createElement('a');
        a.className = "photographer__link";
        a.setAttribute("href", `photographer.html?id=${ID}`);
        a.setAttribute('aria-label', `${nom}`);
        isClickable(a);// rend l'élément cliquable avec les touches "espace" ou "entree"
        a.innerHTML = `
        <div class="photographer__divImg">
                <img class="photographer__pic photographer__${nom.replace(/\s+/g, '')}" 
                     src="${photo}" 
                     aria-label="${nom}'s profile picture">
            </div>
            <h2 class="photographer__name">${nom}</h2>
            `;

        const div = document.createElement('div');
        div.className = "photographer__infos";
        div.innerHTML = `
            <p class="photographer__location">${localisation}</p>
            <p class="photographer__tagline">${slogan}</p>
            <p class="photographer__price">${prix}</p>
        `;

        article.appendChild(a);
        article.appendChild(div);

        return (article);

    }

    // Crée les éléments du DOM nécessaire au profil de la page du photographe
    function createUserProfileDOM() {
        /****************************************** Lien des logos FishEye **/
        const logos = document.querySelectorAll('.logo-fisheye');
        logos.forEach(logo => isClickable(logo));

        /****************************************** Nom dans la Modale de contact */
        const modalTitle = document.querySelector('.modal__title');
        modalTitle.textContent = `Contactez-moi ${nom}`;

        //********************************************** */ Div header
        const header = document.querySelector(".hero__header");
        const divInfos = document.querySelector(".hero__infos");

        divInfos.innerHTML = `
            <h1 class="hero__name">${nom}</h1>
            <h2 class="hero__city">${localisation}</h2>
            <p class="hero__tagline">${slogan}</p>
        `;

        const imgContainer = document.createElement('div')
        imgContainer.classList.add('hero__img')
        imgContainer.innerHTML = `
            <img class="photographer__pic photographer__${nom.replace(/\s+/g, '')}" 
                 src="${photo}" 
                 aria-label="${nom}'s profile picture">
        `;

        header.appendChild(imgContainer);

        return header;
    }

    return { createUserCardDOM, createUserProfileDOM };

}