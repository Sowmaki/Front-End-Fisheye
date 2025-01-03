import { getAllPhotographers } from "../datas/data.js";
import { photographerTemplate } from "../templates/photographer.js";

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer__section");

    photographers.forEach((photographer) => {
        //pour chaque photographe, on crée un photographerModel en appelant la fonction qui récupère les datas des photographes
        const photographerModel = photographerTemplate(photographer);
        //On applique a ce photographerModel la fonction qui crée une card à partir des données
        const userCardDOM = photographerModel.createUserCardDOM();
        //On envoie cette card dans la section photographers__Section
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes puis les affiche
    const { photographers } = await getAllPhotographers();
    displayData(photographers);
}

init();




