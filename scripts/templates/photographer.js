

export function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const photo = `assets/photographers/${portrait}`;
    const ville = `${city}`;
    const pays = `${country}`;
    const nom = `${name}`;
    const slogan = `${tagline}`;
    const prix = `${price}€/jour`;
    const ID = `${id}`;

    function createUserCardDOM() {
        const article = document.createElement('article');
        const div = document.createElement('div');

        const a = document.createElement('a');
        a.className = "photographer__link";
        a.setAttribute("href", `photographer.html?id=${ID}`)
        // a.addEventListener('keydown', (event) => {
        //     if (event.code === 'Space') {
        //         event.preventDefault();
        //         a.click(); //Simule un clic pour rediriger vers l'adresse href
        //     }
        // });

        const img = document.createElement('img');
        img.className = "photographer__pic"
        img.setAttribute("src", photo)
        img.setAttribute("aria-label", `${nom}'s profile picture`)
        a.appendChild(img)

        const h2 = document.createElement('h2');
        h2.textContent = nom;
        h2.className = "photographer__name"

        const villeTxt = document.createElement('p')
        villeTxt.className = "photographer__city"
        villeTxt.textContent = `${ville}, ${pays}`;

        const sloganTxt = document.createElement('p')
        sloganTxt.className = "photographer__tagline"
        sloganTxt.textContent = slogan;

        const prixTxt = document.createElement('p')
        prixTxt.className = "photographer__price"
        prixTxt.textContent = prix;

        article.appendChild(a);
        article.appendChild(h2);
        article.appendChild(div);
        div.appendChild(villeTxt);
        div.appendChild(sloganTxt);
        div.appendChild(prixTxt);

        return (article);

    }

    function createUserProfileDOM() {

        //********************************************** */ Div header
        const header = document.querySelector(".hero__header");

        const divInfos = document.querySelector(".hero__infos");

        const h1 = document.createElement("h1");
        h1.textContent = nom;
        h1.className = "hero__name"

        const villeTxt = document.createElement('p')
        villeTxt.className = "hero__city"
        villeTxt.textContent = `${ville}, ${pays}`;

        const sloganTxt = document.createElement('p')
        sloganTxt.className = "hero__tagline"
        sloganTxt.textContent = slogan;

        divInfos.appendChild(h1);
        divInfos.appendChild(villeTxt);
        divInfos.appendChild(sloganTxt);

        const img = document.createElement('img');
        img.className = "hero__img"
        img.setAttribute("src", photo)
        img.setAttribute("aria-label", `${nom}'s profile picture`);

        header.appendChild(img);

        return header
    }

    function createUserEncart() {
        //***************************************************Encart 
        const encart = document.createElement("aside");
        encart.className = "likesNprice";

        const likes = document.createElement("p");
        likes.className = "likesNprice__likes";
        likes.textContent = ``

        const coeur = document.createElement("span");
        coeur.className = "likesNprice__heart";
        coeur.innerHTML = '<i class="fa-solid fa-heart"></i>';

        const price = document.createElement("p");
        price.className = "likesNprice__price";

        likes.appendChild(coeur);
        encart.appendChild(likes);
        encart.appendChild(price);

        return (encart)

    }



    return { createUserCardDOM, createUserProfileDOM, createUserEncart }

}


//photograph.html#id