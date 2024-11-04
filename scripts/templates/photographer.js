

function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const photo = `assets/photographers/${portrait}`;
    const ville = `${city}`;
    const pays = `${country}`;
    const nom = `${name}`;
    const slogan = `${tagline}`;
    const prix = `${price}€/jour`;
    const ID = `${id}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const div = document.createElement('div');

        const a = document.createElement('a');
        a.className = "photographer__link";
        a.setAttribute("href", `photographer.html?id=${ID}`)

        const img = document.createElement('img');
        img.className = "photographer__pic"
        img.setAttribute("src", photo)
        img.setAttribute("alt", `${nom}'s profile picture`)
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

    function getUserProfileDOM() {
        // Div main-container
        const mainContainer = document.createElement("div");
        mainContainer.className = "main-container"

        //********************************************** */ Div header
        const header = document.createElement("header");
        header.className = "hero"

        const divInfos = document.createElement('div');
        divInfos.className = "hero__infos";

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

        const button = document.createElement("button");
        button.className = "btn contact__button";
        button.setAttribute("alt", "Contact Me");
        button.textContent = "Contactez-moi"

        const img = document.createElement('img');
        img.className = "hero__img"
        img.setAttribute("src", photo)
        img.setAttribute("alt", `${nom}'s profile picture`);

        header.appendChild(divInfos);
        header.appendChild(button);
        header.appendChild(img);

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

        //***************************************************FactoryMedia
        factoryMediaSection = document.createElement("section");
        factoryMediaSection.className = "factory-media";
        // div Tri
        const content =
            `<label for="sort__options">Trier par :</label>
                <select id="sort__options" class="sort__selector" aria-label="Options de tri">
                    <option value="popularity">Popularité</option>
                    <option value="date">Date</option>
                    <option value="title">Titre</option>
                </select>`

        divTri = document.createElement("div");
        divTri.className = "sort__container";
        divTri.innerHTML = content;

        // triTxt = document.createElement("p");
        // triTxt.textContent = "Trier par";

        // triLabel = document.createElement("label");
        // triLabel.setAttribute("for", "sort-options");
        // triLabel.textContent = "Trier par"

        // triSelect = document.createElement("seclect");
        // triSelect.className = "btn sort__selector";
        // triSelect.setAttribute("id", "sort-options");
        // triSelect.setAttribute("aria-label", "Sort options");

        // oPopularite = document.createElement("option");
        // oPopularite.setAttribute("value", "popularity");
        // oPopularite.textContent = "Popularité";

        // oDate = document.createElement("option");
        // oDate.setAttribute("value", "date");
        // oDate.textContent = "Date";

        // oTitre = document.createElement("option");
        // oTitre.setAttribute("value", "title");
        // oTitre.textContent = "Titre";

        // triSelect.appendChild(oPopularite);
        // triSelect.appendChild(oDate);
        // triSelect.appendChild(oTitre);
        // divTri.appendChild(triLabel);
        // divTri.appendChild(triSelect);

        //******* div Medias

        const divMedia = document.createElement("div");
        divMedia.className = "medias-container";

        const mediaList = document.createElement("ul")
        mediaList.className = "medias-list";

        //On récupère le tableau des photos du photographe dont l'id est sélectionné.
        // Pour chaque élément (photo) du tableau, on crée un élément li contenant les "articles" et on l'ajoute à la liste ul.

        //Element li
        <li class="medias__element">
            <a href="">
                <div className="infos">
                    <h3></h3>
                    <p><span></span></p>
                </div>
                <img src="" alt="" />

            </a>
        </li>

        factoryMediaSection.appendChild(divTri);


        mainContainer.appendChild(header);
        mainContainer.appendChild(encart);
        mainContainer.appendChild(factoryMediaSection);

        return (mainContainer)

    }


    return { nom, photo, ville, slogan, prix, id, getUserCardDOM, getUserProfileDOM }

}


//photograph.html#id